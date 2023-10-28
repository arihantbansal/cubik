import { env } from '@/env.mjs';
import axios from 'axios';

export const getBalances = async (address: string) => {
  const res = await axios.get(
    `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`,
  );

  return res.data;
};
