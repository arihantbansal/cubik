import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/utils/prisma';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.body as { wallet: string };

  try {
    // @todo:- Put a check for the wallet address is valid or not

    const user = await prisma.userKeys.findFirst({
      where: {
        publicKey: wallet,
      },
    });

    if (!user) {
      const newUser = await prisma.userKeys.create({
        data: {
          publicKey: wallet,
        },
      });
      return res.status(201).send({
        data: {
          id: newUser.id,
          wallet: wallet,
        },
        code: 201,
        error: null,
      });
    }
    return res.status(200).send({
      data: {
        id: user.id,
        wallet: user.publicKey,
      },
      code: 200,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      data: null,
      code: 500,
      error: 'Something went wrong',
    });
  }
}
