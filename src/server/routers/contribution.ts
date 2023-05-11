import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { prisma } from '../utils/prisma';

export const contributionRouter = router({
  create: procedure
    .input(
      z.object({
        userId: z.string().nonempty(),
        token: z.string().nonempty(),
        split: z.number(),
        totalAmount: z.number().positive(),
        tx: z.string().nonempty(),
        usd: z.number().positive(),
        projectId: z.string().nonempty(),
        roundId: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const contribution = await prisma.contribution.findFirst({
        where: {
          isLatest: true,
          projectId: input.projectId,
          roundId: input.roundId,
        },
      });
      if (contribution) {
        const contributionRes = await prisma.contribution.create({
          data: {
            id: uuid(),
            token: input.token,
            split: input.split,
            currentTotal: contribution.currentTotal + input.totalAmount,
            currentusdTotal: contribution.currentusdTotal + input.usd,
            usdTotal: input.usd,
            total: input.totalAmount,
            count: contribution.count + 1,
            tx: input.tx,
            userId: input.userId,
            projectId: input.projectId,
            roundId: input.roundId,
            isLatest: true,
          },
        });
        await prisma.contribution.update({
          where: {
            id: contribution.id,
          },
          data: {
            isLatest: false,
          },
        });
        return contributionRes;
      } else {
        const contributionRes = await prisma.contribution.create({
          data: {
            id: uuid(),
            token: input.token,
            split: input.split,
            usdTotal: input.usd,
            total: input.totalAmount,
            tx: input.tx,
            userId: input.userId,
            projectId: input.projectId,
            roundId: input.roundId,
            currentTotal: input.totalAmount,
            currentusdTotal: input.usd,
            isLatest: true,
          },
        });
        return contributionRes;
      }
    }),
});
