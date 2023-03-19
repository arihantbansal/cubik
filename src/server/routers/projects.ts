import { procedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { TRPCError } from '@trpc/server';

export const projectsRouter = router({
  create: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        name: z.string().nonempty(),
        short_description: z.string().nonempty(),
        long_description: z.string().nonempty(),
        industry: z.string().nonempty(),
        logo: z.string().nonempty(),
        github: z.string().nonempty(),
        twitter: z.string().nonempty(),
        link: z.string().nonempty(),
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
      const res = await prisma.projectsModel.create({
        data: {
          id: input.id,
          name: input.name,
          industry: input.industry,
          logo: input.logo,
          long_description: input.long_description,
          owner_publickey: ctx.session.user.mainWallet,
          short_description: input.short_description,
          project_link: input.link,
          github_link: input.github,
          twitter_handle: input.twitter,
        },
      });
      return res;
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
          PojectJoinRound: {
            include: {
              fundingRound: true,
            },
          },
        },
      });
      return res;
    }),

  findMany: procedure.query(async () => {
    const res = await prisma.projectsModel.findMany({
      include: {
        PojectJoinRound: {
          include: {
            fundingRound: true,
          },
        },
      },
    });
    return res;
  }),
});
