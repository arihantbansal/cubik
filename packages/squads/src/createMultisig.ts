import { instructions, getMultisigPda, types } from "@sqds/multisig";
import { web3 } from "@coral-xyz/anchor";

export const createMultisig = async (
  creator: web3.PublicKey,
  threshold: number,
  members: types.Member[]
) => {
  const createKey = web3.Keypair.generate();

  const multisigPda = getMultisigPda({
    createKey: createKey.publicKey,
  })[0];
  const ix = instructions.multisigCreate({
    members: members,
    threshold: threshold,
    multisigPda,
    createKey: createKey.publicKey,
    creator: creator,
    timeLock: 0,
    configAuthority: null,
  });

  return ix;
};
