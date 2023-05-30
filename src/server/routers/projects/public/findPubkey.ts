import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const findPubkey = procedure
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
  });
