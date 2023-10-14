import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { connection } from "./program/contract";
export const sendSPL = async (
  mint: string,
  fromPubKey: PublicKey,
  toPubKey: PublicKey,
  amount: number
) => {
  try {
    const token = new PublicKey(mint);
    const fromTokenAccount = await getAssociatedTokenAddress(token, fromPubKey);
    const toTokenAccount = await getAssociatedTokenAddress(
      token,
      toPubKey,
      true
    );
    const toTokenAccountInfo = await connection.getAccountInfo(toTokenAccount);
    const ix: TransactionInstruction[] = [];
    if (!toTokenAccountInfo) {
      ix.push(
        createAssociatedTokenAccountInstruction(
          fromPubKey,
          toTokenAccount,
          toPubKey,
          token
        )
      );
    }

    ix.push(
      createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPubKey,
        Number(amount) * 1000000
      )
    );

    return ix;
  } catch (e) {
    console.log("Error in Send SPL function:", e);
  }
};
