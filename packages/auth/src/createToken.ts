import { AuthPayload } from "@cubik/common-types";
import { SignJWT } from "jose";

export const createToken = async (tokenPayload: AuthPayload) => {
  try {
    let secret = new TextEncoder().encode(process.env.SECRET);

    const alg = "HS256";
    const token = new SignJWT(tokenPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
