import * as anchor from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

const PROGRAM_ID = '9X22YWBVvXwiAB2GNDxWU2EmDsUrsXwmkG1e4zJUt7We';
const RPC_URL = 'https://api.devnet.solana.com';

import type { ContractType } from './program';
import { Contract } from './program';

export const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');

export const getProvider = (wallet: anchor.Wallet) => {
  const opts = {
    preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
  };

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const anchorProgram = (wallet: anchor.Wallet) => {
  const provider = getProvider(wallet);
  const idl = Contract as anchor.Idl;
  const program = new anchor.Program(
    idl,
    PROGRAM_ID,
    provider
  ) as unknown as anchor.Program<ContractType>;

  return program;
};

const createUser = () => {};
