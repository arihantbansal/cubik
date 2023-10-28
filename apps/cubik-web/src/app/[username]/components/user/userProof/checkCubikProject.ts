'use server';

import { prisma } from '@cubik/database';

export const checkCubikProject = async (wallet: string): Promise<number> => {
  try {
    const res = await prisma.project.count({
      where: {
        owner: {
          mainWallet: wallet,
        },
        isActive: true,
        isArchive: false,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
