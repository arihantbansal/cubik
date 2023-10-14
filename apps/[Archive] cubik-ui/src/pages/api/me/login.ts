import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { prisma } from "@cubik/database";
import jwt from "jsonwebtoken";
import { verifyMessage } from "~/utils/getsignMessage";
import * as anchor from "@coral-xyz/anchor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, signature } = req.body as { id: string; signature: string };
  try {
    const user = await prisma.userModel.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(204).send({
        data: null,
        code: 204,
        error: "User not found",
      });
    }

    const final = await verifyMessage(
      signature,
      new anchor.web3.PublicKey(user.mainWallet),
      id
    );

    if (!final) {
      return res.status(401).send({
        data: null,
        code: 401,
        error: "Invalid signature",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        wallet: user.mainWallet,
      },
      env.NEXTAUTH_SECRET as string,
      {
        expiresIn: "6h",
      }
    );

    return res.status(200).send({
      data: {
        user: user,
        access_token: token,
      },
      code: 200,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send("Something went wrong");
  }
}
