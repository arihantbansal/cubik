import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';

export const projectAdminDetails = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const response = prisma.projectsModel.findFirst({
      where: { id: input.id, isArchive: false },
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: {
              include: {
                Contribution: {
                  include: {
                    user: true,
                  },
                  where: {
                    projectId: input.id,
                  },
                },
              },
            },
          },
        },
      },
    });
    return response;
  });
