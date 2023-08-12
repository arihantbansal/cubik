import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { getSdk } from "./sdk";
import { web3 } from "@coral-xyz/anchor";

export const createContributorIx = (
  wallet: NodeWallet,
  amount: number,
  split: number,
  roundId: string,
  projectCount: number,
  tokenMint: web3.PublicKey,
  ataAdmin: web3.PublicKey,
  ataSender: web3.PublicKey,
  ataReciver: web3.PublicKey,
  projectOwnerAddress: string
): Promise<web3.TransactionInstruction> => {
  const sdk = getSdk(wallet);
  const createKey = web3.Keypair.generate();
  const [contributorAccount] = sdk.contribution.getContributionV2PDA(
    wallet.publicKey,
    createKey.publicKey
  );
  const [adminAccount] = sdk.admin.getAdminPDA();
  const [projectAccount] = sdk.project.getProjectPDA(
    new web3.PublicKey(projectOwnerAddress),
    projectCount
  );
  return sdk.contribution.create(
    wallet.publicKey,
    amount,
    split,
    roundId,
    projectCount,
    adminAccount,
    projectAccount,
    contributorAccount,
    tokenMint,
    ataAdmin,
    ataSender,
    ataReciver,
    projectOwnerAddress,
    createKey.publicKey
  );
};
