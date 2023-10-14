import { PublicKey } from "@metaplex-foundation/js";
import { PublicKeyInitData } from "@solana/web3.js";

export function createSolanaPayRequest(
  amount: number,
  splToken: PublicKeyInitData,
  walletAddress: PublicKeyInitData
) {
  // Validate inputs
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid amount");
  }

  if (!PublicKey.isOnCurve(new PublicKey(splToken).toBuffer())) {
    throw new Error("Invalid SPL Token Address");
  }

  if (!PublicKey.isOnCurve(new PublicKey(walletAddress).toBuffer())) {
    throw new Error("Invalid Wallet Address");
  }

  // Create the payment URL
  const paymentUrl = `https://solana.pay/payment?amount=${amount}&splToken=${splToken}&destination=${walletAddress}`;

  return paymentUrl;
}
