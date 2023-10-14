import * as anchor from "@coral-xyz/anchor";
import nacl from "tweetnacl";

export const createMessage = async (token?: string | undefined) => {
  const message =
    "Welcome to Cubik a platform where community helps projects to grow"; //todo: isko change karna hai
  let id: string | undefined = "";
  if (token) {
    id = token;
  } else {
    id = localStorage.getItem("anon_id") ?? undefined;
  }

  if (!id) {
    throw new Error("id not found");
  }

  const data = new TextEncoder().encode(message + "-" + id);

  return data;
};
export const verifyMessage = async (
  signature: string,
  publicKey: anchor.web3.PublicKey,
  id?: string
) => {
  const message = await createMessage(id);

  const result = nacl.sign.detached.verify(
    message,
    anchor.utils.bytes.bs58.decode(signature),
    publicKey.toBytes()
  );
  return result;
};
