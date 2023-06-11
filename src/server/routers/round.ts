import { TRPCError } from '@trpc/server';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../trpc';
import { prisma } from '../utils/prisma';
import { activeRounds } from './rounds';

export const roundRouter = router({
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
  details: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
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

  findActive: procedure.query(async ({ ctx }) => {
    const roundRes = await prisma.round.findMany({
      where: {
        active: true,
        endTime: {
          gte: new Date(),
        },
      },
    });
    return roundRes;
  }),
  findActivePresentAndFutureRounds: procedure.query(async ({ ctx }) => {
    const roundRes = await prisma.round.findMany({
      where: {
        active: true,
        endTime: {
          gte: new Date(),
        },
        startTime: {
          lte: new Date(),
        },
      },
    });
    return roundRes;
  }),
  findOngoingRounds: activeRounds,
  findInReview: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ ctx, input }) => {
      const roundRes = await prisma.round.findFirst({
        where: {
          id: input.id,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: 'PENDING',
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

  findAcceptedGrants: procedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const roundRes = await prisma.round.findMany({
        where: {
          id: input.roundId,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: 'APPROVED',
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
  findRejectedGrants: procedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const roundRes = await prisma.round.findMany({
        where: {
          id: input.roundId,
        },
        include: {
          ProjectJoinRound: {
            where: {
              status: 'REJECTED',
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

  contribution: procedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
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

  updateStatus: procedure
    .input(
      z.object({
        roundId: z.string().nonempty(),
        projectJoinRoundId: z.string().nonempty(),
        status: z.enum(['ACCEPTED', 'REJECTED']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const roundInfo = await prisma.round.findUnique({
        where: {
          id: input.roundId,
        },
      });
      if (!roundInfo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Round not found',
          cause: 'Round not found',
        });
      }

      if (roundInfo.userId !== ctx?.user?.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid Round Admin',
          cause: 'round user id doesnt match login user id',
        });
      }

      if (input.status === 'REJECTED') {
        const roundRes = await prisma.projectJoinRound.update({
          where: {
            id: input.projectJoinRoundId,
          },
          data: {
            status: 'REJECTED',
          },
        });
        return roundRes;
      } else {
        const roundRes = await prisma.projectJoinRound.update({
          where: {
            id: input.projectJoinRoundId,
          },
          data: {
            status: 'APPROVED',
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
          code: 'NOT_FOUND',
          message: 'Round not found',
          cause: 'Round not found',
        });
      }

      if (res.userId !== ctx?.user?.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid Round Admin',
          cause: 'round user id doesnt match login user id',
        });
      }

      return res;
    }),
});
