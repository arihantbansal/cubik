import { z } from 'zod';
import { protectedProcedure } from '../../../trpc';

type tracksDB = {
  label: string;
};

export const projectJoinHackathon = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string().nonempty(),
      projectId: z.string().nonempty(),
      tx: z.string().nonempty(),
      tracks: z.array(z.string()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const tracksDB: tracksDB[] = [];
      input.tracks.forEach(track => {
        tracksDB.push({ label: track });
      });
      const res = ctx.prisma.projectJoinHackathons.create({
        data: {
          hackathonId: input.hackathonId,
          projectId: input.projectId,
          tracks: tracksDB,
          tx: input.tx,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
