import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const findOneWithProjectAndRoundDetails = protectedProcedure
  .input(
    z.object({
      username: z.string().nonempty(),
    })
  )
  .query(async ({ input, ctx: { prisma } }) => {
    const res = await prisma.userModel.findUnique({
      where: {
        username: input.username,
      },
      include: {
        project: {
          include: {
            ProjectJoinRound: true,
          },
        },
      },
    });
    return res;
  });
