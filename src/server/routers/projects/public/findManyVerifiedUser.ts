import { z } from 'zod';
import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findManyVerifiedUser = procedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      const res = await prisma.projectJoinRound.findMany({
        include: {
          project: {
            include: {
              owner: true,
              Contribution: true,
            },
          },
        },
      });
      const userProjectsAmountRaise = res
        .filter((project) => project.project.owner.id === input.id)
        .reduce((acc, curr) => {
          return acc + curr.amountRaise!;
        }, 0);

      const userProjectsCommunityContribution = res.filter(
        (project) => project.project.owner.id === input.id
      );
      let communityContribution = 0;

      userProjectsCommunityContribution.forEach((project) => {
        project.project.Contribution?.forEach((contribution) => {
          communityContribution += contribution.usdTotal;
        });
      });

      return [userProjectsAmountRaise, communityContribution];
    } catch (error) {
      console.log(error);
      return [0, 0];
    }
  });
