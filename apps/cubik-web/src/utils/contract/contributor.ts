import { web3 } from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as spl from '@solana/spl-token';

import { connection, getSdk } from './sdk';

export const createContributorIx = async (
  wallet: NodeWallet,
  amount: number,
  split: number,
  roundId: string,
  projectCount: number,
  token: string,
  projectOwnerAddress: string,
  multiSig: web3.PublicKey,
): Promise<(web3.TransactionInstruction | null)[]> => {
  const sdk = getSdk(wallet);
  const createKey = web3.Keypair.generate();

  const tokenMint = new web3.PublicKey(token);

  // ATAs
  const ataSender = await spl.getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const ataAdmin = await spl.getAssociatedTokenAddress(
    tokenMint,
    new web3.PublicKey('52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ'),
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const ataReciver = await spl.getAssociatedTokenAddress(
    tokenMint,
    multiSig,
    true,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  );
  const info = await connection.getAccountInfo(ataReciver);
  const info2 = await connection.getAccountInfo(ataAdmin);
  let tokenAccountIx: web3.TransactionInstruction | null = null;
  let tokenAccountIx2: web3.TransactionInstruction | null = null;
  if (!info) {
    tokenAccountIx = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ataReciver,
      multiSig,
      tokenMint,
    );
  }
  if (!info2) {
    tokenAccountIx2 = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ataAdmin,
      new web3.PublicKey('52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ'),
      tokenMint,
    );
  }

  const [contributorAccount] = sdk.contribution.getContributionV2PDA(
    wallet.publicKey,
    createKey.publicKey,
  );
  const [adminAccount] = sdk.admin.getAdminPDA();

  const [projectAccount] = sdk.project.getProjectPDA(
    new web3.PublicKey(projectOwnerAddress),
    projectCount,
  );

  const ix = await sdk.contribution.create(
    wallet.publicKey,
    amount,
    split,
    roundId,
    projectCount,
    adminAccount,
    projectAccount,
    contributorAccount,
    tokenMint,
    ataAdmin,
    ataSender,
    ataReciver,
    projectOwnerAddress,
    createKey.publicKey,
  );
  return [ix, tokenAccountIx, tokenAccountIx2];
};
