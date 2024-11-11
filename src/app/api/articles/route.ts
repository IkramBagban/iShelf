import { NextRequest, NextResponse } from "next/server";
import db from "@/db/index";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // console.log("---------------------------------------", await req?.json());
    console.log("1");
    // const article: {
    //   title: string;
    //   description: string;
    //   content: string;
    // } = await req?.json();
    const article = await req.json();

    console.log("article", article);

    console.log("2");

    const payload = {
      title: article.title,
      description: article.description,
      content: article.content,
      uid: 1
    };
    console.log("Payload", payload);
    const response = await db.article.create({
      data: payload,
    });

    console.log("3");

    console.log(response);

    return NextResponse.json(
      { message: "Article created successfully" },
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
