export {};

// import * as anchor from '@coral-xyz/anchor';
// import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
// import * as spl from '@solana/spl-token';
// import { getAssociatedTokenAddressSync } from '@solana/spl-token';
// import { env } from '~/env.mjs';

// import type { CubikHackathon } from './idl';
// import { IDL } from './idl';

// const PROGRAM_ID = 'GCpmUwiZm2rX2X6VWtB1y7w2MMLvR8M2UnNTioYMdTyt';

// const RPC_URL =
//   env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
//     ? env.NEXT_PUBLIC_RPC_MAINNET_URL
//     : env.NEXT_PUBLIC_RPC_DEVNET_URL;

// export const connection = new anchor.web3.Connection(RPC_URL, 'confirmed');
// const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
//   'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
// );
// export const getProvider = (wallet: anchor.Wallet) => {
//   const opts = {
//     preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
//   };

//   const provider = new anchor.AnchorProvider(
//     connection,
//     wallet,
//     opts.preflightCommitment
//   );
//   return provider;
// };

// export const anchorProgram = (wallet: anchor.Wallet) => {
//   const provider = getProvider(wallet);
//   const idl = IDL as anchor.Idl;
//   const program = new anchor.Program(
//     idl,
//     PROGRAM_ID,
//     provider
//   ) as unknown as anchor.Program<CubikHackathon>;

//   return program;
// };

// export const HackathonInit = async (wallet: anchor.Wallet, counter: number) => {
//   const program = anchorProgram(wallet);
//   const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
//     [
//       Buffer.from('hackathon'),
//       wallet.publicKey.toBuffer(),
//       new anchor.BN(counter).toArrayLike(Buffer, 'le', 2),
//     ],
//     program.programId
//   );
//   const ix = await program.methods
//     .hackathonInit(counter)
//     .accounts({
//       authority: wallet.publicKey,
//       hackathonAccount: hackathon_account,
//       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//       systemProgram: anchor.web3.SystemProgram.programId,
//     })
//     .instruction();

//   return ix;
// };

// export const CrateParticipant = async (
//   wallet: anchor.Wallet,
//   counter: number,
//   name: string,
//   symbol: string,
//   uri: string,
//   nftMint: anchor.web3.Keypair,
//   hackathon_authority: String
// ) => {
//   const program = anchorProgram(wallet);
//   const [masterKey] = await anchor.web3.PublicKey.findProgramAddress(
//     [
//       Buffer.from('metadata'),
//       TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//       nftMint.publicKey.toBuffer(),
//       Buffer.from('edition'),
//     ],
//     TOKEN_METADATA_PROGRAM_ID
//   );

//   const [metadatakey] = await anchor.web3.PublicKey.findProgramAddress(
//     [
//       Buffer.from('metadata'),
//       TOKEN_METADATA_PROGRAM_ID.toBuffer(),
//       nftMint.publicKey.toBuffer(),
//     ],
//     TOKEN_METADATA_PROGRAM_ID
//   );
//   const [hackathon_account] = anchor.web3.PublicKey.findProgramAddressSync(
//     [
//       Buffer.from('hackathon'),
//       wallet.publicKey.toBuffer(),
//       new anchor.BN(counter).toArrayLike(Buffer, 'le'),
//     ],
//     program.programId
//   );
//   console.log('hackathon_account', hackathon_account.toBase58());
//   const [participant_account] = anchor.web3.PublicKey.findProgramAddressSync(
//     [
//       Buffer.from('participant'),
//       new anchor.BN(counter).toArray('le'),
//       wallet.publicKey.toBuffer(),
//     ],
//     program.programId
//   );
//   console.log('participant_account', participant_account.toBase58());
//   const nft_ata = getAssociatedTokenAddressSync(
//     nftMint.publicKey,
//     wallet.publicKey
//   );
//   const ix = await program.methods
//     .createParticipantNft(
//       name,
//       symbol,
//       uri,
//       counter,
//       new anchor.web3.PublicKey(hackathon_authority)
//     )
//     .accounts({
//       associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
//       authority: wallet.publicKey,
//       tokenProgram: spl.TOKEN_PROGRAM_ID,
//       participantAccount: participant_account,
//       powNftAta: nft_ata,
//       metadata: metadatakey,
//       masterEdition: masterKey,
//       mint: nftMint.publicKey,
//       mplProgram: TOKEN_METADATA_PROGRAM_ID,
//       rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//       systemProgram: anchor.web3.SystemProgram.programId,
//     })
//     .instruction();

//   return ix;
// };
