import { prisma } from '~/server/utils/prisma';
import jwt from 'jsonwebtoken';

export const authHandler = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  const tokenSplit = token.split(' ')[1];

  if (tokenSplit === 'null') {
    return null;
  }
  const payload = jwt.decode(tokenSplit) as jwt.JwtPayload;

  const user = await prisma.userModel.findUnique({
    where: {
      id: payload.id,
    },
  });
  console.log(user, '-----');

  return user;
};
