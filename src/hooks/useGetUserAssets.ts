import { useQuery } from 'react-query';

const useGetUserAssets = (ownerAddress: string) => {
  return useQuery(['assetsByOwner', ownerAddress], async () => {
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
            page: 1,
            limit: 1000,
          },
        }),
      }
    );
    const r = await response.json();
    const myNftsData = await r.result.items;
    const myNfts = myNftsData.map((nft: any) => {
      const image = nft.content.files[0].uri;
      return {
        id: nft.id,
        name: nft.name,
        image,
      };
    });
    return myNfts;
  });
};

export default useGetUserAssets;
