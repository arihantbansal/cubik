import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const get = publicProcedure
  .input(z.object({ slug: z.string().nonempty() }))
  .query(async ({ input, ctx: { prisma } }) => {
    const res = await prisma.hackathon.findFirst({
      where: {
        slug: input.slug,
      },
      include: {
        team: {
          include: {
            user: true,
          },
        },
      },
    });

    return res;
  });
