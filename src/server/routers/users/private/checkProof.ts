import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const checkProof = protectedProcedure.query(async ({ ctx, input }) => {
  const res = await prisma.userModel.findFirst({
    where: {
      id: ctx.user?.id,
    },
    include: {
      project: {
        where: {
          status: 'VERIFIED',
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: 'APPROVED',
            },
          },
        },
      },
    },
  });
  console.log(res?.project.length! > 0);
  if (res?.project.length! > 0) {
    return true;
  }

  return false;
});
