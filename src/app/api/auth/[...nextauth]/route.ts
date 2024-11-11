import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/db";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { JWT } from "next-auth/jwt";



const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
