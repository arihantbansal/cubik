import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@cubik/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const search = request.query.search as string;
  try {
    if (!search || search.length < 3) return [];
    const res = await prisma.user.findMany({
      where: {
        username: {
          contains: search,
        },
      },
    });

    return response.json(
      res?.map((item) => {
        return {
          value: item.id,
          label: item.username,
          icon: item.profilePicture,
        };
      }),
    );
  } catch (error) {
    console.log(error);
    return response.json([]);
  }
}
