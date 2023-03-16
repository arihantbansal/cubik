import NextAuth from "next-auth";
import { authOptions } from "~/server/utils/auth";

export default NextAuth(authOptions);
