// ignore whole file for ts
// @ts-nocheck
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';
import { qfEstimated, qfV1 } from '../utils/qf';

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
export const poolRouter = router({
  findqf: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
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

  findEstimated: procedure
    .input(
      z.object({
        projectId: z.string().nonempty(),
        roundId: z.string().nonempty(),
        amount: z.number(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.round.findFirst({
        where: {
          id: input.roundId,
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
      const amount = qfEstimated(
        filterdProjectJoinRound,
        input.projectId,
        input.amount
      );

      return amount;
    }),
});
