import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, collection } = req.body;
  try {
    const results = await axios.post(env.NEXT_PUBLIC_RPC_MAINNET_URL, {
      jsonrpc: "2.0",
      id: "my-id",
      method: "getAssetsByOwner",
      params: {
        ownerAddress: address,
        page: 1,
      },
    });
    const filteredNFT: any[] = results.data.result.items.filter((e: any) => {
      if (
        e.grouping[0]?.group_key === "collection" &&
        e.grouping[0]?.group_value === collection
      ) {
        return e;
      }
    });

    return res.status(200).send({
      data: filteredNFT.length || 0,
      status: 200,
      error: null,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send({
      data: null,
      status: 500,
      error: "Something went wrong.",
    });
  }
}
