import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findOneJoinRound = publicProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const res = await prisma.projectJoinRound.findUnique({
      where: {
        id: input.id,
      },
      include: {
        project: {
          include: {
            Team: {
              include: {
                user: true,
              },
            },
            Contribution: {
              include: {
                user: true,
              },
            },
            owner: true,
          },
        },
        fundingRound: true,
      },
    });
    return res;
  });
