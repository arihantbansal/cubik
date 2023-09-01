import { verifyMessage } from "@/utils/helpers/getSignatureMessage";
import { web3 } from "@coral-xyz/anchor";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@cubik/database";
import { createToken } from "@/utils/helpers/auth";

export async function POST(req: NextRequest) {
  try {
    const { signature, publicKey, nonce } = await req.json();

    const result = await verifyMessage(
      signature,
      new web3.PublicKey(publicKey),
      nonce
    );
    if (result) {
      const user = await prisma.user.findUnique({
        where: {
          mainWallet: publicKey,
        },
      });
      if (!user) {
        return NextResponse.json(
          {
            data: false,
            error: "User not found",
          },
          {
            status: 404,
            statusText: "User not found",
          }
        );
      }

      const session = await createToken({
        ip: "test",
        mainWallet: publicKey,
        id: user.id,
        profilePicture: user.profilePicture as string,
        username: user.username as string,
        profileNft: user.profileNft as any,
      });
      const response = NextResponse.json(
        {
          data: result,
          accessToken: session,
          error: null,
        },
        {}
      );
      response.cookies.set("authToken", session as string, {
        expires: new Date(Date.now() + 3600000),
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json({
        data: result,
        error: "Error verifying signature",
      });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json({
      data: false,
      error: "Error verifying signature",
    });
  }
}
