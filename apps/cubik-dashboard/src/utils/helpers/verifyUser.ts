import { utils } from '@coral-xyz/anchor';

import { createMessage } from '@cubik/auth';
import type { AuthAdminVerifyReturn } from '@cubik/common-types/src/admin';

import { getMessage } from '../auth';

interface VerifyUser {
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
  publicKey: string;
}
export const verifyUser = async ({ signMessage, publicKey }: VerifyUser) => {
  try {
    const nonce = Math.random().toString(36).substring(2, 15);
    const hash = await getMessage(nonce);
    if (!hash) {
      throw new Error('Hash is undefined');
    }
    const msg = createMessage(hash);
    const sigBuffer = await signMessage!(msg!);
    const sig = utils.bytes.bs58.encode(sigBuffer);
    const verifyRes = await fetch('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({
        signature: sig,
        publicKey: publicKey,
      }),
      headers: {
        ['x-cubik-nonce']: nonce,
        ['Content-Type']: 'application/json',
      },
      cache: 'no-cache',
    });
    const verifyResponse = (await verifyRes.json()) as AuthAdminVerifyReturn;

    return verifyResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
