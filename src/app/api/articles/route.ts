import { NextRequest, NextResponse } from "next/server";
import db from "@/db/index";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const article = await req.json();
    const payload = {
      title: article.title,
      description: article.description,
      content: article.content,
      uid: 1,
    };

    const response = await db.article.create({
      data: payload,
    });

    return NextResponse.json(
      { message: "Article created successfully", data: { id: response.id } },
      { status: 201 }
    );
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const url = new URL(req.url);
  const page: number = Number(url.searchParams.get("page")) || 5;
  const pageSize: number = Number(url.searchParams.get("pageSize")) || 10;

  try {
    const articles = await db.article.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        uid: true,
        title: true,
        description: true,
        content: true,
        likes: true,
        dislikes: true,
      },
    });

    const result = articles.map((article) => ({
      id: article.id,
      uid: article.uid,
      title: article.title,
      description: article.description,
      content: article.content,
      likesCount: article.likes.length,
      dislikesCount: article.dislikes.length,
    }));

    return NextResponse.json(
      {
        message: "Articles fetched successfully",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
//   try {
    
//     const response = await db.article.deleteMany();

//     return NextResponse.json(
//       { message: `${response.count} articles deleted successfully` },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("ERROR", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: error.message },
//       { status: 500 }
//     );
//   }
// };
