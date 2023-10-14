import { publicProcedure } from "../../../trpc";

export const activeRounds = publicProcedure.query(
  async ({ ctx: { prisma } }) => {
    try {
      const res = await prisma.round.findMany({
        where: {
          active: true,
          endTime: {
            gte: new Date(),
          },
        },
        select: {
          id: true,
          endTime: true,
          startTime: true,
          matchedPool: true,
          colorScheme: true,
          short_description: true,
          roundName: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);

      throw new Error("Error fetching active rounds");
    }
  }
);
