import { ProjectVerifyStatus } from "@cubik/database";
import { publicProcedure } from "../../../trpc";
export const findManyReview = publicProcedure.query(
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
          status: ProjectVerifyStatus.REVIEW,
          isArchive: false,
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || "There was some error in trpc call");
    }
  }
);
