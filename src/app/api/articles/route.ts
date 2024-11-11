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
  try {
    const response = await db.article.findMany({
      where: {
        uid: 1,
      },
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
    console.log("RESPONSE", response);

    return NextResponse.json(
      { message: "Articles fetched successfull", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("error");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
