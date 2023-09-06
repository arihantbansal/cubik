import { utils } from "@coral-xyz/anchor";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { env } from "@/env.mjs";

export async function POST() {
  try {
    const headersList = headers();
    console.log(headersList, "-----headers------");
    const nonce = headersList.get("x-cubik-nonce") as string;
    const hash = nonce + env.SECRET?.slice(0, 10);
    const check = utils.sha256.hash(hash);
    console.log(check, "-----hash------");
    return NextResponse.json({
      hash: check,
    });
  } catch (error) {
    console.log(error);
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
}
