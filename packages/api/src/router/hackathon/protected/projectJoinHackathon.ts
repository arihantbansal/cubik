import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';

export const projectJoinHackathon = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string().nonempty(),
      projectId: z.string().nonempty(),
      tx: z.string().nonempty(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const res = ctx.prisma.projectJoinHackathons.create({
        data: {
          hackathonId: input.hackathonId,
          projectId: input.projectId,
          tx: input.tx,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
