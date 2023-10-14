import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@cubik/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body as { id: string };
  try {
    const user = await prisma.userModel.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(204).send(null);
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(500).send("Something went wrong");
  }
}
