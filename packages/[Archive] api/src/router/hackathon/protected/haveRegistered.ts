import { protectedProcedure } from "../../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const haveRegistered = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { prisma } = ctx;
    try {
      const res = await prisma?.hackathonRegistrations.findFirst({
        where: {
          userId: ctx.session.user?.id as string,
          hackathonId: input.hackathonId,
        },
      });

      if (res) {
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Couldn't register user to hackathon",
      });
    }
  });
