import type { Request, Response } from "express";
import { prisma } from "@cubik/database";
import { utils, web3 } from "@coral-xyz/anchor";
import { createToken, decodeToken } from "utils/auth";
import { verifyMessage } from "@cubik/auth";
import type { AuthCheckReturn, AuthPayload } from "@cubik/common-types";
import { envConfig } from "config";
import logger from "middleware/logger";
import requestIp from "request-ip";

export const check = async (req: Request, res: Response) => {
  try {
    const { wallet } = req.body;
    const authCookie = req.cookies["authToken"];

    let returnData: AuthCheckReturn = {
      data: null,
      error: null,
    };

    if (!authCookie) {
      const user = await prisma.user.findFirst({
        where: {
          mainWallet: wallet as string,
        },
      });
      // no user then add a user
      if (!user) {
        await prisma.user.create({
          data: {
            mainWallet: wallet as string,
          },
        });
        returnData = {
          data: {
            type: "NEW_WALLET",
          },
          error: null,
        };
        return res.status(200).json(returnData);
      }
      // user exists and create one
      if (user && !user?.username) {
        returnData = {
          data: {
            type: "EXISTING_WALLET",
          },
          error: null,
        };
        return res.json(returnData); // user wallet not created
      }
      returnData = {
        data: {
          type: "USER_FOUND",
        },
        error: null,
      };

      return res.json(returnData);
    } else {
      const decodedToken = await decodeToken(authCookie.value);
      const clientIp = requestIp.getClientIp(req);
      if (
        !decodedToken ||
        decodedToken.mainWallet !== wallet ||
        decodedToken.ip !== clientIp
      ) {
        return res.clearCookie("authToken").json({
          data: null,
          error: "INVALID_TOKEN",
        });
      }

      returnData = {
        data: {
          type: "AUTHENTICATED_USER",
          user: decodedToken,
        },
        error: null,
      };
      return res.json(returnData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: null,
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("authToken").json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { signature, publicKey } = req.body;

    // get nonce from headers
    const nonce = req.headers["x-cubik-nonce"] as string;
    const hash = nonce + envConfig.secret?.slice(0, 10);
    const check = utils.sha256.hash(hash);
    const result = verifyMessage(
      signature,
      new web3.PublicKey(publicKey),
      check
    );

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (result) {
      const user = await prisma.user.findUnique({
        where: {
          mainWallet: publicKey,
        },
      });

      if (!user) {
        return res.status(404).json({
          data: false,
          error: "User not found",
        });
      }
      const clientIp = requestIp.getClientIp(req);

      const session = await createToken({
        ip: clientIp as string,
        mainWallet: publicKey,
        id: user.id,
        profilePicture: user.profilePicture as string,
        username: user.username as string,
        profileNft: user.profileNft as any,
      });
      const userSessionPayload: AuthPayload = {
        ip: clientIp as string,
        mainWallet: publicKey,
        id: user.id,
        profilePicture: user.profilePicture as string,
        username: user.username as string,
        profileNft: user.profileNft as any,
      };
      const response = res
        .cookie("authToken", session as string, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          domain: ".cubik.so",
          path: "/",
        })
        .json({
          data: result,
          user: userSessionPayload,
          error: null,
        });

      return response;
    } else {
      return res.json({
        data: result,
        error: "Error verifying signature",
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(505).json({
      data: false,
      error: "Error verifying signature",
    });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const nonce = req.headers["x-cubik-nonce"] as string;
    const hash = nonce + envConfig.secret?.slice(0, 10);
    const check = utils.sha256.hash(hash);
    return res.json({
      hash: check,
    });
  } catch (error) {
    console.log(error);
    res.status(505).json({
      data: false,
      error: "Error while making message",
    });
  }
};

export const getDecodedToken = async (req: Request, res: Response) => {
  const authCookie = req.cookies["authToken"];

  try {
    const decodedToken = await decodeToken(authCookie.value);
    if (!decodedToken) {
      return res.status(400).json({
        data: null,
        error: "INVALID_TOKEN",
      });
    }
    return res.status(200).json({
      data: decodedToken,
      error: null,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      data: null,
      error: "INTERNAL_SERVER_ERROR",
    });
  }
};
