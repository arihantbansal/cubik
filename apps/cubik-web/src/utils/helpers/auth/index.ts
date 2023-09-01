import type { AuthPayload, AuthTokenCheckReturn } from "@/types/auth";
import { jwtVerify, SignJWT } from "jose";

export const decodeToken = async (
  token: string
): Promise<AuthPayload | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);
    const decodedToken = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
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
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET);
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

export const handleLogout = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      cache: "no-cache",
    });
    return "success";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getToken = async () => {
  try {
    const res = await fetch("/api/auth/token", {
      cache: "no-cache",
      method: "GET",
    });
    const data = (await res.json()) as AuthTokenCheckReturn;
    if (data.error ?? !data.data) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
