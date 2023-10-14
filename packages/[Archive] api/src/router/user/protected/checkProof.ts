import { protectedProcedure } from "../../../trpc";
export const checkProof = protectedProcedure.query(async ({ ctx, input }) => {
  const prisma = ctx.prisma;
  const res = await prisma.userModel.findFirst({
    where: {
      id: ctx.session.user?.id,
    },
    include: {
      project: {
        where: {
          status: "VERIFIED",
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: "APPROVED",
            },
          },
        },
      },
    },
  });
  if (res?.project.length! > 0) {
    return true;
  }

  return false;
});
