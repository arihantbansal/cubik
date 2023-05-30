import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
import { Grant } from '~/utils/calculateProjectMatchingFund';

export const projectGraph = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const res = await prisma.projectsModel.findUnique({
      where: {
        id: input.id,
      },
      include: {
        Contribution: true,
        ProjectJoinRound: {
          include: {
            fundingRound: {
              include: {
                ProjectJoinRound: {
                  include: {
                    project: {
                      include: {
                        Contribution: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    const round = await prisma.round.findUnique({
      where: {
        id: res?.ProjectJoinRound[0].roundId,
      },
      include: {
        ProjectJoinRound: {
          include: {
            project: {
              include: {
                Contribution: {
                  where: {
                    isLatest: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const contri = res?.Contribution.map((contribution) => {
      return contribution.usdTotal;
    });
    let roundContri: Grant[] = [];
    round?.ProjectJoinRound.forEach((round) => {
      return roundContri.push({
        funding: round.project?.Contribution.map((contribution) => {
          return contribution.usdTotal;
        }),
        projectId: '', // @todo add project id here i have added it because it was showing some bug
      });
    });

    return {
      contribution: contri,
      round: roundContri,
      matchingPool: round?.matchedPool,
    };
  });
