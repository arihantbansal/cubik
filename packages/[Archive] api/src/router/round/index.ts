import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "./../../trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { Prisma, ProjectJoinRoundStatus } from "@cubik/database";
import { activeRounds, findPastRound, leaderBoard } from "./public";
import { TRPCError } from "@trpc/server";
import { createSponsor } from "./protected";
export const roundRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        tx: z.string().nonempty(),
        projectCount: z.number().positive(),
        notionPage: z.string().nonempty(),
        matchingPool: z.number().positive(),
        colorScheme: z.string(),
        short_description: z.string(),
        endTime: z.string(),
        startTime: z.string(),
        description: z.string(),
        manager: z.string(),
        registrationStartDate: z.date(),
        registrationEndDate: z.date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.create({
        data: {
          id: uuid(),
          active: true,
          userId: ctx.session?.user?.id,
          contributions: 0,
          matchedPool: input.matchingPool,
          notionPage: input.notionPage,
          projectCount: input.projectCount,
          roundName: input.name,
          description: input.description,
          tx: input.tx,
          colorScheme: input.colorScheme,
          endTime: input.endTime,
          startTime: input.startTime,
          manager: input.manager,
          short_description: input.short_description,
          registrationEndDate: input.registrationEndDate,
          registrationStartDate: input.registrationStartDate,
        },
      });
      return roundRes;
    }),
  // type
  details: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            include: {
              project: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      });
      return roundRes;
    }),

  findActive: activeRounds,
  findPast: findPastRound,
  leaderboard: leaderBoard,
  createSponsor: createSponsor,
  findInReview: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: "PENDING",
            },
            include: {
              project: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      });
      return roundRes;
    }),

  findAcceptedGrants: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: ProjectJoinRoundStatus.APPROVED,
            },
            include: {
              project: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      });
      return roundRes;
    }),
  findRejectedGrants: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: ProjectJoinRoundStatus.REJECTED,
            },
            include: {
              project: {
                include: {
                  owner: true,
                },
              },
            },
          },
        },
      });
      return roundRes;
    }),

  contribution: publicProcedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const roundRes = await prisma.round.findMany({
        where: {
          id: input.roundId,
        },
        include: {
          Contribution: {
            include: {
              ProjectsModel: true,
              user: true,
            },
          },
        },
      });
      return roundRes;
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
        projectJoinRoundId: z.string().nonempty(),
        status: z.enum(["ACCEPTED", "REJECTED"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const roundInfo = await prisma.round.findUnique({
        where: {
          id: input.roundId,
        },
      });
      if (!roundInfo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Round not found",
          cause: "Round not found",
        });
      }

      if (roundInfo.userId !== ctx.session?.user?.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid Round Admin",
          cause: "round user id doesnt match login user id",
        });
      }

      if (input.status === "REJECTED") {
        const roundRes = await prisma.projectJoinRound.update({
          where: {
            id: input.projectJoinRoundId,
          },
          data: {
            status: "REJECTED",
          },
        });
        return roundRes;
      } else {
        const roundRes = await prisma.projectJoinRound.update({
          where: {
            id: input.projectJoinRoundId,
          },
          data: {
            status: "APPROVED",
          },
        });
        return roundRes;
      }
    }),

  findOneAdmin: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const res = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            include: {
              project: {
                include: {
                  owner: true,
                },
              },
            },
          },
          Contribution: {
            include: {
              user: true,
            },
          },
        },
      });
      if (!res) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Round not found",
          cause: "Round not found",
        });
      }

      if (res.userId !== ctx.session?.user?.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid Round Admin",
          cause: "round user id doesnt match login user id",
        });
      }

      return res;
    }),
});
