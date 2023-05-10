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
      const contributionRes = await prisma.contribution.create({
        data: {
          id: uuid(),
          token: input.token,
          split: input.split,
          totalAmount: input.totalAmount,
          tx: input.tx,
          usdContribution: input.usd,
          userId: input.userId,
          projectId: input.projectId,
          roundId: input.roundId,
        },
      });

      return contributionRes;
    }),
});
