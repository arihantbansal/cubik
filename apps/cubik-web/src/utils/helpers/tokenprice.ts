import { PriceReturnType } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import { TokenPriceResponse } from "@/types/token";

export const tokenPrice = async (token: string) => {
  try {
    const response = await axios.get<TokenPriceResponse>(
      `https://price.jup.ag/v4/price?ids=SOL`
    );
    const price = response.data.data["SOL"]?.price;
    return price;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchPrice = async (
  type: ("solana" | "bonk")[]
): Promise<PriceReturnType[]> => {
  try {
    const { data } = await axios.post("/api/info/price", {
      tokens: type || [],
    });

    return data.prices;
  } catch (error) {
    return [];
  }
};

export const useCurrentTokenPrice = (type: ("solana" | "bonk")[]) => {
  return useQuery<PriceReturnType[]>(["price", type], () => fetchPrice(type), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 2 * 60 * 1000,
  });
};
