import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const getMe = procedure
  .input(
    z.object({
      id: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    if (!input.id) {
      return null;
    }
    const user = await prisma.userModel.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  });
