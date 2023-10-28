import { decodeToken } from '@cubik/auth/src/admin';

export const IsUserLoginServer = async (token: string) => {
  try {
    const decodedToken = await decodeToken(token);
    if (decodedToken) {
      return decodedToken;
    }
    throw Error('User not Found');
  } catch (error) {
    console.log(error);
    return null;
  }
};
