import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const getProjects = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const projects = await ctx.prisma.projectsModel.findMany({
        where: {
          owner: {
            id: input.id,
          },
          isActive: true,
          isArchive: false,
        },
        select: {
          id: true,
          industry: true,
          name: true,
          logo: true,
          short_description: true,
          isArchive: true,
          status: true,
          project_link: true,
        },
      });
      return projects;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
