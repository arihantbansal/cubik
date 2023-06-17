import { Skeleton } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface BalanceData {
  tokens: Array<{
    tokenAccount: string;
    mint: string;
    amount: number;
    decimals: number;
  }>;
  nativeBalance: number;
}

const getBalances = async (address: string): Promise<BalanceData> => {
  if (!address) throw new Error('No address provided.');
  const { data } = await axios.get(
    // todo: change api-devnet to api when using mainet
    `https://api-devnet.helius.xyz/v0/addresses/${address}/balances?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
  );
  return data;
};

export const fetchPrice = async (
  type: 'solana' | 'usd' | 'bonk' | string
): Promise<number | null> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${type}&vs_currencies=usd`
    );

    return data[type].usd;
  } catch (error) {
    return null;
  }
};

const useGetTotalWalletBalanceInUSDC = (walletAddress: string) => {
  const [balance, setBalance] = useState<number | null>(null);
  const { isLoading, data, isError, error } = useQuery<BalanceData>(
    ['balances', walletAddress], // make the query key unique for each wallet address
    () => getBalances(walletAddress),
    {
      // // Cache data for 5 minutes (in milliseconds)
      staleTime: 3 * 60 * 1000,
      // // Don't automatically refetch data in the background
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const calculateBalance = async () => {
        let totalBalance = 0;

        // Calculate balance for tokens
        for (const item of data.tokens) {
          const price = await fetchPrice(item.mint);
          totalBalance += (price ?? 0) * item.amount;
        }

        // Add the balance in solana
        const solPrice = await fetchPrice('solana');
        totalBalance += ((solPrice ?? 0) * data.nativeBalance) / 10 ** 9; // Convert lamports to SOL

        setBalance(totalBalance);
      };

      calculateBalance();
    }
  }, [isLoading, data, isError]);

  if (isLoading) return { balance: 0 };
  if (isError) return { balance: 0 };

  return { balance: balance?.toFixed(2) ?? 0.0 };
};

export default useGetTotalWalletBalanceInUSDC;
