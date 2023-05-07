import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const userRouter = router({
  create: procedure
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
            tx: input.tx,
          },
        });
        return res;
      } catch (error) {
        console.log(error);
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
        username: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
        include: {
          project: true,
        },
      });
      console.log('response find one - ', res);
      return res;
    }),

  searchUser: procedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.username.length < 2) return [];
      const res = await prisma.userModel.findMany({
        where: {
          username: {
            contains: input.username,
          },
        },
      });
      return res;
    }),

  checkUsername: procedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input }) => {
      if (input.username.length < 3) return false;
      const res = await prisma.userModel.findUnique({
        where: {
          username: input.username,
        },
      });
      console.log(res, input.username);

      if (!res) {
        return false;
      }

      return true;
    }),
});
