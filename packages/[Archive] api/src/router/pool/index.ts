import { Prisma } from "@cubik/database";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { z } from "zod";
import {
  qfV1,
  qfEstimated,
  HackathonAllType,
  qfEstimatedHackathon,
} from "../../utils/qf";
type RoundAllType = Prisma.RoundGetPayload<{
  include: {
    Contribution: {
      include: {
        ProjectsModel: true;
      };
    };
    ProjectJoinRound: true;
  };
}>;

export const poolRouter = createTRPCRouter({
  findqf: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const res = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          Contribution: {
            include: {
              ProjectsModel: true,
            },
          },
          ProjectJoinRound: {
            where: {
              isArchive: false,
            },
          },
        },
      });
      if (!res) return null;
      const filterdContributions = res.Contribution.filter(
        (element) => element.ProjectsModel.isArchive === false
      );
      const filterdProjectJoinRound: RoundAllType = {
        ...res,
        Contribution: filterdContributions,
      };
      const qf = qfV1(filterdProjectJoinRound);

      return qf;
    }),

  findEstimated: publicProcedure
    .input(
      z.object({
        projectId: z.string().nonempty(),
        roundId: z.string().nonempty(),
        amount: z.number(),
      })
    )
    .query(async ({ input, ctx: { prisma, session } }) => {
      const res = await prisma.hackathon.findFirst({
        where: {
          id: input.roundId,
        },
        include: {
          contribution: {
            include: {
              ProjectsModel: true,
            },
          },
          projectJoinHackathon: {
            where: {
              isArchive: false,
            },
          },
        },
      });
      if (!res) return null;
      const filterdContributions = res.contribution.filter(
        (element) => element.ProjectsModel.isArchive === false
      );
      const filterdProjectJoinRound: HackathonAllType = {
        ...res,
        contribution: filterdContributions,
      };
      const amount = qfEstimatedHackathon(
        filterdProjectJoinRound,
        input.projectId,
        input.amount,
        session.user?.id ?? ""
      );

      return amount;
    }),
});
