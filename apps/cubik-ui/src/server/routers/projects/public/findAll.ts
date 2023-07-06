import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findAllProject = procedure.query(async () => {
  try {
    const res = await prisma.projectsModel.findMany({
      where: {
        isArchive: false,
      },
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true,
          },
        },
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error');
  }
});
