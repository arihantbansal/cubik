import { env } from "@/env.mjs";
import { utils, web3 } from "@coral-xyz/anchor";
import { verifyMessage } from "@cubik/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { signature, publicKey } = await req.json();
  const headersList = headers();
  const nonce = headersList.get("x-cubik-nonce") as string;

  const hash = nonce + env.SECRET_ADMIN?.slice(0, 10);
  const check = utils.sha256.hash(hash);

  if (!signature || !publicKey || !nonce) {
    return NextResponse.json(
      {
        error: "Missing params",
      },
      {
        status: 400,
        statusText: "Missing params",
      }
    );
  }
  try {
    const result = verifyMessage(
      signature,
      new web3.PublicKey(publicKey),
      check
    );
    if (!result) {
      return NextResponse.json(
        {
          error: "Verification failed",
        },
        {
          status: 400,
          statusText: "Verification failed",
        }
      );
    }
  } catch (error) {
    console.error(error);
    NextResponse.json(
      {
        data: false,
        error: "Error while making message",
      },
      {
        status: 500,
        statusText: "Error while making message",
      }
    );
  }
};
