import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const get = procedure
  .input(z.object({ id: z.string().nonempty() }))
  .query(async ({ input }) => {
    const res = await prisma.hackathon.findUnique({
      where: {
        id: input.id,
      },
    });

    return res;
  });
