import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@cubik/database";
import { decodeToken } from "@/utils/helpers/auth";

import { getClientIp } from "request-ip";
import { AuthCheckReturn } from "@/types/auth";
import { env } from "@/env.mjs";

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();
    console.log(wallet);
    const authCookie = req.cookies.get("authToken");
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
        const res = await prisma.user.create({
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
        return NextResponse.json(returnData);
      }
      // user exists and create one
      if (user && !user?.username) {
        returnData = {
          data: {
            type: "EXISTING_WALLET",
          },
          error: null,
        };
        return NextResponse.json(returnData); // user wallet not created
      }
      returnData = {
        data: {
          type: "USER_FOUND",
        },
        error: null,
      };

      return NextResponse.json(returnData);
    } else {
      const decodedToken = await decodeToken(authCookie.value);
      if (!decodedToken || decodedToken.mainWallet !== wallet) {
        return NextResponse.json({
          data: null,
          error: "INVALID_TOKEN",
        }).cookies.delete("authToken");
      }
      returnData = {
        data: {
          type: "AUTHENTICATED_USER",
          accessToken: authCookie.value,
        },
        error: null,
      };
      return NextResponse.json(returnData);
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        data: null,
        error: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
