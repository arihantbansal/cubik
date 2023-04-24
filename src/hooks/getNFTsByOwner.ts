import { useQuery, UseQueryResult } from 'react-query';
import { PublicKey } from '@solana/web3.js';
import { metaplexGetByOwner, NFTData } from '~/utils/metaplexGetByOwner';

// Define PromiseFulfilledResult type
type PromiseFulfilledResult<T> = {
  status: 'fulfilled';
  value: T;
};

export function useNftDataByOwner(
  publicKey: PublicKey | null
): UseQueryResult<NFTData[], Error> {
  return useQuery(
    ['nftDataByOwner', publicKey],
    () => getNftDataByOwner(publicKey),
    {
      cacheTime: 1000 * 60 * 5,
      retry: 0, // Prevent multiple retry attempts
    }
  );
}
async function getNftDataByOwner(
  publicKey: PublicKey | null
): Promise<NFTData[]> {
  if (!publicKey) {
    throw new Error('Public key is required to fetch NFT data.');
  }

  try {
    const nftUris = await metaplexGetByOwner(publicKey);

    const promises = nftUris.map(async (item: string) => {
      const response = await fetch(item);
      return response.json();
    });
    console.log('1 - getting nfts - ', promises);

    const nftsData = await Promise.allSettled(promises);
    console.log('2 - nft data - ', nftsData);
    const fulfilledNftsData = nftsData.filter(
      (result) => result.status === 'fulfilled'
    ) as PromiseFulfilledResult<any>[];
    console.log('3 - fulfilledNftsData', fulfilledNftsData);

    const nftsDataJson = fulfilledNftsData.map((item) => item.value);

    console.log('4 - nft data - ', nftsDataJson);
    return nftsDataJson;
  } catch (error: any) {
    console.log('4 - Error fetching NFT data: ', error.message);
    throw new Error('Error fetching NFT data: ' + error.message);
  }
}
