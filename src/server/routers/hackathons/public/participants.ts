import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const participants = procedure
  .input(
    z.object({
      hackathonId: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    try {
      const result = await prisma.hackathonRegistrations.findMany({
        where: {
          hackathonId: input.hackathonId,
        },
        select: {
          User: {
            select: {
              id: true,
              profilePicture: true,
              username: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      });
    }
  });
