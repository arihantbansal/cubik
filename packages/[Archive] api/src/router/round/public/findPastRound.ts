import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findPastRound = publicProcedure.query(async ({ ctx }) => {
  const { prisma } = ctx;
  try {
    const res = await prisma.round.findMany({
      where: {
        active: true,
        endTime: {
          lt: new Date(),
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
});
