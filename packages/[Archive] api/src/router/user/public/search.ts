import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

export const search = publicProcedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    if (input.username.length < 2) return [];

    try {
      const res = await prisma.userModel.findMany({
        where: {
          username: {
            contains: input.username,
          },
        },
      });
      return res;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Error processing payment with error ${error}`,
      });
    }
  });
