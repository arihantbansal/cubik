import { publicProcedure } from "../../../trpc";

export const findAllProject = publicProcedure.query(
  async ({ ctx: { prisma } }) => {
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
      throw new Error(error.message || "There was some error");
    }
  }
);
