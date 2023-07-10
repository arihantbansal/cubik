import { ProjectVerifyStatus } from 'database';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const findManyReview = procedure.query(async () => {
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
        status: ProjectVerifyStatus.REVIEW,
        isArchive: false,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message || 'There was some error in trpc call');
  }
});
