import { nextAuthOptions } from "@/lib/auth";
import { ISession } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export const POST = async (req: NextRequest) => {
  const session: ISession = (await getServerSession(
    nextAuthOptions
  )) as ISession;

  if (!session || !session.user) {
    return NextResponse.json(
      { message: "Unauthorized access. Please sign in." },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const url = new URL(req.url);
  const articleId: number | null =
    Number(url.searchParams.get("articleId")) || null;

  if (!articleId) {
    return NextResponse.json(
      { message: "Invalid request. Article ID not found." },
      { status: 400 }
    );
  }

  try {
    // Fetch the article to check if the user already liked it
    const article = await db.article.findUnique({
      where: { id: articleId },
      select: { likes: true },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    const alreadyLiked = article.likes.includes(userId);

    // Toggle the like status
    const updatedArticle = await db.article.update({
      where: { id: articleId },
      data: {
        likes: alreadyLiked
          ? { set: article.likes.filter((id) => id !== userId) } // Remove user ID
          : { set: [...article.likes, userId] }, // Add user ID
      },
      select: { id: true, likes: true },
    });

    return NextResponse.json(
      {
        message: alreadyLiked ? "Unliked the article." : "Liked the article.",
        data: updatedArticle,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
