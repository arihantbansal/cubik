import { procedure } from '~/server/trpc';
import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';

export const findOneJoinRound = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const res = await prisma.projectJoinRound.findUnique({
      where: {
        id: input.id,
      },
      include: {
        project: {
          include: {
            Team: {
              include: {
                user: true,
              },
            },
            // @dhruv i have added these here
            Contribution: {
              include: {
                user: true,
              },
            },
            owner: true,
          },
        },
        fundingRound: true,
      },
    });
    return res;
  });
