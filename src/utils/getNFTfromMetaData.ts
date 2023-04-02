import { useQuery } from 'react-query';
import { QueryFunction } from 'react-query/types/core/types';

export function useGetNftFromMetaData(NFTMetadataURIs: string[]) {
  return useQuery(['nftMetadata', NFTMetadataURIs], getNftFromMetaData, {
    enabled: !!NFTMetadataURIs.length,
  });
}

const getNftFromMetaData: QueryFunction = async ({ queryKey }) => {
  const [, NFTMetadataURIs] = queryKey as [string, string[]];
  console.log('1 - NFTMetadataURIs ', NFTMetadataURIs);
  try {
    const promises = NFTMetadataURIs.map(async (item: string) => fetch(item));
    const nftsData = await Promise.all(promises);
    const nftsDataJson = await Promise.all(
      nftsData.map(async (item) => item.json())
    );
    console.log('2 - nfts json data', nftsDataJson);
    return nftsDataJson;
  } catch (e) {
    throw new Error();
  }
};
