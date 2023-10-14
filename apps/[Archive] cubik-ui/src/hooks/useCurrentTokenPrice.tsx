import { useQuery } from "react-query";
import { PriceReturnType } from "~/types/token";
import { fetchPrice } from "~/utils/getPrice";

const useCurrentTokenPrice = (type: ("solana" | "bonk")[]) => {
  return useQuery<PriceReturnType[]>(["price", type], () => fetchPrice(type), {
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 2 * 60 * 1000,
  });
};

export default useCurrentTokenPrice;
