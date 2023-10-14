import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { USDC_MINT_ADDRESS } from "~/constants";
import { env } from "~/env.mjs";
import { BalanceDataType } from "~/types/token";
import { tokenPrice } from "~/utils/price";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const address = req.body.address as string;
    const { data } = (await axios.get(
      // todo: change api-devnet to api when using mainet
      `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`
    )) satisfies {
      data: BalanceDataType;
    };
    const usdcToken = data.tokens.find((token) => {
      token.mint === USDC_MINT_ADDRESS;
    });
    const solPrice = (await tokenPrice("SOL")) || 0;

    const bal =
      solPrice * data.nativeBalance + usdcToken?.amount!
        ? usdcToken?.amount
        : 0;

    return res.status(200).json({
      balance: bal,
    });
  } catch (e) {
    const error = e as Error;
    console.log(e);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
