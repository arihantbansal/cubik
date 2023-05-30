import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findManyVerified = procedure.query(async () => {
  try {
    const res = await prisma.projectsModel.findMany({
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true,
          },
        },
        owner: true,
      },
      where: {
        status: 'VERIFIED',
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error');
  }
});
