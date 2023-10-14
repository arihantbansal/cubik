import { publicProcedure } from "../../../trpc";

export const findManyRejected = publicProcedure.query(
  async ({ ctx: { prisma } }) => {
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
          status: "FAILED",
          isArchive: false,
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || "There was some error");
    }
  }
);
