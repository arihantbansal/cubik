import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../trpc";
export const getAll = publicProcedure.query(async ({ ctx: { prisma } }) => {
  try {
    const res = await prisma.hackathon.findMany({
      select: {
        name: true,
        id: true,
        background: true,
        logo: true,
        slug: true,
        short_description: true,
        prize_pool: true,
        timeline: true,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
});
