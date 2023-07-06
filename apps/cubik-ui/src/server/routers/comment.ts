import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const commentRouter = router({
  createComment: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        project: z.string().nonempty(),
        comment: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;

      const res = await prisma.comments.create({
        data: {
          comment: input.comment,
          id: input.id,
          userId: session?.user.id as string,
          projectsModelId: input.project,
          reactions: [],
          isArchive: false,
        },
      });

      return res;
    }),

  getComments: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        page: z.number().int().default(0),
      })
    )
    .query(async ({ input }) => {
      try {
        const res = await prisma.comments.findMany({
          where: {
            projectsModelId: input.id,
            isArchive: false,
          },
          take: 10,
          skip: input.page * 10,
          select: {
            _count: true,
            comment: true,
            id: true,
            reactions: true,
            user: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return res;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    }),
  getCommetsLoadMore: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        page: z.number().int().default(0),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const res = await prisma.comments.findMany({
          where: {
            projectsModelId: input.id,
            isArchive: false,
          },
          take: 10,
          skip: input.page * 10,
          select: {
            _count: true,
            comment: true,
            id: true,
            reactions: true,
            user: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        return res;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    }),
  createReply: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        commentid: z.string().nonempty(),
        reply: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const res = await prisma.reply.create({
        data: {
          id: input.id,
          commentId: input.commentid,
          replyUserId: ctx.session?.user.id as string,
          reply: input.reply,
        },
      });

      return res;
    }),
});
