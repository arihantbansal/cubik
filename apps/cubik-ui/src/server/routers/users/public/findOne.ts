import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findOneUser = procedure
  .input(
    z.object({
      username: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const res = await prisma.userModel.findUnique({
      where: {
        username: input.username,
      },
      include: {
        project: true,
      },
    });
    return res;
  });
