import { protectedProcedure } from "../../../trpc";

export const projectsHackathonSubmit = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const res = ctx.prisma.projectsModel.findMany({
        where: {
          owner_publickey: ctx.session.user.mainWallet,
          isActive: true,
          isArchive: false,
          status: "VERIFIED",
        },
        select: {
          id: true,
          name: true,
          short_description: true,
          logo: true,
          status: true,
          projectUserCount: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);
