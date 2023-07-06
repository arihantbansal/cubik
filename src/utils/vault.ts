import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import Squads, { getTxPDA } from '@sqds/sdk';
import { env } from '~/env.mjs';

const RPC_URL =
  env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet-beta'
    ? env.NEXT_PUBLIC_RPC_MAINNET_URL
    : env.NEXT_PUBLIC_RPC_DEVNET_URL;


const getSquads = async (wallet: NodeWallet): Promise<Squads> => {
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
  image: string
) => {
  const squads = await getSquads(wallet);
  const createKey = anchor.web3.Keypair.generate();
  const ix = await squads.buildCreateMultisig(
    2,
    createKey.publicKey,
    [wallet.publicKey, new anchor.web3.PublicKey(env.NEXT_PUBLIC_ADMIN_VAULT)],
    `Cubik Vault`,
    `This treasured holds the funds raised on cubik by @${username} for @${name}`,
    image
  );

  return { ix: ix, key: ix.keys[0].pubkey, createKey: createKey.publicKey };
};
export const getVault = async (
  wallet: NodeWallet,
  mutliSigAccount: anchor.web3.PublicKey
): Promise<string> => {
  const squads = await getSquads(wallet);

  const [authority] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode('squad'),
      mutliSigAccount.toBuffer(),
      new anchor.BN(1).toArrayLike(Buffer, 'le', 4),
      anchor.utils.bytes.utf8.encode('authority'),
    ],
    squads.multisigProgramId
  );

  return authority.toBase58();
};
export const getAllTx = async (wallet: NodeWallet, createKey: string) => {
  try {
    const squads = await getSquads(wallet);

    const [multiSigAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('squad'),
        new anchor.web3.PublicKey(createKey).toBuffer(),
        anchor.utils.bytes.utf8.encode('multisig'),
      ],
      squads.multisigProgramId
    );

    const nextIndex = await squads.getNextTransactionIndex(multiSigAccount);
    const txsPDA: PublicKey[] = [];
    for (let index = 0; index < nextIndex - 1; index++) {
      const [txPDA] = await getTxPDA(
        multiSigAccount,
        new anchor.BN(index + 1, 10),
        squads.multisigProgramId
      );
      txsPDA.push(txPDA);
    }
    const txsAccount = await squads.getTransactions(txsPDA);

    console.log(txsAccount);
    return txsAccount;
  } catch (error) {
    console.log(error);
    return [];
  }
};
