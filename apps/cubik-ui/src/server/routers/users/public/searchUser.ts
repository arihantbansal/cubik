import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';
import { procedure } from '~/server/trpc';

export const searchUser = procedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .query(async ({ input }) => {
    if (input.username.length < 2) return [];
    const res = await prisma.userModel.findMany({
      where: {
        username: {
          contains: input.username,
        },
      },
    });
    return res;
  });
