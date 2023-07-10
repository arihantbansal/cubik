import { procedure } from '~/server/trpc';
import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';

export const projectVisitorsDetail = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const response = prisma.projectsModel.findFirst({
      where: { id: input.id, isArchive: false },
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true,
          },
        },
      },
    });
    return response;
  });
