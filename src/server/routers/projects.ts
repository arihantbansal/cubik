import {
  Prisma,
  ProjectJoinRoundStatus,
  ProjectVerifyStatus,
} from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { Grant } from '~/utils/calculateProjectMatchingFund';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const projectsRouter = router({
  create: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        industry: z.string().nonempty(),
        logo: z.string().nonempty(),
        long_description: z.string().nonempty(),
        name: z.string().nonempty(),
        short_description: z.string().nonempty(),
        discord_link: z.string(),
        project_link: z.string(),
        twitter_handle: z.string(),
        github_link: z.string(),
        projectUserCount: z.number(),
        telegram_link: z.string(),
        team: z.array(z.string()),
        sig: z.string().nonempty(),
        multiSigAddress: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session not found',
          cause: 'User not logged in',
        });
      }
      if (!ctx.session.user.mainWallet) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User wallet not found',
          cause: 'Corrupted session',
        });
      }
      let team: Prisma.TeamCreateManyInput[] = [];
      if (input.team.length !== 0) {
        team = input.team?.map((teamId) => {
          return {
            id: uuid(),
            projectsModelId: input.id,
            userId: teamId,
          };
        });
      }
      const teamOwner: Prisma.TeamCreateManyInput = {
        id: uuid(),
        projectsModelId: input.id,
        userId: ctx.session.user.id,
      };
      try {
        const res = await prisma.projectsModel.create({
          data: {
            id: input.id,
            industry: input.industry,
            logo: input.logo,
            sig: input.sig,
            long_description: input.long_description,
            name: input.name,
            owner_publickey: ctx.session.user.mainWallet,
            short_description: input.short_description,
            discord_link: input.discord_link,
            status: ProjectVerifyStatus.REVIEW,
            projectUserCount: input.projectUserCount,
            telegram_link: input.telegram_link,
            project_link: input.project_link,
            twitter_handle: input.twitter_handle,
            github_link: input.github_link,
            mutliSigAddress: input.multiSigAddress,
          },
        });
        await prisma.team.createMany({
          data: [teamOwner, ...team],
        });
        return res;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: (error as Error).message,
          cause: (error as Error).stack,
        });
      }
    }),

  findOne: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.projectsModel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          owner: true,
          Team: {
            include: {
              user: true,
            },
          },
          comments: {
            include: {
              user: true,
              Reply: {
                include: {
                  comment: true,
                  user: true,
                },
              },
            },
          },
          ProjectJoinRound: {
            include: {
              fundingRound: true,
            },
          },
        },
      });
      return res;
    }),
  findAll: procedure.query(async () => {
    try {
      const res = await prisma.projectsModel.findMany({
        include: {
          ProjectJoinRound: {
            include: {
              fundingRound: true,
            },
          },
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || 'There was some error');
    }
  }),
  findMany: procedure.query(async () => {
    try {
      const res = await prisma.projectsModel.findMany({
        include: {
          ProjectJoinRound: {
            include: {
              fundingRound: true,
            },
          },
        },
        where: {
          status: 'VERIFIED',
          AND: {
            ProjectJoinRound: {
              every: {
                status: 'APPROVED',
              },
            },
          },
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || 'There was some error');
    }
  }),
  findManyReview: procedure.query(async () => {
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
          status: 'REVIEW',
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || 'There was some error');
    }
  }),
  findManyVerified: procedure.query(async () => {
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
          status: 'VERIFIED',
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || 'There was some error');
    }
  }),
  findManyRejected: procedure.query(async () => {
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
          status: 'FAILED',
        },
      });
      return res;
    } catch (error: any) {
      throw new Error(error.message || 'There was some error');
    }
  }),

  findPubkey: procedure
    .input(
      z.object({
        publickey: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      if (!input.publickey) {
        return new TRPCError({
          message: 'Publickey does not exist',
          code: 'BAD_REQUEST',
        });
      }
      const res = await prisma.projectsModel.findMany({
        where: {
          owner_publickey: input.publickey,
        },
      });

      return res;
    }),

  updateProjectStatus: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        status: z.enum([
          ProjectVerifyStatus.REVIEW,
          ProjectVerifyStatus.VERIFIED,
          ProjectVerifyStatus.FAILED,
        ]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        ctx?.session?.user.mainWallet !==
        '52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ'
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          cause: `User doesn't have permission to access Rounds create`,
          message: 'Invalid User Session trying to access Round creation',
        });
      }
      const res = await prisma.projectsModel.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status as ProjectVerifyStatus,
        },
      });

      return res;
    }),

  joinRound: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        tx: z.string().nonempty(),
        projectId: z.string().nonempty(),
        roundId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session not found',
          cause: 'User not logged in',
        });
      }
      const project = await prisma.projectsModel.findUnique({
        where: {
          id: input.projectId,
        },
      });
      if (project?.owner_publickey !== ctx.session.user.mainWallet) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'User is not the owner for this project',
          cause: 'Invalid User ',
        });
      }
      const round = await prisma.round.findUnique({
        where: {
          id: input.roundId,
        },
      });
      if (!round) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Round not found',
          cause: 'Invalid Round ',
        });
      }

      const res = await prisma.projectJoinRound.create({
        data: {
          id: input.id,
          tx: input.tx,
          projectId: input.projectId,
          roundId: input.roundId,
          status: ProjectJoinRoundStatus.PENDING,
        },
      });

      return res;
    }),

  projectGraph: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.projectsModel.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Contribution: true,
          ProjectJoinRound: {
            include: {
              fundingRound: {
                include: {
                  ProjectJoinRound: {
                    include: {
                      project: {
                        include: {
                          Contribution: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      const round = await prisma.round.findUnique({
        where: {
          id: res?.ProjectJoinRound[0].roundId,
        },
        include: {
          ProjectJoinRound: {
            include: {
              project: {
                include: {
                  Contribution: {
                    where: {
                      isLatest: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      const contri = res?.Contribution.map((contribution) => {
        return contribution.usdTotal;
      });
      let roundContri: Grant[] = [];
      round?.ProjectJoinRound.forEach((round) => {
        roundContri.push({
          funding: round.project?.Contribution.map((contribution) => {
            return contribution.usdTotal;
          }),
        });
      });

      return {
        contribution: contri,
        round: roundContri,
        matchingPool: round?.matchedPool,
      };
    }),

  projectAdminDetails: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const response = prisma.projectsModel.findFirst({
        where: { id: input.id },
        include: {
          ProjectJoinRound: {
            include: {
              fundingRound: {},
            },
          },
        },
      });
      return response;
    }),
});
