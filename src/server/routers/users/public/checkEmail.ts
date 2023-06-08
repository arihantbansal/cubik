import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';
import { procedure } from '~/server/trpc';

export const checkEmail = procedure
  .input(z.object({ email: z.string() }))
  .mutation(async ({ input }) => {
    if (input.email.length < 3) return false;
    const res = await prisma.userModel.findUnique({
      where: {
        email: input.email,
      },
    });

    if (res) {
      return false;
    }

    return true;
  });
