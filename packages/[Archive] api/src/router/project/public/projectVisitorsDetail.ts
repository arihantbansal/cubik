import { publicProcedure } from "../../../trpc";
import { z } from "zod";

export const projectVisitorsDetail = publicProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const response = prisma.projectsModel.findFirst({
      where: { id: input.id, isArchive: false },
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: true,
          },
        },
      },
    });
    return response;
  });
