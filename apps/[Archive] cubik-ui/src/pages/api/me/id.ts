import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@cubik/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.body as { publicKey: string };

  try {
    // @todo:- Put a check for the wallet address is valid or not

    const user = await prisma.userKeys.findUnique({
      where: {
        publicKey: publicKey,
      },
    });

    if (!user) {
      const newUser = await prisma.userKeys.create({
        data: {
          publicKey: publicKey,
        },
      });

      return res.status(201).send({
        data: {
          id: newUser.id,
          wallet: publicKey,
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
      error: "Something went wrong",
    });
  }
}
