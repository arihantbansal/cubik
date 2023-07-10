import { protectedProcedure } from '~/server/trpc';
import { z } from 'zod';
import { Prisma, ProjectVerifyStatus } from 'database';
import { prisma } from '../../../utils/prisma';
import { TRPCError } from '@trpc/server';
import { v4 as uuid } from 'uuid';

export const projectAdminDetails = protectedProcedure
  .input(
    z.object({
      id: z.string().nonempty(),
    })
  )
  .query(async ({ input }) => {
    const response = prisma.projectsModel.findFirst({
      where: { id: input.id, isArchive: false },
      include: {
        ProjectJoinRound: {
          include: {
            fundingRound: {
              include: {
                Contribution: {
                  include: {
                    user: true,
                  },
                  where: {
                    projectId: input.id,
                  },
                },
              },
            },
          },
        },
      },
    });
    return response;
  });
