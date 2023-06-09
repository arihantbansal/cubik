import { ProjectVerifyStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { procedure } from '~/server/trpc';
import { prisma } from '~/server/utils/prisma';

export const updateProjectStatus = procedure
  .input(
    z.object({
      id: z.string().nonempty(),
      status: z.enum([
        ProjectVerifyStatus.REVIEW,
        ProjectVerifyStatus.VERIFIED,
        ProjectVerifyStatus.FAILED,
      ]),
    })
  )
  .mutation(async ({ input, ctx }) => {
    if (
      ctx.user?.mainWallet !== '52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ'
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        cause: `User doesn't have permission to access Project Update`,
        message: 'Invalid User Session trying to access Project Update',
      });
    }
    const res = await prisma.projectsModel.update({
      where: {
        id: input.id,
      },
      data: {
        status: input.status as ProjectVerifyStatus,
      },
    });

    return res;
  });
