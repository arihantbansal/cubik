import { protectedProcedure } from "../../../trpc";

export const projectIsValid = protectedProcedure.query(async ({ ctx }) => {
  try {
    const res = await ctx.prisma.projectJoinHackathons.findMany({
      where: {
        projectsModel: {
          owner_publickey: ctx.session.user.mainWallet,
        },
      },
      select: {
        projectsModel: {
          select: {
            id: true,
          },
        },
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
});
