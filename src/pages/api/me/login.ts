import { NextApiRequest, NextApiResponse } from 'next';
import { env } from '~/env.mjs';
import { prisma } from '~/server/utils/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body as { id: string };

  const user = await prisma.userKeys.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(404).send({
      data: null,
      code: 404,
      error: 'User not found',
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
      wallet: user.publicKey,
    },
    env.NEXTAUTH_SECRET as string,
    {
      algorithm: 'RS256',
      expiresIn: '1d',
    }
  );
  return res.status(200).send({
    data: {
      access_token: token,
    },
    code: 200,
    error: null,
  });
}
