import { z } from 'zod';
import { publicProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';
import { verifiedProjectsType } from '~/types/projects';

export const verifiedProjects = publicProcedure
  .input(
    z.object({
      filter: z.string().optional(),
      round: z.array(z.string()).optional(),
      seed: z.number().optional(),
    })
  )
  .query(async ({ input }) => {
    function seededRandom(seed: number) {
      var m = 25;
      var a = 11;
      var c = 17;

      seed = (a * seed + c) % m;
      return seed / m; // returns a float between 0 and 1
    }

    function shuffleArray(array: verifiedProjectsType[], seed: number) {
      var count = array.length,
        randomnumber,
        temp;
      while (count) {
        randomnumber = Math.floor(seededRandom(seed) * count);
        count--;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp;
        seed++;
      }

      return array;
    }

    const result = await prisma.projectJoinRound.findMany({
      where: {
        status: 'APPROVED',
      },
      select: {
        id: true,
        status: true,
        amountRaise: true,
        fundingRound: {
          select: {
            id: true,
            colorScheme: true,
            active: true,
            endTime: true,
            roundName: true,
            startTime: true,
          },
        },
        project: {
          select: {
            id: true,
            industry: true,
            logo: true,
            name: true,
            project_link: true,
            short_description: true,
            owner: true,
            Contribution: {
              select: {
                id: true,
                user: {
                  select: {
                    profilePicture: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const res = shuffleArray(result, (input.seed as number) ?? 0);
    // when both filter are working
    if (input.filter && input.round && input.round?.length > 0) {
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
      const active = res.filter((e) => {
        if (e.project.industry.includes(input.filter as string)) {
          return e;
        }
      });

      return active;
    }
    // only round working
    if (input.round && input.round.length > 0 && !input.filter) {
      const active = res.filter((e) => {
        if (input.round?.includes(e.fundingRound.id)) {
          return e;
        }
      });

      return active;
    }

    return res;
  });
