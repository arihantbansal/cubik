import { env } from "@/env.mjs";
import * as anchor from "@coral-xyz/anchor";
import nacl from "tweetnacl";

export const createMessage = (nonce: string) => {
  const hash = nonce + env.NEXT_PUBLIC_SECRET?.slice(0, 10);
  const check = anchor.utils.sha256.hash(hash);
  const message = `🔶 Welcome to Cubik! 🔶\n
-----------------------------\n
🌱 Dive into a realm where every voice fuels projects, \n
breathing life into ideas with the power of community. 🌱 \n
session: ${check}\n`;

  const data = new TextEncoder().encode(message);

  return data;
};

export const verifyMessage = (
  signature: string,
  publicKey: anchor.web3.PublicKey,
  nonce: string
) => {
  const message = createMessage(nonce);
  const result = nacl.sign.detached.verify(
    message,
    anchor.utils.bytes.bs58.decode(signature),
    publicKey.toBuffer()
  );
  return result;
};
