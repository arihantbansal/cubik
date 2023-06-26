import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
import { UserProof } from '~/types/user';

export const dripProof = protectedProcedure
  .input(z.object())
  .mutation(async ({ ctx, input }) => {
    const check = await prisma.userModel.findMany({
      where: {
        proof: {
          path: '',
          array_contains: 'DRIPDS1',
        },
      },
    });
    if (check.length > 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: 'NFT is Already claimed by another user',
        message: 'NFT is Already claimed by another user',
      });
    }
    const fetchLatestUser = await prisma.userModel.findUnique({
      where: {
        id: ctx.user?.id,
      },
      select: {
        proof: true,
      },
    });
    const userProofs = fetchLatestUser?.proof as unknown as UserProof[];

    const user = await prisma.userModel.update({
      where: {
        id: ctx.user?.id,
      },
      data: {
        proof: [
          ...userProofs,
          {
            name: 'DRIPDS1',
          },
        ],
      },
    });

    return user;
  });
