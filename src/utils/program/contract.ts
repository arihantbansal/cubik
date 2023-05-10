import * as anchor from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as spl from '@solana/spl-token';

import type { ContractType } from './program';
import { Contract } from './program';

const PROGRAM_ID = 'Wgvt4LxST3JmUxZae5z7AYqzd63vo6EXjnW1aaMVX8L';
const RPC_URL =
  'https://solana-devnet.g.alchemy.com/v2/7v3-1dXGVDSGCem5jHrB1Uyv_WlOsoX-';

const BASE_6 = 1000000;
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
    [anchor.utils.bytes.utf8.encode('user'), wallet.publicKey.toBuffer()],
    program.programId
  );
  const ix = await program.methods
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
  counter: number,
  multi_sig: anchor.web3.PublicKey
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode('user'), wallet.publicKey.toBuffer()],
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
    })
    .instruction();

  return ix;
};

export const markProjectVerified = (
  wallet: NodeWallet,
  username: string,
  counter: number,
  owner: string
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  console.log(adminAccount.toBase58());

  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('user'),
      new anchor.web3.PublicKey(owner).toBuffer(),
    ],
    program.programId
  );
  console.log(user_account.toBase58(), '--o');
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      new anchor.web3.PublicKey(owner).toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
  console.log(project_account.toBase58());
  const ix = program.methods
    .updateProjectStatusVerified(
      JSON.stringify(counter),
      new anchor.web3.PublicKey(owner)
    )
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
  counter: number,
  owner: string
) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('user'),
      new anchor.web3.PublicKey(owner).toBuffer(),
    ],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      new anchor.web3.PublicKey(owner).toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
  const ix = program.methods
    .updateProjectStatusFailed(
      JSON.stringify(counter),
      new anchor.web3.PublicKey(owner)
    )
    .accounts({
      adminAccount: adminAccount,
      authority: wallet.publicKey,
      projectAccount: project_account,
      userAccount: user_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const createRoundIx = async (
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

export const ProjectJoinRound = async (
  wallet: NodeWallet,
  roundId: string,
  projectCount: number
) => {
  const program = anchorProgram(wallet);
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('round'), Buffer.from(roundId)],
    program.programId
  );

  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      wallet.publicKey.toBuffer(),
      Buffer.from(projectCount.toString()),
    ],
    program.programId
  );

  let [roundVerfication_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('roundjoin'),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  const ix = await program.methods
    .projectRoundJoin(round_account, project_account)
    .accounts({
      authority: wallet.publicKey,
      roundVerficationAccount: roundVerfication_account,
      systemProgram: anchor.web3.SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    })
    .instruction();

  return ix;
};

export const updateProjectRoundVerified = async (
  wallet: NodeWallet,
  roundId: string,
  counter: number,
  projectOwner: string
) => {
  const program = anchorProgram(wallet);
  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('round'), Buffer.from(roundId)],
    program.programId
  );
  console.log(round_account.toBase58());

  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      new anchor.web3.PublicKey(projectOwner).toBuffer(),
      Buffer.from(counter.toString()),
    ],
    program.programId
  );
  console.log(project_account.toBase58());
  let [roundVerfication_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('roundjoin'),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  console.log(roundVerfication_account.toBase58(), counter.toString());
  const ix = await program.methods
    .updateApproveRound(
      roundId,
      counter.toString(),
      new anchor.web3.PublicKey(projectOwner)
    )
    .accounts({
      roundAccount: round_account,
      adminAccount: adminAccount,
      roundVerficationAccount: roundVerfication_account,
      authority: wallet.publicKey,
      projectAccount: project_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const contributeSPL = async (
  wallet: NodeWallet,
  roundId: string,
  token: string,
  projectOwner: string,
  projectUserCount: number,
  split: number,
  total: number,
  usd: number
): Promise<anchor.web3.Transaction | null> => {
  if (split > 100) return null;
  const program = anchorProgram(wallet);
  const tokenMint = new anchor.web3.PublicKey(token);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );

  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('round'), Buffer.from(roundId)],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      new anchor.web3.PublicKey(projectOwner).toBuffer(),
      Buffer.from(projectUserCount.toString()),
    ],
    program.programId
  );
  //@ts-ignore
  const projectInfo = await program.account.project.fetch(project_account);
  //@ts-ignore
  const adminInfo = await program.account.admin.fetch(adminAccount);

  const ata_sender = await spl.getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID
  );
  const ata_admin = await spl.getAssociatedTokenAddress(
    tokenMint,
    adminInfo.authority,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID
  );
  const ata_reciver = await spl.getAssociatedTokenAddress(
    tokenMint,
    projectInfo.multiSig,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const [contriAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('contribution'),
      wallet.publicKey.toBuffer(),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  const info = await connection.getAccountInfo(ata_reciver);
  let tokenAccountIx;
  let tokenAccountIx1;
  if (!info) {
    console.log('ATA Not found');
    tokenAccountIx = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ata_reciver,
      projectInfo.multiSig,
      tokenMint
    );
    tokenAccountIx1 = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ata_admin,
      adminInfo.authority, // TODO: add admin wallet
      tokenMint
    );
  }
  const ix = await program.methods
    .createContributionSpl(
      roundId,
      projectUserCount.toString(),
      new anchor.web3.PublicKey(projectOwner),
      usd,
      total,
      split
    )
    .accounts({
      adminAccount: adminAccount,
      roundAccount: round_account,
      authority: wallet.publicKey,
      projectAccount: project_account,
      tokenMint: tokenMint,
      contributionAccount: contriAccount,
      tokenAtaSender: ata_sender,
      tokenAtaReceiver: ata_reciver,
      tokenAtaAdmin: ata_admin,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,

      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  const tx = new anchor.web3.Transaction();
  if (tokenAccountIx && tokenAccountIx1) {
    tx.add(tokenAccountIx);
    tx.add(tokenAccountIx1);
  }
  tx.add(ix);

  return tx;
};

export const contributeSOL = async (
  wallet: NodeWallet,
  roundId: string,
  projectOwner: string,
  projectUserCount: number,
  split: number,
  total: number,
  usd: number
) => {
  const program = anchorProgram(wallet);
  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('admin')],
    program.programId
  );
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('round'), Buffer.from(roundId)],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('project'),
      wallet.publicKey.toBuffer(),
      Buffer.from(projectUserCount.toString()),
    ],
    program.programId
  );

  const [contriAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('contribution'),
      wallet.publicKey.toBuffer(),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  console.log(
    roundId,
    projectUserCount.toString(),
    usd,
    total * anchor.web3.LAMPORTS_PER_SOL,
    split
  );

  //@ts-ignore
  const projectAccount = await program.account.project.fetch(project_account);
  console.log(projectAccount.multiSig.toBase58());

  //@ts-ignore
  const adminAcc = await program.account.admin.fetch(adminAccount);
  const ix = await program.methods
    .createContributionSol(
      roundId,
      projectUserCount.toString(),
      projectAccount.owner,
      usd,
      total * anchor.web3.LAMPORTS_PER_SOL,
      split
    )
    .accounts({
      adminAccount: adminAccount,
      authority: wallet.publicKey,
      roundAccount: round_account,
      contributionAccount: contriAccount,
      projectAccount: project_account,
      receiverAccount: projectAccount.multiSig,
      adminAccountInfo: adminAcc.authority,
      systemProgram: anchor.web3.SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
    })
    .instruction();

  return ix;
};
