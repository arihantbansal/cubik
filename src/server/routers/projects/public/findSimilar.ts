import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findSimilar = procedure
  .input(
    z.object({
      industry: z.array(z.string()),
    })
  )
  .query(async ({ ctx, input }) => {
    const projects = await prisma?.projectsModel.findMany({
      where: {
        OR: [
          {
            industry: {
              contains: '',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return projects;
  });
