import { useQuery } from "react-query";

interface Nft {
  id: string;
  name: string;
  content: {
    files: Array<{
      uri: string;
    }>;
  };
}

const useGetUserAssets = (ownerAddress: string) => {
  return useQuery(["assetsByOwner", ownerAddress], async () => {
    if (!ownerAddress) {
      // Handle invalid ownerAddress
      throw new Error("Invalid owner address");
    }

    const apiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY;
    if (!apiKey) {
      // Handle missing API Key
      throw new Error("Missing API Key");
    }

    const response = await fetch(`https://rpc.helius.xyz/?api-key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "1",
        method: "getAssetsByOwner",
        params: {
          ownerAddress,
          page: 1,
          limit: 1000,
        },
      }),
    });

    if (!response.ok) {
      // Handle API response error
      throw new Error("Failed to fetch data");
    }

    const r = await response.json();

    if (!r.result || !Array.isArray(r.result.items)) {
      // Handle invalid API response
      throw new Error("Invalid API response");
    }

    const myNfts = r.result.items.map((nft: Nft) => {
      const files = nft.content.files;
      const image =
        files && files.length > 0 ? files[0].uri : "default-image-url";

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
