import * as anchor from "@coral-xyz/anchor";
import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import * as spl from "@solana/spl-token";
import { env } from "~/env.mjs";

import type { CubikContractV2 } from "./program";
import { IDL } from "./program";

const PROGRAM_ID =
  env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta"
    ? "BVo5TquTYMAASZhfX392BcjFUxda6DKzHStNapJE6Wyz"
    : "GxnJAYzcMhBSyZ2EhiqeB7Mb72SqyTSuf9twp39SZ6Ke";

const RPC_URL =
  env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta"
    ? env.NEXT_PUBLIC_RPC_MAINNET_URL
    : env.NEXT_PUBLIC_RPC_DEVNET_URL;

export type ProofType =
  | "LAMPORT"
  | "SUPERTEAM"
  | "MONKEYDAO"
  | "CIVIC"
  | "SOCIAL"
  | "GOOGLE"
  | "DRIPS01";
export const connection = new anchor.web3.Connection(RPC_URL, "confirmed");

export const getProvider = (wallet: anchor.Wallet) => {
  const opts = {
    preflightCommitment: "processed" as anchor.web3.ConfirmOptions,
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
  const idl = IDL as anchor.Idl;
  const program = new anchor.Program(
    idl,
    PROGRAM_ID,
    provider
  ) as unknown as anchor.Program<CubikContractV2>;

  return program;
};

export const createAdmin = async (wallet: NodeWallet) => {
  const program = anchorProgram(wallet);

  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("admin")],
    program.programId
  );
  const ix = await program.methods
    .createAdmin()
    .accounts({
      adminAccount: adminAccount,
      authority: wallet.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const createUser = async (wallet: NodeWallet, username: string) => {
  const program = anchorProgram(wallet);
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
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
    [Buffer.from("admin")],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
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
    [Buffer.from("admin")],
    program.programId
  );

  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("user"),
      new anchor.web3.PublicKey(owner).toBuffer(),
    ],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
      new anchor.web3.PublicKey(owner).toBuffer(),
      Buffer.from(JSON.stringify(counter)),
    ],
    program.programId
  );
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
    [Buffer.from("admin")],
    program.programId
  );
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("user"),
      new anchor.web3.PublicKey(owner).toBuffer(),
    ],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
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
    [Buffer.from("round"), Buffer.from(id)],
    program.programId
  );
  const ix = await program.methods
    .createRound(
      id,
      new anchor.BN(matchingPool),
      new anchor.BN(projectSize),
      new anchor.BN(2)
    )
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
    [Buffer.from("round"), Buffer.from(roundId)],
    program.programId
  );

  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
      wallet.publicKey.toBuffer(),
      Buffer.from(projectCount.toString()),
    ],
    program.programId
  );

  let [roundVerfication_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("roundjoin"),
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
  roundName: string,
  counter: number,
  projectOwnerAddress: string
) => {
  const program = anchorProgram(wallet);
  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("admin")],
    program.programId
  );
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("round"), Buffer.from(roundName)],
    program.programId
  );

  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
      new anchor.web3.PublicKey(projectOwnerAddress).toBuffer(),
      Buffer.from(counter.toString()),
    ],
    program.programId
  );
  let [roundVerfication_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("roundjoin"),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  const ix = await program.methods
    .updateApproveRound(
      roundName,
      counter.toString(),
      new anchor.web3.PublicKey(projectOwnerAddress)
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
    [Buffer.from("admin")],
    program.programId
  );

  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("round"), Buffer.from(roundId)],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
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
      Buffer.from("contribution"),
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
    tokenAccountIx = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ata_reciver,
      projectInfo.multiSig,
      tokenMint
    );
    tokenAccountIx1 = spl.createAssociatedTokenAccountInstruction(
      wallet.publicKey,
      ata_admin,
      adminInfo.authority,
      tokenMint
    );
  }
  const accountInfo = await connection.getAccountInfo(contriAccount);

  if (accountInfo !== null && accountInfo.data.length > 0) {
    const ix = await program.methods
      .updateContributionSpl(
        roundId,
        projectUserCount.toString(),
        new anchor.web3.PublicKey(projectOwner),
        new anchor.BN(usd),
        new anchor.BN(total),
        new anchor.BN(split)
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
  }
  const ix = await program.methods
    .createContributionSpl(
      roundId,
      projectUserCount.toString(),
      new anchor.web3.PublicKey(projectOwner),
      new anchor.BN(usd),
      new anchor.BN(total),
      new anchor.BN(split)
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
): Promise<anchor.web3.TransactionInstruction> => {
  const program = anchorProgram(wallet);
  const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("admin")],
    program.programId
  );
  const [round_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("round"), Buffer.from(roundId)],
    program.programId
  );
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
      new anchor.web3.PublicKey(projectOwner).toBuffer(),
      Buffer.from(projectUserCount.toString()),
    ],
    program.programId
  );

  const [contriAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("contribution"),
      wallet.publicKey.toBuffer(),
      round_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );

  //@ts-ignore
  const projectAccount = await program.account.project.fetch(project_account);

  //@ts-ignore
  const adminAcc = await program.account.admin.fetch(adminAccount);

  const accountInfo = await connection.getAccountInfo(contriAccount);

  if (accountInfo !== null && accountInfo.data.length > 0) {
    const ix = await program.methods
      .updateContributionSol(
        roundId,
        projectUserCount.toString(),
        projectAccount.owner,
        new anchor.BN(usd),
        new anchor.BN(total * anchor.web3.LAMPORTS_PER_SOL),
        new anchor.BN(split)
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
  }
  const ix = await program.methods
    .createContributionSol(
      roundId,
      projectUserCount.toString(),
      projectAccount.owner,
      new anchor.BN(usd),
      new anchor.BN(total * anchor.web3.LAMPORTS_PER_SOL),
      new anchor.BN(split)
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

export const admin_proof = async (wallet: NodeWallet) => {
  const program = anchorProgram(wallet);

  const [adminProofAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("proof")],
    program.programId
  );
  const ix = await program.methods
    .adminProof()
    .accounts({
      authority: wallet.publicKey,
      adminProofAccount: adminProofAccount,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const proofAdd = async (wallet: NodeWallet, proofType: ProofType) => {
  const program = anchorProgram(wallet);
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [admin_proof_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("proof")],
    program.programId
  );

  const ix = await program.methods
    .addProof(proofType)
    .accounts({
      authority: wallet.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
      userAccount: user_account,
      adminProofAccount: admin_proof_account,
      admin: wallet.publicKey,
    })
    .instruction();

  return ix;
};
export const proofRemove = async (wallet: NodeWallet, proofType: ProofType) => {
  const program = anchorProgram(wallet);
  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  let [admin_proof_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("proof")],
    program.programId
  );

  const ix = await program.methods
    .removeProof(proofType)
    .accounts({
      authority: wallet.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
      userAccount: user_account,
      adminProofAccount: admin_proof_account,
    })
    .instruction();

  return ix;
};

export const projectJoinHackathon = async (
  wallet: NodeWallet,
  projectCount: number,
  counter: number,
  hackathonAdmin: string
) => {
  const program = anchorProgram(wallet);
  let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("project"),
      wallet.publicKey.toBuffer(),
      Buffer.from(projectCount.toString()),
    ],
    program.programId
  );
  const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("hackathon"),
      new anchor.web3.PublicKey(hackathonAdmin).toBuffer(),
      new anchor.BN(counter).toArrayLike(Buffer, "le", 2),
    ],
    new anchor.web3.PublicKey("DQDrRfiaqSzbSJCL9BMzPd6TfgLmDHxCEQDCrjoK9jCF")
  );
  const [hackathonJoinAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("hackathonjoin"),
      hackathon_account.toBuffer(),
      project_account.toBuffer(),
    ],
    program.programId
  );
  const ix = await program.methods
    .projectJoinHackathon(hackathon_account, project_account)
    .accounts({
      hackathonJoinAccount: hackathonJoinAccount,
    })
    .instruction();

  return ix;
};

export const createContributionV2 = async (
  wallet: NodeWallet,
  amount: number,
  split: number,
  owner: string,
  roundId: string,
  projectCount: number,
  token: string
) => {
  try {
    const createKey = anchor.web3.Keypair.generate();
    const program = anchorProgram(wallet);

    const tokenMint = new anchor.web3.PublicKey(token);
    const [adminAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("admin")],
      program.programId
    );

    let [project_account] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("project"),
        new anchor.web3.PublicKey(owner).toBuffer(),
        Buffer.from(projectCount.toString()),
      ],
      program.programId
    );
    let [contributionV2Account] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("contribution"),
        wallet.publicKey.toBuffer(),
        createKey.publicKey.toBuffer(),
      ],
      program.programId
    );

    // ATAs
    const ata_sender = await spl.getAssociatedTokenAddress(
      tokenMint,
      wallet.publicKey,
      false,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const projectInfo = await program.account.project.fetch(project_account);
    //@ts-ignore
    const adminInfo = await program.account.admin.fetch(adminAccount);
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
      true,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID
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
        tokenMint
      );
    }
    if (!info2) {
      tokenAccountIx2 = spl.createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        ata_admin,
        adminInfo.authority,
        tokenMint
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
        JSON.stringify(projectCount)
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
