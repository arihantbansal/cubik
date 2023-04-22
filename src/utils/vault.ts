import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as anchor from '@coral-xyz/anchor';
import Squads from '@sqds/sdk';
export const createValut = async (
  wallet: NodeWallet,
  name: string,
  description: string,
  image: string
): Promise<anchor.web3.TransactionInstruction> => {
  const squads = Squads.devnet(wallet);
  const multisigIx = await squads.buildCreateMultisig(
    2,
    wallet.publicKey,
    [wallet.publicKey, new anchor.web3.PublicKey('')],
    name,
    description,
    image
  );

  return multisigIx;
};
export const payoutVault = async (
  wallet: NodeWallet,
  vault: anchor.web3.PublicKey,
  txPDA: anchor.web3.PublicKey,
  ix: anchor.web3.TransactionInstruction
): Promise<anchor.web3.TransactionInstruction> => {
  const squads = Squads.devnet(wallet);

  const index = await squads.getNextTransactionIndex(vault);
  const payoutIx = await squads.buildAddInstruction(vault, txPDA, ix, index);

  return payoutIx;
};

export const getAllTx = async (
  wallet: NodeWallet,
  vault: anchor.web3.PublicKey
) => {
  const squads = Squads.devnet(wallet);

  const txs = await squads.getTransactions([]);

  return txs;
};
