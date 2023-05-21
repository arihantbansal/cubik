import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
import { env } from '~/env.mjs';

export type NFTData = {
  image: string;
};

const connection = new Connection(env.NEXT_PUBLIC_RPC_URL as string);
const metaplex = Metaplex.make(connection);

export const metaplexGetByOwner = (
  publicKey: PublicKey | null
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!publicKey) {
      reject([]);
      return;
    }

    metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey })
      .then((metaplexResponse) => {
        const promises = metaplexResponse.map(
          (nftMetadata: { uri: any }) => nftMetadata.uri
        );
        return Promise.all(promises);
      })
      .then((results) => {
        resolve(results);
      })
      .catch(() => {
        reject([]);
      });
  });
};
