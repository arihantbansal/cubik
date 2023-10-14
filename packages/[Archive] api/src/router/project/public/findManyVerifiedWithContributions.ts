import { publicProcedure } from "../../../trpc";

export const findManyVerifiedWithContributions = publicProcedure.query(
  async ({ ctx: { prisma } }) => {
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
          status: "VERIFIED",
          isArchive: false,
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || "There was some error");
    }
  }
);
