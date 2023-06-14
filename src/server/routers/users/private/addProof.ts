import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
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
    })
  )
  .mutation(async ({ ctx, input }) => {
    const user = ctx.session.user;

    const updatedUser = await prisma.userModel.update({
      where: {
        id: user.id,
      },
      data: {
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
