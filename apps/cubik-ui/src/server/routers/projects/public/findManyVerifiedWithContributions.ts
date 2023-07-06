import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findManyVerifiedWithContributions = procedure.query(async () => {
  try {
    const res = await prisma.projectsModel.findMany({
      include: {
        ProjectJoinRound: {
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
          },
        },
        owner: true,
      },
      where: {
        status: 'VERIFIED',
        isArchive: false,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error');
  }
});
