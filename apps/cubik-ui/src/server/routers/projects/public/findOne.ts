import { procedure } from '~/server/trpc';
import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';

export const findOneProject = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const res = await prisma.projectsModel.findUnique({
      where: {
        id: input.id,
      },
      include: {
        owner: true,
        Contribution: {
          include: {
            user: true,
          },
        },
        Team: {
          include: {
            user: true,
          },
        },
      },
    });
    return res;
  });
