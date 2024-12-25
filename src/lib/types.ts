import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface IUser {
  id?: number;
  fullName: string;
  email: string;
  token?: string;
  password?: string;
}

export interface ISession extends Session {
  user: {
    id: number;
    jwtToken: string;
    email: string;
    fullName: string;
  };
}

export interface IToken extends JWT {
  uid: number;
  fullName: string;
  jwtToken: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export enum REACTION_TYPES {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export type IReactionState = {
  type: REACTION_TYPES | null;
  likes: number;
  dislikes: number;
};
