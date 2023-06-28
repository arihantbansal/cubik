import { TRPCError } from '@trpc/server';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const getAll = procedure.query(async () => {
  try {
    const res = await prisma.hackathon.findMany({
      select: {
        name: true,
        id: true,
        background: true,
        logo: true,
        short_description: true,
        prize_pool: true,
        timeline: true,
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
});
