import * as anchor from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

const PROGRAM_ID = 'Wgvt4LxST3JmUxZae5z7AYqzd63vo6EXjnW1aaMVX8L';
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

export const createUser = async (wallet: NodeWallet, username: string) => {
  const program = anchorProgram(wallet);
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(username), wallet.publicKey.toBuffer()],
    program.programId
  );
  const ix = program.methods
    .createUser(username)
    .accounts({
      userAccount: user_account,
      authority: wallet.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const createProject = async (
  wallet: NodeWallet,
  username: string,
  counter: number,
  multi_sig: anchor.web3.PublicKey
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(username), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      wallet.publicKey.toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
  const ix = program.methods
    .createProject(JSON.stringify(counter), multi_sig)
    .accounts({
      adminAccount: adminAccount,
      owners: wallet.publicKey,
      projectAccount: project_account,
      userAccount: user_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    });

  return ix;
};

export const markProjectVerified = (
  wallet: NodeWallet,
  username: string,
  counter: number
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(username), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      wallet.publicKey.toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
  const ix = program.methods
    .updateProjectStatusVerified(JSON.stringify(counter), wallet.publicKey)
    .accounts({
      adminAccount: adminAccount,
      authority: wallet.publicKey,
      projectAccount: project_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
      userAccount: user_account,
    })
    .instruction();

  return ix;
};

export const markProjectFailed = (
  wallet: NodeWallet,
  username: string,
  counter: number
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode(username), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      wallet.publicKey.toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
  const ix = program.methods
    .updateProjectStatusFailed(JSON.stringify(counter), wallet.publicKey)
    .accounts({
      adminAccount: adminAccount,
      authority: wallet.publicKey,
      projectAccount: project_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
      userAccount: user_account,
    })
    .instruction();

  return ix;
};

export const createRound = async (
  wallet: NodeWallet,
  id: string,
  matchingPool: number,
  projectSize: number
) => {
  if (id.length > 30) return;
  const program = anchorProgram(wallet);
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('round'), Buffer.from(id)],
    program.programId
  );
  const ix = await program.methods
    .createRound(id, matchingPool, projectSize)
    .accounts({
      authority: wallet.publicKey,
      roundAccount: round_account,
      systemProgram: anchor.web3.SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    })
    .instruction();

  return ix;
};

export const updateProjectRoundVerified = () => {};
