import { publicProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const activeRounds = publicProcedure.query(async ({ ctx }) => {
  const res = await prisma.round.findMany({
    where: {
      active: true,
      endTime: {
        gte: new Date(),
      },
    },
  });
  return res;
});
