import { ProjectJoinRoundStatus } from '@cubik/database';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findManyProjects = procedure.query(async () => {
  try {
    const res = await prisma.projectJoinRound.findMany({
      where: {
        status: ProjectJoinRoundStatus.APPROVED,
      },
      include: {
        fundingRound: {
          include: {
            Contribution: {
              include: {
                user: true,
              },
            },
          },
        },
        project: {
          include: {
            owner: true,
          },
        },
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error in trpc call');
  }
});
