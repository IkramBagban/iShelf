import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/db";
import { generateJWT } from "@/lib/generateJWT";

interface IUser {
  id: number;
  fullName: string;
  email: string;
  token: string;
}

interface ICredentials {
  email: string;
  password: string;
}
export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: ICredentials): Promise<IUser | null> => {
        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              fullName: true,
              email: true,
              password: true,
            },
          });

          if (!user || !user.password) {
            console.log("user not found");
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) return null;

          const jwt = await generateJWT({ id: user.id });

          const data: IUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token: jwt,
          };

          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "Ikku's scret",

  pages: {
    signIn: "/auth/signin",
  },
};
