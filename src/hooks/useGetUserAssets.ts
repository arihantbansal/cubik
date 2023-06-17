import { useQuery } from 'react-query';
import axios from 'axios';

const useGetUserAssets = (
  ownerAddress: string,
  page: number = 1,
  limit: number = 1000
) => {
  return useQuery(['assetsByOwner', ownerAddress, page, limit], async () => {
    const response = await fetch(
      `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: '1',
          method: 'getAssetsByOwner',
          params: {
            ownerAddress,
            page,
            limit,
          },
        }),
      }
    );
    const r = await response.json();
    console.log('response - ', r);
    const myNfts = await r.result.items;
    console.log(myNfts);
    return myNfts;
  });
};

export default useGetUserAssets;
