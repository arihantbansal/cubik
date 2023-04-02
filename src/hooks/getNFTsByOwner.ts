import { useQuery } from 'react-query';
import { PublicKey } from '@solana/web3.js';
import { metaplexGetByOwner, NFTData } from '~/utils/metaplexGetByOwner';

export function useNftDataByOwner(publicKey: PublicKey | null) {
  return useQuery(
    ['nftDataByOwner', publicKey],
    () => getNftDataByOwner(publicKey),
    {
      enabled: !!publicKey,
    }
  );
}

async function getNftDataByOwner(
  publicKey: PublicKey | null
): Promise<NFTData[]> {
  const nftUris = await metaplexGetByOwner(publicKey);

  const promises = nftUris.map(async (item: string) => fetch(item));
  const nftsData = await Promise.all(promises);
  const nftsDataJson = await Promise.all(
    nftsData.map(async (item) => item.json())
  );

  return nftsDataJson;
}
