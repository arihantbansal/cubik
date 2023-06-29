import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const registration = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string(),
      userId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const res = prisma?.hackathonRegistrations.create({
        data: {
          userId: input.userId,
          hackathonId: input.hackathonId,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Couldn't register user to hackathon",
      });
    }
  });
