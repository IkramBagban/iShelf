import { nextAuthOptions } from "@/lib/auth";
import { ISession } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";

export const POST = async (req: NextRequest) => {
  const session: ISession = (await getServerSession(
    nextAuthOptions
  )) as ISession;

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Unauthorized access. Please sign in to react." },
      { status: 401 }
    );
  }

  const { type } = await req.json();
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
    const article = await db.article.findUnique({
      where: { id: articleId },
      select: {
        Reaction: {
          where: { userId },
        },
      },
    });
    const reaction = article?.Reaction[0] || null;

    if (reaction) {
      if (reaction.type === type) {
        const deleteReactionResponse = await db.reaction.delete({
          where: { id: reaction.id, userId, articleId },
        });

        console.log('deleteReactionResponse',deleteReactionResponse)

        return NextResponse.json(
          { message: "Remove Reaction", data: null },
          { status: 200 }
        );
      } else {
        const repsonse = await db.reaction.update({
          where: {
            id: reaction.id,
            articleId,
            userId,
          },
          data: { type },
        });
        return NextResponse.json(
          {
            message: "reacted toggle  article.",
            data: repsonse,
          },
          { status: 200 }
        );
      }
    }
    console.log("4");

    if (!article) {
      return NextResponse.json(
        { message: "Article not found." },
        { status: 404 }
      );
    }

    const repsonse = await db.reaction.create({
      data: {
        type,
        userId,
        articleId,
      },
    });
    return NextResponse.json(
      {
        message: "reaction created successfully.",
        data: repsonse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
