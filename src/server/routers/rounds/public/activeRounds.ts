import { publicProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const activeRounds = publicProcedure.query(async ({ ctx }) => {
  try {
    const res = await prisma.round.findMany({
      where: {
        active: true,
        endTime: {
          gte: new Date(),
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);

    throw new Error('Error fetching active rounds');
  }
});
