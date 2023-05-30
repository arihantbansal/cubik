import { procedure } from '~/server/trpc';
import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';

export const findOneProject = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
      projectJoinId: z.string().nullable(),
    })
  )
  .query(async ({ input }) => {
    if (input.projectJoinId) {
      const res = await prisma.projectsModel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          owner: true,
          Team: {
            include: {
              user: true,
            },
          },
          ProjectJoinRound: {
            where: {
              id: input.projectJoinId,
            },
            include: {
              fundingRound: true,
            },
          },
        },
      });
      return res;
    } else {
      const res = await prisma.projectsModel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          owner: true,
          Team: {
            include: {
              user: true,
            },
          },
          ProjectJoinRound: {
            include: {
              fundingRound: true,
            },
          },
        },
      });
      return res;
    }
  });
