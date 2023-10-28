'use server';

import { env } from '@/env.mjs';

export const checkSuperteam = async (wallet: string): Promise<number> => {
  try {
    const res = await fetch(env.NEXT_PUBLIC_RPC_MAINNET_URL, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: wallet,
          page: 1,
        },
      }),
    });

    const results = await res.json();
    const filteredNFT: any[] = results.result.items.filter((e: any) => {
      if (
        e.grouping[0]?.group_key === 'collection' &&
        [
          'UeXfwweGMBV8JkTQ7pFF6shPR9EiKEg8VnTNF4qKjhh', // SuperteamDE
          'E4ToMjm8YtRyfPUhZ7hxRMxe4J8FnSr9CcprytZBYFua', // SuperteamIN
        ].find(
          (add) =>
            add.toLowerCase() === e.grouping[0]?.group_value.toLowerCase(),
        )
      ) {
        return e;
      }
    });
    console.log(filteredNFT, '-------------------');
    return filteredNFT.length || 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
