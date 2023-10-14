import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { qfV1, qfV1Hackathon } from "../../utils/qf";
import {
  Prisma,
  ProjectJoinHackathons,
  ProjectJoinRound,
} from "@cubik/database";
export const contributionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
        token: z.string().nonempty(),
        split: z.number(),
        totalAmount: z.number(),
        tx: z.string().nonempty(),
        usd: z.number().positive(),
        projectId: z.string().nonempty(),
        roundId: z.string().nonempty(),
        projectJoinRoundId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const contribution = await prisma.contribution.findFirst({
        where: {
          isLatest: true,
          projectId: input.projectId,
          roundId: input.roundId,
        },
      });
      if (contribution) {
        const contributionRes = await prisma.contribution.create({
          data: {
            id: uuid(),
            token: input.token,
            split: input.split,
            currentTotal: contribution.currentTotal + input.totalAmount,
            currentusdTotal: contribution.currentusdTotal + input.usd,
            usdTotal: input.usd,
            total: input.totalAmount,
            count: contribution.count + 1,
            tx: input.tx,
            userId: input.userId,
            projectId: input.projectId,
            roundId: input.roundId,
            isLatest: true,
            projectJoinRoundId: contribution.projectJoinRoundId,
          },
        });
        await prisma.contribution.update({
          where: {
            id: contribution.id,
          },
          data: {
            isLatest: false,
          },
        });
        return contributionRes;
      } else {
        const contributionRes = await prisma.contribution.create({
          data: {
            id: uuid(),
            token: input.token,
            split: input.split,
            usdTotal: input.usd,
            total: input.totalAmount,
            tx: input.tx,
            userId: input.userId,
            projectId: input.projectId,
            roundId: input.roundId,
            currentTotal: input.totalAmount,
            currentusdTotal: input.usd,
            isLatest: true,
            projectJoinRoundId: input.projectJoinRoundId,
          },
        });
        return contributionRes;
      }
    }),

  createHackathon: protectedProcedure
    .input(
      z.object({
        token: z.string().nonempty(),
        projectId: z.string().nonempty(),
        tx: z.string().nonempty(),
        totalAmount: z.number(),
        usd: z.number().positive(),
        hackathonId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      try {
        const hackathon = await prisma.contribution.create({
          data: {
            id: uuid(),
            token: input.token,
            split: 0,
            currentTotal: input.totalAmount,
            currentusdTotal: input.usd,
            usdTotal: input.usd,
            total: input.totalAmount,
            count: 0,
            tx: input.tx,
            userId: session.user.id,
            projectId: input.projectId,
            isLatest: true,
            hackathonId: input.hackathonId,
          },
        });

        return hackathon;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  updateProjectRaise: protectedProcedure
    .input(
      z.object({
        projectJoinRoundId: z.string().nonempty(),
        roundId: z.string().nonempty(),
        projectId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const res = await prisma.hackathon.findUnique({
        where: {
          id: input.roundId,
        },
        include: {
          contribution: true,
          projectJoinHackathon: {
            where: {
              isArchive: false,
            },
          },
        },
      });
      if (!res) return null;
      const qf = qfV1Hackathon(res);

      const allProjects = await prisma.projectJoinHackathons.findMany({
        where: {
          isArchive: false,
          hackathonId: input.roundId,
        },
      });
      const updatePromise: Prisma.Prisma__ProjectJoinHackathonsClient<ProjectJoinHackathons>[] =
        [];
      allProjects.forEach(async (e) => {
        const a = prisma.projectJoinHackathons.update({
          where: {
            id: e.id,
          },
          data: {
            amount: qf.find((el) => el.projectId === e.projectId)?.amount ?? 0,
          },
        });
        updatePromise.push(a);
      });
      return await Promise.all(updatePromise);
    }),

  getProjectContributors: publicProcedure
    .input(
      z.object({
        projectId: z.string().nonempty(),
        roundId: z.string().optional(),
        hackthonId: z.string().optional(),
        skip: z.number().default(0),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      if (input.roundId) {
        const contributions = await prisma.contribution.findMany({
          where: {
            projectId: input.projectId,
            roundId: input.roundId,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.skip,
          select: {
            id: true,
            total: true,
            usdTotal: true,
            createdAt: true,
            token: true,
            count: true,
            user: true,
          },
        });
        return contributions;
      } else if (input.hackthonId) {
        console.log(input.hackthonId, "----");
        const contributions = await prisma.contribution.findMany({
          where: {
            projectId: input.projectId,
            hackathonId: input.hackthonId,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: input.skip,
          select: {
            id: true,
            total: true,
            usdTotal: true,
            createdAt: true,
            token: true,
            count: true,
            user: true,
          },
        });

        return contributions;
      } else {
        return [];
      }
    }),

  getUserContributions: publicProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const contributions = await prisma.contribution.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          ProjectsModel: {
            include: {
              owner: true,
              ProjectJoinRound: {
                include: {
                  fundingRound: true,
                  project: true,
                },
              },
            },
          },
        },
      });
      return contributions;
    }),

  getRoundContributions: publicProcedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const contributions = await prisma.contribution.findMany({
        where: {
          roundId: input.roundId,
        },
        include: {
          user: true,
          ProjectsModel: true,
          Round: true,
        },
      });
      return contributions;
    }),
});
