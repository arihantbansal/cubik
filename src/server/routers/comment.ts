import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';
import { TRPCError } from '@trpc/server';

export const commentRouter = router({
  createComment: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        project: z.string().nonempty(),
        comment: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx;

      if (!ctx.session) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Session not found',
          cause: 'User not logged in',
        });
      }
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User id not found',
          cause: 'Corrupted session',
        });
      }
      const res = await prisma.comments.create({
        data: {
          comment: input.comment,
          id: input.id,
          userId: session?.user.id as string,
          projectsModelId: input.project,
        },
      });

      return res;
    }),

  getComments: procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.comments.findMany({
        where: {
          projectsModelId: input.id,
        },
        include: {
          Reply: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
      return res;
    }),

  createReply: procedure
    .input(
      z.object({
        id: z.string().uuid(),
        commentid: z.string().nonempty(),
        reply: z.string().nonempty(),
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
      if (!ctx.session.user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User id not found',
          cause: 'Corrupted session',
        });
      }
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
