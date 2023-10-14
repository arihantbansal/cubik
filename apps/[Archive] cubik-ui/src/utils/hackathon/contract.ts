import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import * as spl from "@solana/spl-token";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { env } from "~/env.mjs";

import type { CubikHackathon } from "./idl";
import { IDL } from "./idl";

export const PROGRAM_ID = "DQDrRfiaqSzbSJCL9BMzPd6TfgLmDHxCEQDCrjoK9jCF";

const RPC_URL =
  env.NEXT_PUBLIC_SOLANA_NETWORK === "mainnet-beta"
    ? env.NEXT_PUBLIC_RPC_MAINNET_URL
    : "https://api.devnet.solana.com" || env.NEXT_PUBLIC_RPC_DEVNET_URL;

export const connection = new anchor.web3.Connection(RPC_URL, "confirmed");
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
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
  ) as unknown as anchor.Program<CubikHackathon>;

  return program;
};

export const HackathonInit = async (wallet: anchor.Wallet, counter: number) => {
  const program = anchorProgram(wallet);
  const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("hackathon"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(counter).toArrayLike(Buffer, "le", 2),
    ],
    program.programId
  );
  const ix = await program.methods
    .hackathonInit(counter)
    .accounts({
      authority: wallet.publicKey,
      hackathonAccount: hackathon_account,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const createParticipant = async (
  wallet: anchor.Wallet,
  counter: number,
  name: string,
  symbol: string,
  uri: string,
  nftMint: anchor.web3.Keypair,
  hackathon_authority: String
) => {
  const program = anchorProgram(wallet);
  const [masterKey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMint.publicKey.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const [metadatakey] = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      nftMint.publicKey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("hackathon"),
      new anchor.web3.PublicKey(hackathon_authority).toBuffer(),
      new anchor.BN(counter).toArrayLike(Buffer, "le", 2),
    ],
    program.programId
  );
  const [participant_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("participant"),
      hackathon_account.toBuffer(),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );
  const nft_ata = getAssociatedTokenAddressSync(
    nftMint.publicKey,
    wallet.publicKey
  );
  const ix = await program.methods
    .createParticipantNft(
      counter,
      new anchor.web3.PublicKey(hackathon_authority),
      name,
      symbol,
      uri
    )
    .accounts({
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      authority: wallet.publicKey,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      participantAccount: participant_account,
      powNftAta: nft_ata,
      metadata: metadatakey,
      masterEdition: masterKey,
      mint: nftMint.publicKey,
      mplProgram: TOKEN_METADATA_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      hackathonAccount: hackathon_account,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .instruction();

  return ix;
};

export const checkParticipant = async (
  wallet: NodeWallet,
  counter: number,
  hackathon_owner: string
) => {
  const program = anchorProgram(wallet);
  try {
    const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("hackathon"),
        new anchor.web3.PublicKey(hackathon_owner).toBuffer(),
        new anchor.BN(counter).toArrayLike(Buffer, "le", 2),
      ],
      program.programId
    );
    const [participant_account] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("participant"),
        hackathon_account.toBuffer(),
        wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
    const fetchInfo = await program.account.participant.fetch(
      participant_account
    );

    return fetchInfo;
  } catch (error) {
    return false;
  }
};
