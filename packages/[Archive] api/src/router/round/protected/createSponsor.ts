import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { TRPCError } from "@trpc/server";

export const createSponsor = protectedProcedure
  .input(
    z.object({
      roundId: z.string().nonempty(),
      logo: z.string().nonempty(),
      name: z.string().nonempty(),
      tx: z.string().nonempty(),
      amount: z.number(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const round = await ctx.prisma.round.findFirst({
        where: {
          id: input.roundId,
        },
      });
      if (!round) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Round not found",
          cause: "Round not found",
        });
      }

      const res = await ctx.prisma.sponsor.create({
        data: {
          roundId: input.roundId,
          logo: input.logo,
          name: input.name,
          tx: input.tx,
        },
      });
      await ctx.prisma.round.update({
        data: {
          matchedPool: round.matchedPool + input.amount,
        },
        where: {
          id: input.roundId,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      });
    }
  });
