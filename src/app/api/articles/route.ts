import { NextRequest, NextResponse } from "next/server";
import db from "@/db/index";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/auth";
import { ISession } from "@/lib/types";

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
  const page: number = Number(url.searchParams.get("page")) || 1;
  const pageSize: number = Number(url.searchParams.get("pageSize")) || 10;

  const session: ISession | null = await getServerSession(nextAuthOptions);
  const userId = session?.user.id || null;

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
        Reaction: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
                type: true,
              },
            }
          : false,
      },
    });

    return NextResponse.json(
      {
        message: "Articles fetched successfully",
        data: articles,
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

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await db.article.deleteMany();

    return NextResponse.json(
      { message: `${response.count} articles deleted successfully` },
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
