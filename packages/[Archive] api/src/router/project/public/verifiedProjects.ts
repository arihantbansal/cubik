import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import type { verifiedProjectsType } from "../../../types";

export const verifiedProjects = publicProcedure
  .input(
    z.object({
      filter: z.string().optional(),
      round: z.array(z.string()).optional(),
      seed: z.number().optional(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    function seededRandom(seed: number) {
      var m = 25;
      var a = 11;
      var c = 17;

      seed = (a * seed + c) % m;
      return seed / m;
    }

    function shuffleArray(array: any[], seed: number) {
      var count = array.length,
        randomNumber,
        temp;
      while (count) {
        randomNumber = Math.floor(seededRandom(seed) * count);
        count--;
        temp = array[count];
        array[count] = array[randomNumber];
        array[randomNumber] = temp;
        seed++;
      }

      return array;
    }

    const result = await prisma.projectJoinRound.findMany({
      where: {
        status: "APPROVED",
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
            owner: {
              select: {
                username: true,
              },
            },
            isArchive: true,
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

    const res: verifiedProjectsType[] = shuffleArray(
      result,
      (input.seed as number) ?? 0
    ).filter((e) => e.project.isArchive === false);

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
