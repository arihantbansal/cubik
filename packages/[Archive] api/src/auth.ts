import { prisma } from "@cubik/database";
import { decode } from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export const authHandler = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  const tokenSplit = token.split(" ")[1];

  if (tokenSplit === "null") {
    return null;
  }

  const payload = decode(tokenSplit) as JwtPayload;

  const user = await prisma.userModel.findUnique({
    where: {
      id: payload.id,
    },
  });

  return user;
};
