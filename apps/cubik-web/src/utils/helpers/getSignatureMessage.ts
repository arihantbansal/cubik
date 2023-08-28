import * as anchor from "@coral-xyz/anchor";
import nacl from "tweetnacl";

export const createMessage = async (nonce: string) => {
  const hash = nonce + process.env.NEXT_PUBLIC_SECRET?.slice(0, 10);
  const check = anchor.utils.sha256.hash(hash);
  const message = `🔶 Welcome to Cubik! 🔶\n
-----------------------------\n
🌱 Dive into a realm where every voice fuels projects, \n
breathing life into ideas with the power of community. 🌱 \n
session: ${check}\n`;

  const data = new TextEncoder().encode(message);

  return data;
};

export const verifyMessage = async (
  signature: string,
  publicKey: anchor.web3.PublicKey,
  nonce: string
) => {
  const message = await createMessage(nonce);
  const result = nacl.sign.detached.verify(
    message,
    anchor.utils.bytes.bs58.decode(signature),
    publicKey.toBuffer()
  );
  return result;
};
