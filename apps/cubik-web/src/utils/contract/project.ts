import type { web3 } from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

import { getSdk } from './sdk';

export const createProjectIx = (
  wallet: NodeWallet,
  counter: number,
  multiSig: web3.PublicKey,
): Promise<web3.TransactionInstruction> => {
  const sdk = getSdk(wallet);

  const [projectAccount] = sdk.project.getProjectPDA(wallet.publicKey, counter);
  const [adminAccount] = sdk.admin.getAdminPDA();
  const [userAccount] = sdk.user.getUserPDA(wallet.publicKey);

  return sdk.project.create(
    wallet.publicKey,
    adminAccount,
    projectAccount,
    userAccount,
    counter,
    multiSig,
  );
};

export const createProjectJoinRoundIx = (
  wallet: NodeWallet,
  counter: number,
  id: string,
  owner: web3.PublicKey,
): Promise<web3.TransactionInstruction> => {
  const sdk = getSdk(wallet);

  const [projectAccount] = sdk.project.getProjectPDA(owner, counter);
  const [roundAccount] = sdk.round.getRoundPDA(id);
  const [projectJoinRound] = sdk.project.getProjectJoinRoundPDA(
    roundAccount,
    projectAccount,
  );

  return sdk.project.projectJoinRound(
    wallet.publicKey,
    projectJoinRound,
    roundAccount,
    projectAccount,
  );
};
