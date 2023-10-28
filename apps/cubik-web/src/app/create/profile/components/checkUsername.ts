'use server';

import { prisma } from '@cubik/database';

export async function checkUsername(username: string) {
  try {
    const res = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!res) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
