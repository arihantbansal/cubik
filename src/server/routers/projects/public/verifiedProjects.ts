import {
  Contribution,
  ProjectJoinRound,
  ProjectsModel,
  Round,
  UserModel,
} from '@prisma/client';
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
    function shuffle(
      array: (ProjectJoinRound & {
        project: ProjectsModel & {
          Contribution: (Contribution & {
            user: UserModel;
          })[];
          owner: UserModel;
        };
        fundingRound: Round;
      })[]
    ) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    const res = await prisma.projectJoinRound.findMany({
      where: {
        status: 'APPROVED',
      },
      include: {
        fundingRound: true,
        project: {
          include: {
            owner: true,
            Contribution: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    // const res = shuffle(result);
    // when both filter are working
    if (input.filter && input.round && input.round?.length > 0) {
      console.log('Inside the both');
      const active = res.filter((e) => {
        const industry = JSON.parse(e.project.industry) as {
          label: string;
          value: string;
          colorScheme: string;
        }[];

        if (
          industry.some((e) => e.value === input.filter) &&
          input.round?.includes(e.fundingRound.id)
        ) {
          return e;
        }
      });

      return active;
    }

    // only filter working
    if (input.round && input.round.length === 0 && input.filter) {
      console.log('Inside the filter');
      const active = res.filter((e) => {
        if (e.project.industry.includes(input.filter as string)) {
          return e;
        }
      });

      return active;
    }
    // only round working
    if (input.round && input.round.length > 0 && !input.filter) {
      console.log('Inside the round');
      const active = res.filter((e) => {
        if (input.round?.includes(e.fundingRound.id)) {
          return e;
        }
      });

      return active;
    }

    return res;
  });
