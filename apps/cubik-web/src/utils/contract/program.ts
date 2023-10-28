import { env } from '@/env.mjs';
import * as anchor from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as spl from '@solana/spl-token';

import type { CubikContractV2 } from './idl';
import { IDL } from './idl';

const PROGRAM_ID =
  env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
    ? 'BVo5TquTYMAASZhfX392BcjFUxda6DKzHStNapJE6Wyz'
    : 'GxnJAYzcMhBSyZ2EhiqeB7Mb72SqyTSuf9twp39SZ6Ke';

const RPC_URL =
  env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
    ? env.NEXT_PUBLIC_RPC_MAINNET_URL
    : env.NEXT_PUBLIC_RPC_DEVNET_URL;

export type ProofType =
  | 'LAMPORT'
  | 'SUPERTEAM'
  | 'MONKEYDAO'
  | 'CIVIC'
  | 'SOCIAL'
  | 'GOOGLE'
  | 'DRIPS01';
export const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');

export const getProvider = (wallet: anchor.Wallet) => {
  const opts = {
    preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
  };

  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment,
  );
  return provider;
};

export const anchorProgram = (wallet: anchor.Wallet) => {
  const provider = getProvider(wallet);
  const idl = IDL as anchor.Idl;
  const program = new anchor.Program(
    idl,
    PROGRAM_ID,
    provider,
  ) as unknown as anchor.Program<CubikContractV2>;

  return program;
};

export const createContributionV2 = async (
  wallet: NodeWallet,
  amount: number,
  split: number,
  owner: string,
  roundId: string,
  projectCount: number,
  token: string,
) => {
  try {
    const createKey = anchor.web3.Keypair.generate();
    const program = anchorProgram(wallet);

    const tokenMint = new anchor.web3.PublicKey(token);
    const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('admin')],
      program.programId,
    );

    const [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('project'),
        new anchor.web3.PublicKey(owner).toBuffer(),
        Buffer.from(projectCount.toString()),
      ],
      program.programId,
    );
    const [contributionV2Account] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [
          anchor.utils.bytes.utf8.encode('contribution'),
          wallet.publicKey.toBuffer(),
          createKey.publicKey.toBuffer(),
        ],
        program.programId,
      );

    // ATAs
    const ata_sender = await spl.getAssociatedTokenAddress(
      tokenMint,
      wallet.publicKey,
      false,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    );
    const projectInfo = await program.account.project.fetch(project_account);
    const adminInfo = await program.account.admin.fetch(adminAccount);
    const ata_admin = await spl.getAssociatedTokenAddress(
      tokenMint,
      adminInfo.authority,
      false,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    );
    const ata_reciver = await spl.getAssociatedTokenAddress(
      tokenMint,
      projectInfo.multiSig,
      true,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    );
    const info = await connection.getAccountInfo(ata_reciver);
    const info2 = await connection.getAccountInfo(ata_admin);
    let tokenAccountIx: anchor.web3.TransactionInstruction | null = null;
    let tokenAccountIx2: anchor.web3.TransactionInstruction | null = null;
    if (!info) {
      tokenAccountIx = spl.createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        ata_reciver,
        projectInfo.multiSig,
        tokenMint,
      );
    }
    if (!info2) {
      tokenAccountIx2 = spl.createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        ata_admin,
        adminInfo.authority,
        tokenMint,
      );
    }
    //
    const ix = await program.methods
      .createContributionV2(
        new anchor.BN(amount),
        new anchor.BN(split),
        createKey.publicKey,
        new anchor.web3.PublicKey(owner),
        roundId,
        JSON.stringify(projectCount),
      )
      .accounts({
        adminAccount: adminAccount,
        projectAccount: project_account,
        contributionAccount: contributionV2Account,
        tokenProgram: spl.TOKEN_PROGRAM_ID,
        tokenMint: tokenMint,
        tokenAtaAdmin: ata_admin,
        tokenAtaSender: ata_sender,
        tokenAtaReceiver: ata_reciver,
        authority: wallet.publicKey,
      })
      .instruction();

    return [ix, tokenAccountIx, tokenAccountIx2];
  } catch (error) {
    console.log(error);
    return [null, null, null];
  }
};
