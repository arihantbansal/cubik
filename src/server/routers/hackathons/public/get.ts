import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const get = procedure
  .input(z.object({ name: z.string().nonempty() }))
  .query(async ({ input }) => {
    const res = await prisma.hackathon.findFirst({
      where: {
        name: input.name,
      },
    });

    return res;
  });
