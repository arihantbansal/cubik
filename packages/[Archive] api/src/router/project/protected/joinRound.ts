import { ProjectJoinRoundStatus } from "@cubik/database";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const joinRound = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
      tx: z.string().nonempty(),
      projectId: z.string().nonempty(),
      roundId: z.string().nonempty(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { prisma } = ctx;
    if (!ctx.session.user) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Session not found",
        cause: "User not logged in",
      });
    }
    const project = await prisma.projectsModel.findUnique({
      where: {
        id: input.projectId,
      },
    });
    if (project?.owner_publickey !== ctx.session.user.mainWallet) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "User is not the owner for this project",
        cause: "Invalid User ",
      });
    }
    const round = await prisma.round.findUnique({
      where: {
        id: input.roundId,
      },
    });
    if (!round) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Round not found",
        cause: "Invalid Round ",
      });
    }

    const res = await prisma.projectJoinRound.create({
      data: {
        id: input.id,
        tx: input.tx,
        projectId: input.projectId,
        roundId: input.roundId,
        status: ProjectJoinRoundStatus.PENDING,
      },
    });

    return res;
  });
