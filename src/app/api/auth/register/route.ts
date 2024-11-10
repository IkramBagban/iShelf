import { NextRequest, NextResponse } from "next/server";
import db from "@/db/index";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const user: {
      fullName: string;
      email: string;
      password: string;
    } = await req.json();

    const requiredFields = [];
    if (!user.fullName) {
      requiredFields.push("fullName");
    }
    if (!user.email) {
      requiredFields.push("email");
    }
    if (!user.password) {
      requiredFields.push("password");
    }

    if (requiredFields.length > 0) {
      return NextResponse.json(
        { message: "all the fields are required" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(user.password, 10);

    const response = await db.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: "Success", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Internal Server Error", data: null });
  }
};
