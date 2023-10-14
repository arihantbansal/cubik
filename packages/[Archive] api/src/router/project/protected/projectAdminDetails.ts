import { protectedProcedure } from "../../../trpc";
import { z } from "zod";

export const projectAdminDetails = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const response = prisma.projectsModel.findFirst({
      where: { id: input.id, isArchive: false },
      select: {
        status: true,
        name: true,
        createKey: true,
        mutliSigAddress: true,
        short_description: true,
        long_description: true,
        projectJoinHackathon: {
          select: {
            amount: true,

            hackathon: {
              select: {
                name: true,
                timeline: true,
                // contribution: {
                //   select: {
                //     user: {
                //       select: {
                //         username: true,
                //         profilePicture: true,
                //       },
                //     },
                //   },
                //   where: {
                //     projectId: input.id,
                //   },
                // },
              },
            },
          },
        },
        ProjectJoinRound: {
          select: {
            status: true,
            amountRaise: true,
            fundingRound: {
              select: {
                id: true,
                startTime: true,
                roundName: true,
                endTime: true,
                // Contribution: {
                //   select: {
                //     user: {
                //       select: {
                //         username: true,
                //         profilePicture: true,
                //       },
                //     },
                //   },
                //   where: {
                //     projectId: input.id,
                //   },
                // },
              },
            },
          },
        },
      },
    });
    return response;
  });
