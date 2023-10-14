import { ProjectVerifyStatus } from "@cubik/database";
import { z } from "zod";
import { publicProcedure } from "../../../trpc";
export const searchProjects = publicProcedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation(async ({ input, ctx: { prisma } }) => {
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
