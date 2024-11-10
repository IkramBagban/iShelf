import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/db";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { JWT } from "next-auth/jwt";

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any): Promise<any> => {
        try {
          console.log("credentials", credentials);
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
          if (!isValidPassword) {
            console.log("Password is not valid");
            return null;
          }

          const jwt = await generateJWT({ id: user.id });

          const data = {
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

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
