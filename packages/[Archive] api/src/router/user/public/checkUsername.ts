import { publicProcedure } from "../../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const checkUsername = publicProcedure
  .input(z.object({ username: z.string() }))
  .mutation(async ({ input, ctx: { prisma } }) => {
    if (input.username.length < 3) return false;

    try {
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
      });

      if (!res) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
        cause: (error as Error).stack,
      });
    }
  });
