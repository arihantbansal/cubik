'use server';

import { prisma } from '@cubik/database';

export const getOrCreateUser = async (publicKey: string) => {
  const user = await prisma.user.findUnique({
    where: {
      mainWallet: publicKey,
    },
    select: {
      username: true,
      profilePicture: true,
      id: true,
    },
  });

  if (!user?.username) return null;
  else if (user) return user;
  else {
    await prisma.user.create({
      data: {
        mainWallet: publicKey,
      },
    });

    return null;
  }
};
