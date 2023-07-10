import { z } from 'zod';
import { protectedProcedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const findOneWithProjectAndRoundDetails = protectedProcedure
  .input(
    z.object({
      username: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
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
