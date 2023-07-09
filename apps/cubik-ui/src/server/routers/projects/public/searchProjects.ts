import { ProjectVerifyStatus } from 'database';
import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
export const searchProjects = procedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const res = prisma.projectsModel.findMany({
        where: {
          name: {
            contains: input.name,
          },
          status: ProjectVerifyStatus.VERIFIED,
          isArchive: false,
        },
        select: {
          id: true,
          name: true,
          logo: true,
          owner: {
            select: {
              username: true,
            },
          },
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  });
