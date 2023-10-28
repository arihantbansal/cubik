'use server';

import { prisma } from '@cubik/database';

export const searchTeam = async (search: string) => {
  try {
    if (!search || search.length < 3) return [];
    const res = await prisma.user.findMany({
      where: {
        username: {
          contains: search,
        },
      },
    });

    return res?.map((item) => {
      return {
        value: item.id,
        label: item.username,
        icon: item.profilePicture,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
