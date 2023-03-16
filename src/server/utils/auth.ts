import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import credentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      mainWallet: string;
      username: string;
      profilePicture: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (typeof user !== typeof undefined) token.user = user;

      return token;
    },
    session: async ({ session, token, user }) => {
      const userData = token.user as UserModel;
      session.user.id = userData.id;
      session.user.mainWallet = userData.mainWallet;
      session.user.username = userData.username;
      session.user.profilePicture = userData.profilePicture;
      return session;
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    credentialsProvider({
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("User Cannot be authenticated");
        }
        const user = credentials as {
          wallet: string;
        };

        const res = await prisma.userModel.findUnique({
          where: {
            mainWallet: user.wallet,
          },
        });
        if (!res) {
          return null;
        }
        console.log("df", res);

        return res;
      },
      credentials: {},
      type: "credentials",
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/",
  },
};
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
