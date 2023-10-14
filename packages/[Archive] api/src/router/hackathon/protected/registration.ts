import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const registration = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string(),
    })
  )
  .mutation(async ({ input, ctx: { prisma, session } }) => {
    try {
      const res = prisma?.hackathonRegistrations.create({
        data: {
          userId: session.user?.id as string,
          hackathonId: input.hackathonId,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Couldn't register user to hackathon",
      });
    }
  });
