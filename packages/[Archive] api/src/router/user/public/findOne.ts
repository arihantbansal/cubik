import { publicProcedure } from "../../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const findOne = publicProcedure
  .input(
    z.object({
      username: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    try {
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
        select: {
          profilePicture: true,
          profileNft: true,
          mainWallet: true,
          id: true,
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
