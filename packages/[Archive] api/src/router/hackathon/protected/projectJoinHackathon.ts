import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const projectJoinHackathon = protectedProcedure
  .input(
    z.object({
      hackathonId: z.string().nonempty(),
      projectId: z.string().nonempty(),
      tx: z.string().nonempty(),
      tracks: z.array(
        z.object({
          label: z.string().nonempty(),
          value: z.string().nonempty(),
        })
      ),
      mainTracks: z.string().nonempty(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const res = ctx.prisma.projectJoinHackathons.create({
        data: {
          hackathonId: input.hackathonId,
          projectId: input.projectId,
          tx: input.tx,
          tracks: input.tracks,
          mainTrack: input.mainTracks,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  });
