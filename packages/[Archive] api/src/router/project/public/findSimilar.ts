import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findSimilar = publicProcedure
  .input(
    z.object({
      industry: z.array(z.string()).optional(),
    })
  )
  .query(async ({ ctx: { prisma }, input }) => {
    const projects = await prisma?.projectsModel.findMany({
      where: {
        isArchive: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: true,
      },
    });
    return projects;
  });
