import { jwtVerify } from 'jose';

import { AuthPayload } from '@cubik/common-types';

export const decodeToken = async (
  token: string,
): Promise<AuthPayload | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET);

    const decodedToken = await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });

    if (!decodedToken) {
      return null;
    }

    return decodedToken.payload as AuthPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
