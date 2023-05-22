import { TRPCError } from '@trpc/server';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

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
        endtime: z.string(),
        startTime: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log(ctx, '---ctx');

      const roundRes = await prisma.round.create({
        data: {
          id: uuid(),
          active: true,
          userId: ctx.session?.user?.id,
          communityContributions: 0,
          matchedPool: input.matchingPool,
          notionPage: input.notionPage,
          projectCount: input.projectCount,
          roundName: input.name,
          description: '',
          tx: input.tx,
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
      },
    });
    return roundRes;
  }),

  findInReview: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session not found',
          cause: 'User not logged in',
        });
      }
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

      if (roundInfo.userId !== ctx.session?.user.id) {
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
});
