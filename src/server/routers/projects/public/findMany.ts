import { procedure } from '~/server/trpc';
import { z } from 'zod';
import { prisma } from '~/server/utils/prisma';
import { ProjectJoinRoundStatus } from '@prisma/client';

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
        project: true,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error in trpc call');
  }
});
