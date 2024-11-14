import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import db from "@/db";
import { generateJWT } from "@/lib/generateJWT";
import { JWT } from "next-auth/jwt";

interface IUser {
  id: number;
  fullName: string;
  email: string;
  token: string;
}

interface ISession extends Session {
  user: {
    id: number;
    jwtToken: string;
    email: string;
    fullName: string;
  };
}

interface IToken extends JWT {
  uid : number 
  fullName : string
  jwtToken : string
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

          console.log("USER", user);

          const data: IUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token: jwt,
          };

          console.log("USER dta", data);

          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "Ikku's scret",
  callbacks: {
    jwt: async ({ token, user } : {token : IToken, user : IUser}): Promise<JWT> => {
    
      const newToken: IToken = token as IToken;

      if (user && token) {
        newToken.uid = Number(user.id) as number;
        newToken.fullName = user.fullName;
        newToken.jwtToken = user.token;
      }

      return newToken;
    },
    session: async ({ session, token }) => {
     
      const newSession  = session as ISession;

      if (newSession.user && token.uid) {
        newSession.user["id"] = token.uid as number;
        newSession.user.jwtToken = token.jwtToken as string;
        newSession.user.fullName = token.fullName as string;
      }

      return newSession;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
