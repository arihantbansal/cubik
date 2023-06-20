import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findSimilar = procedure
  .input(
    z.object({
      industry: z.array(z.string()).optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const projects = await prisma?.projectsModel.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        owner: true,
      },
    });
    return projects;
  });
