import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as anchor from '@coral-xyz/anchor';
import Squads from '@sqds/sdk';

export const createVault = async (
  wallet: NodeWallet,
  name: string,
  description: string,
  image: string
) => {
  const squads = Squads.devnet(wallet);
  const ix = await squads.buildCreateMultisig(
    2,
    anchor.web3.Keypair.generate().publicKey,
    [
      wallet.publicKey,
      new anchor.web3.PublicKey('AhFfjBPCoNRDExEDFYuNK2NXCWNa1gi2VUbdA7cF19CD'),
    ],
    `Cubik<>${name}`,
    description,
    image
  );

  return { ix: ix, key: ix.keys[0].pubkey };
};
export const getVault = async (
  wallet: NodeWallet,
  mutliSigAccount: anchor.web3.PublicKey
): Promise<string> => {
  const squads = Squads.devnet(wallet);

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
export const getAllTx = async (
  wallet: NodeWallet,
  vault: anchor.web3.PublicKey
) => {
  const squads = Squads.devnet(wallet);

  const txs = await squads.getTransactions([]);

  return txs;
};
