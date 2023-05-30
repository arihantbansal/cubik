import { z } from 'zod';
import { publicProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const verifiedProjects = publicProcedure
  .input(
    z.object({
      filter: z.string().optional(),
      round: z.array(z.string()).optional(),
    })
  )
  .query(async ({ input }) => {
    const res = await prisma.projectJoinRound.findMany({
      include: {
        fundingRound: true,
        project: {
          include: {
            owner: true,
          },
        },
        contributors: {
          include: {
            user: true,
          },
        },
      },
    });

    // when both filter are working
    if (input.filter && input.round && input.round?.length > 0) {
      console.log('Inside the both');
      const active = res.filter((e) => {
        e.project.industry.includes(input.filter as string) &&
          input.round?.includes(e.fundingRound.id);
      });

      return active;
    }

    // only round working
    if (input.round && input.round.length > 0 && !input.filter) {
      const active = res.filter((e) => {
        e.project.industry.includes(input.filter as string);
      });

      return active;
    }
    // returns all projects with the round
    if (input.round && input.round.length > 0 && input.filter) {
      console.log('Inside the filter');
      const active = res.filter((e) => {
        input.round?.includes(e.fundingRound.id);
      });

      return active;
    }

    return res;
  });
