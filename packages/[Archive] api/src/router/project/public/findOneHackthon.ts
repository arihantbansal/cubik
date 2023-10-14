import { z } from "zod";
import { publicProcedure } from "../../../trpc";

export const findOneHackthon = publicProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      const res = await ctx.prisma.projectJoinHackathons.findFirst({
        where: {
          id: input.id,
          isArchive: false,
        },
        include: {
          projectsModel: {
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
          hackathon: true,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
