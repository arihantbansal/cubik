import { useQuery } from 'react-query';
import { fetchPrice } from '~/utils/getPrice';

const useCurrentTokenPrice = (type: 'solana' | 'usd' | 'bonk') => {
  return useQuery<number | null, Error>(
    ['price', type],
    () => fetchPrice(type),
    {
      retry: false,
    }
  );
};

export default useCurrentTokenPrice;
