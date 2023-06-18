import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
import { UserProof } from '~/types/user';
import { ProofType } from '~/utils/program/contract';

export const addProof = protectedProcedure
  .input(
    z.object({
      name: z.enum([
        'LAMPORT',
        'SUPERTEAM',
        'MONKEYDAO',
        'CIVIC',
        'SOCIAL',
        'GOOGLE',
        'DROPS01',
      ]),
      tx: z.string().nonempty(),
      email: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const user = ctx.session.user;
    let otherInfo = {};
    if (input.name === 'GOOGLE') {
      otherInfo = {
        email: input.email,
      };
    }
    const alreadyClaimedProofs = ctx.user?.proof as unknown as UserProof[];

    if (alreadyClaimedProofs.find((e) => e.name === input.name)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Proof already claimed',
      });
    }
    const updatedUser = await prisma.userModel.update({
      where: {
        id: user.id,
      },
      data: {
        ...otherInfo,
        proof: (user.proof
          ? [
              ...(user.proof as unknown as ProofType[]),
              {
                name: input.name as ProofType,
                timestamp: new Date(),
                tx: input.tx,
              },
            ]
          : [
              {
                name: input.name as ProofType,
                timestamp: new Date(),
                tx: input.tx,
              },
            ]) as unknown as Prisma.JsonArray,
      },
    });

    return updatedUser;
  });
