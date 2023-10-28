import { jwtVerify, SignJWT } from 'jose';

import { AuthPayload } from '@cubik/common-types/src/admin';

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

export const createToken = async (tokenPayload: AuthPayload) => {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_ADMIN);
    const alg = 'HS256';
    const token = new SignJWT(tokenPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
