'use server';

import { prisma } from '@cubik/database';

export const findCount = async (owner: string) => {
  try {
    const res = await prisma.project.count({
      where: {
        ownerPublickey: owner,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
