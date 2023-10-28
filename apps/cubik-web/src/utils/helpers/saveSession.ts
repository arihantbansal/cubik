'use server';

import { prisma } from '@cubik/database';

export const saveSession = async (
  mainWallet: string,
  {
    ip,
    userAgent,
  }: {
    ip: string;
    userAgent: string;
  },
) => {
  await prisma.session.create({
    data: {
      ipAddress: ip,
      userAgent,
      User: {
        connect: {
          mainWallet,
        },
      },
    },
  });
};
