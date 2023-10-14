import { decode, type JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@cubik/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ data: null, code: 401, error: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];

  const payload = decode(token) as JwtPayload;
  const user = await prisma.userModel.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    return res.status(204).json({
      data: null,
      code: 204,
      error: "User not found",
    });
  }
  return res.status(200).json({
    data: user,
    code: 200,
    error: null,
  });
}
