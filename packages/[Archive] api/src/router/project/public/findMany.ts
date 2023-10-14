import { ProjectJoinRoundStatus } from "@cubik/database";
import { publicProcedure } from "../../../trpc";

export const findManyProjects = publicProcedure.query(
  async ({ ctx: { prisma } }) => {
    try {
      const res = await prisma.projectJoinRound.findMany({
        where: {
          status: ProjectJoinRoundStatus.APPROVED,
        },
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
          project: {
            include: {
              owner: true,
            },
          },
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || "There was some error in trpc call");
    }
  }
);
