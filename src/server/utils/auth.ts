import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import credentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from "@prisma/client";

declare module "next-auth" {
  interface Session extends UserModel {
    user: {};
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session) {
        session.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    credentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("User Cannot be authenticated");
        }
        const user = {};
        return user;
      },
      credentials: {},
    }),
  ],
};
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
