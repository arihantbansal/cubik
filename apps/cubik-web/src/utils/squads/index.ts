import { env } from '@/env.mjs';
import * as anchor from '@coral-xyz/anchor';
import type NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import type { PublicKey } from '@solana/web3.js';
import type { InstructionAccount, TransactionAccount } from '@sqds/sdk';
import Squads, { getIxPDA, getTxPDA } from '@sqds/sdk';

const RPC_URL =
  env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
    ? env.NEXT_PUBLIC_RPC_MAINNET_URL
    : env.NEXT_PUBLIC_RPC_DEVNET_URL;

const getSquads = (wallet: NodeWallet): Squads => {
  if (env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta') {
    const squads = Squads.endpoint(RPC_URL, wallet);

    return squads;
  }
  const squads = Squads.devnet(wallet);

  return squads;
};

export const createVault = async (
  username: string,
  wallet: NodeWallet,
  name: string,
  image: string,
) => {
  const squads = getSquads(wallet);
  const createKey = anchor.web3.Keypair.generate();
  const ix = await squads.buildCreateMultisig(
    2,
    createKey.publicKey,
    [wallet.publicKey, new anchor.web3.PublicKey(env.NEXT_PUBLIC_ADMIN_VAULT)],
    `Cubik Vault`,
    `This treasured holds the funds raised on cubik by @${username} for @${name}`,
    image,
  );

  return { ix: ix, key: ix.keys[0]!.pubkey, createKey: createKey.publicKey };
};
export const getVault = (
  wallet: NodeWallet,
  mutliSigAccount: anchor.web3.PublicKey,
): string => {
  const squads = getSquads(wallet);

  const [authority] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('squad'),
      mutliSigAccount.toBuffer(),
      new anchor.BN(1).toArrayLike(Buffer, 'le', 4),
      anchor.utils.bytes.utf8.encode('authority'),
    ],
    squads.multisigProgramId,
  );

  return authority.toBase58();
};

export const getMsAddress = (wallet: NodeWallet, createKey: string) => {
  const squads = getSquads(wallet);

  const [multiSigAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('squad'),
      new anchor.web3.PublicKey(createKey).toBuffer(),
      anchor.utils.bytes.utf8.encode('multisig'),
    ],
    squads.multisigProgramId,
  );

  return multiSigAccount.toBase58();
};
export interface VaultTx {
  tx: TransactionAccount;
  ix: InstructionAccount;
}
export const getAllTx = async (wallet: NodeWallet, createKey: string) => {
  try {
    if (!createKey) return [];
    const squads = getSquads(wallet);

    const [multiSigAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('squad'),
        new anchor.web3.PublicKey(createKey).toBuffer(),
        anchor.utils.bytes.utf8.encode('multisig'),
      ],
      squads.multisigProgramId,
    );

    const nextIndex = await squads.getNextTransactionIndex(multiSigAccount);
    const txsPDA: PublicKey[] = [];
    for (let index = 0; index < nextIndex - 1; index++) {
      const [txPDA] = getTxPDA(
        multiSigAccount,
        new anchor.BN(index + 1, 10),
        squads.multisigProgramId,
      );
      txsPDA.push(txPDA);
    }
    const ixAccount = await getAllIxAcc(wallet, multiSigAccount, txsPDA);
    const txsAccount = await squads.getTransactions(txsPDA);
    const final: VaultTx[] = [];
    txsAccount.forEach((tx, index) => {
      if (!ixAccount) return;
      final.push({
        tx: tx!,
        ix: ixAccount[index]!,
      });
    });
    final.sort((a, b) => {
      return b.tx.transactionIndex - a.tx.transactionIndex;
    });
    return final;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllIxAcc = async (
  wallet: NodeWallet,
  multiSigAccount: anchor.web3.PublicKey,
  txPDA: anchor.web3.PublicKey[],
) => {
  try {
    const squads = getSquads(wallet);

    const nextIndex = await squads.getNextTransactionIndex(multiSigAccount);
    const IxsPDA: PublicKey[] = [];
    for (let index = 0; index < nextIndex - 1; index++) {
      const [pda] = getIxPDA(
        txPDA[index]!,
        new anchor.BN(1),
        squads.multisigProgramId,
      );
      IxsPDA.push(pda);
    }
    const ix = await squads.getInstructions(IxsPDA);
    return ix;
  } catch (error) {
    return null;
  }
};

export const approveTxVault = async (
  wallet: NodeWallet,
  multiSig: anchor.web3.PublicKey,
  index: number,
) => {
  try {
    const squads = getSquads(wallet);
    const [txPDA] = getTxPDA(
      multiSig,
      new anchor.BN(index),
      squads.multisigProgramId,
    );
    const tx = await squads.approveTransaction(txPDA);

    return tx;
  } catch (error) {
    console.log(error);

    return null;
  }
};
export const exceuteTxVault = async (
  wallet: NodeWallet,
  txPDA: anchor.web3.PublicKey,
) => {
  try {
    const squads = getSquads(wallet);

    const tx = await squads.executeTransaction(txPDA, wallet.publicKey);

    return tx;
  } catch (error) {
    console.log(error);

    return null;
  }
};
