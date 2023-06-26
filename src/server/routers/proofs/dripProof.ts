import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
import { UserProof } from '~/types/user';
import { ProofType } from '~/utils/program/contract';

export const dripProof = protectedProcedure.mutation(async ({ ctx }) => {
  try {
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
        proof: (userProofs
          ? [
              ...(userProofs as unknown as ProofType[]),
              {
                name: 'DRIPS01' as ProofType,
                timestamp: new Date(),
                tx: '',
              },
            ]
          : [
              {
                name: 'DRIPS01' as ProofType,
                timestamp: new Date(),
                tx: '',
              },
            ]) as unknown as Prisma.JsonArray,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      cause: 'Internal Server Error',
      message: 'Internal Server Error',
    });
  }
});
