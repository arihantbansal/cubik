import { z } from "zod";
import { publicProcedure } from "../../../trpc";
export const leaderBoard = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const res = await prisma.contribution.findMany({
      where: {
        roundId: input.id,
      },
      include: {
        user: true,
      },
    });

    let userBased: {
      id: string;
      username: string;
      total: number;
      profilePicture: string;
      counter: number;
      projects: string[];
    }[] = [];

    res.forEach((contribution) => {
      const user = userBased.find((user) => user.id === contribution.userId);
      const index = userBased.findIndex(
        (user) => user.id === contribution.userId
      );
      if (user) {
        let counter = userBased[index].counter;
        if (!userBased[index].projects.includes(contribution.projectId)) {
          counter++;
          userBased[index] = {
            ...userBased[index],
            counter: counter,
            total: userBased[index].total + contribution.usdTotal,
            projects: [...userBased[index].projects, contribution.projectId],
          };
        } else {
          userBased[index] = {
            ...userBased[index],
            total: userBased[index].total + contribution.usdTotal,
            counter: counter,
            projects: [...userBased[index].projects],
          };
        }
      } else {
        userBased.push({
          id: contribution.userId,
          username: contribution.user.username as string,
          total: contribution.usdTotal,
          profilePicture: contribution.user.profilePicture as string,
          counter: 1,
          projects: [contribution.projectId],
        });
      }
    });
    userBased.sort((a, b) => b.total - a.total);
    return userBased.slice(0, 20);
  });
