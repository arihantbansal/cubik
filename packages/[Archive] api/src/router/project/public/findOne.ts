import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findOneProject = publicProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const res = await prisma.projectsModel.findUnique({
      where: {
        id: input.id,
      },
      include: {
        owner: true,
        Contribution: {
          include: {
            user: true,
          },
        },
        Team: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return res;
  });
