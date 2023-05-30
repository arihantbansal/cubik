import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';
import { procedure } from '~/server/trpc';

export const checkUsername = procedure
  .input(z.object({ username: z.string() }))
  .mutation(async ({ input }) => {
    if (input.username.length < 3) return false;
    const res = await prisma.userModel.findUnique({
      where: {
        username: input.username,
      },
    });

    if (!res) {
      return false;
    }

    return true;
  });
