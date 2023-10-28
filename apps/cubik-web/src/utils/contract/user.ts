'use client';

import type { web3 } from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

import { getSdk } from './sdk';

export const createUserIx = (
  wallet: NodeWallet,
  username: string,
): Promise<web3.TransactionInstruction> => {
  const sdk = getSdk(wallet);

  const [userAccount] = sdk.user.getUserPDA(wallet.publicKey);

  return sdk.user.create(wallet.publicKey, userAccount, username);
};

export const createAdmin = (
  wallet: NodeWallet,
): Promise<web3.TransactionInstruction> => {
  const sdk = getSdk(wallet);

  const [adminAccount] = sdk.admin.getAdminPDA();

  return sdk.admin.create(wallet.publicKey, adminAccount);
};
