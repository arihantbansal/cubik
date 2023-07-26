import { z } from 'zod';
import { publicProcedure } from '../../../trpc';

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
      });
      return projects;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
