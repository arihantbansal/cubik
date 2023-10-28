import type { PriceReturnType, TokenPriceResponse } from '@/types/token';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const tokenPrice = async () => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=SOL`,
    );
    const price = response.data.data.SOL?.price;
    return price;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPrice = async (
  type: ('solana' | 'bonk')[],
): Promise<PriceReturnType[]> => {
  try {
    const res = await axios.post('/api/info/price', {
      tokens: type || [],
    });

    return (res.data.prices as unknown as PriceReturnType[]) || [];
  } catch (error) {
    return [];
  }
};

export const useCurrentTokenPrice = (type: ('solana' | 'bonk')[]) => {
  return useQuery<PriceReturnType[]>(['price', type], () => fetchPrice(type), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 2 * 60 * 1000,
  });
};
