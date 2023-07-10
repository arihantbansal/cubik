import { z } from 'zod';
import { Prisma, ProjectVerifyStatus } from 'database';
import { prisma } from '../../../utils/prisma';
import { TRPCError } from '@trpc/server';
import { v4 as uuid } from 'uuid';
import { procedure } from '~/server/trpc';

export const createUser = procedure
  .input(
    z.object({
      id: z.string().uuid(),
      username: z.string().nonempty(),
      mainWallet: z.string().nonempty(),
      profilePicture: z.string(),
      tx: z.string().nonempty(),
    })
  )
  .mutation(async ({ input }) => {
    /*
            A check for signature is missing 
        */
    try {
      const res = prisma.userModel.create({
        data: {
          id: input.id,
          mainWallet: input.mainWallet,
          profilePicture: input.profilePicture,
          username: input.username,
          proof: [],
          tx: input.tx,
          email: '',
        },
      });
      return res;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: (error as Error).message,
        cause: (error as Error).stack,
      });
    }
  });
