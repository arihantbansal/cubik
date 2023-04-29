import { getCsrfToken } from 'next-auth/react';
import nacl from 'tweetnacl';
import * as anchor from '@coral-xyz/anchor';

export const createMessage = async (crsfToken?: string | undefined) => {
  const message = 'Hello World';
  let crsf: string | undefined = await getCsrfToken();
  if (crsfToken) {
    crsf = crsfToken;
  }

  const data = new TextEncoder().encode(message + '-' + crsf);

  return data;
};
export const verifyMessage = async (
  signature: string,
  publicKey: anchor.web3.PublicKey,
  crfToken?: string
) => {
  const message = await createMessage(crfToken);

  const result = nacl.sign.detached.verify(
    message,
    anchor.utils.bytes.bs58.decode(signature),
    publicKey.toBytes()
  );

  return result;
};
