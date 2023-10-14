import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { env } from "~/env.mjs";

interface TokenData {
  tokenAccount: string;
  amount: number;
  decimals: number;
}

async function fetchTokenBalance(
  tokenAddress: string,
  walletAddress: string
): Promise<number> {
  try {
    const { data } = await axios.get<{
      tokens: TokenData[];
      nativeBalance: number;
    }>(
      `https://api.helius.xyz/v0/addresses/${walletAddress}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`
    );
    console.log("data", data);
    if (tokenAddress === "") {
      return data.nativeBalance;
    }
    const token = data.tokens.find(
      (token) => token.tokenAccount === tokenAddress
    );

    if (!token) {
      throw new Error(`Insufficient wallet balance`);
    }

    return token.amount / 10 ** token.decimals;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`There was some error`);
    } else {
      throw error;
    }
  }
}

export const useTokenBalance = (
  tokenAddress: string,
  walletAddress: string
): UseQueryResult<number, Error> => {
  return useQuery(
    ["tokenBalance", tokenAddress, walletAddress],
    () => fetchTokenBalance(tokenAddress, walletAddress),
    {
      staleTime: 1000 * 60 * 5, // data will become stale after 5 minutes
      cacheTime: 1000 * 60 * 30, // unused data will be removed from the cache after 30 minutes
    }
  );
};
