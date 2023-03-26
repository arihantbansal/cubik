import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

export type NFTData = {
  image: string;
};

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL as string);
const metaplex = Metaplex.make(connection);

export const metaplexGetByOwner = async (
  publicKey: PublicKey | null
): Promise<string[]> => {
  try {
    const metaplexResponse = await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey as PublicKey });
    const promises = metaplexResponse.map(
      (nftMetadata: { uri: any }) => nftMetadata.uri
    );
    return await Promise.all(promises);
  } catch (error) {
    return [];
  }
};
