import { HStack, VStack } from '@chakra-ui/layout';
import { Box, Skeleton } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';
import { useQuery } from 'react-query';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { env } from '~/env.mjs';
import useCurrentTokenPrice from '~/hooks/useCurrentTokenPrice';
import { useUserStore } from '~/store/userStore';
import { formatNumberWithK } from '~/utils/formatWithK';
import { BONK, SOL, USDC } from '../../common/tokens/token';

type TokenInfo = {
  tokenAccount: string;
  mint: string;
  amount: number;
  decimals: number;
};

const filterTokens = (tokens: TokenInfo[]) => {
  const tokenAddressesToFilter = [
    'BYgQgaAcgxmAHh7iAYeyV2V1RVTd9edvesrQbSiAYKET', // bonk
    'CG8TA4H9dysAaXS9hTAnhgWXUcJmoHZYK4oKDJqYcFSE', // usdc
    // Add more token addresses here if needed
  ];

  // filter all the tokens which contains tokenAccount of the array
  return tokens.filter((token) => {
    // if the tokenAccount is not in the array, return true
    return tokenAddressesToFilter.includes(token.tokenAccount);
  });
};

const getBalances = async (address: string) => {
  const { data } = await axios.get(
    `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${env.NEXT_PUBLIC_HELIUS_API_KEY}`
  );
  return data;
};

const WalletBalance = ({
  size,
  walletAddress,
}: {
  size?: 'sm' | 'md' | 'lg' | string;
  walletAddress?: string;
}) => {
  const {
    data: solanaCurrentPrice,
    isLoading: solanaTokenPriceLoading,
    error: solanaTokenPriceFetchingError,
  } = useCurrentTokenPrice('solana');
  const { user } = useUserStore();
  const { publicKey } = useWallet();

  const {
    isLoading,
    error: balanceFetchingError,
    data,
  } = useQuery(
    ['balances', walletAddress],
    () =>
      getBalances(
        walletAddress
          ? (walletAddress as string)
          : (publicKey?.toBase58() as string)
      ),
    {
      // // Cache data for 5 minutes (in milliseconds)
      staleTime: 3 * 60 * 1000,
      // // Don't automatically refetch data in the background
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (!user?.id) return <>no user</>;
  if (!data) {
    if (isLoading) return <Skeleton w="full" height="4rem" />;
    return <ComponentErrors />;
  }
  if (balanceFetchingError || solanaTokenPriceFetchingError) {
    return <ComponentErrors />;
  }

  const filteredData = filterTokens(data.tokens);
  return (
    <VStack gap="0px" px="8px" w="full">
      <Box
        display={size === 'lg' ? 'none' : 'block'}
        w="full"
        as="p"
        textStyle={'body5'}
        color="neutral.8"
        p="8px 2px"
      >
        Wallet Balance
      </Box>
      {data && (
        <Skeleton
          w="full"
          fadeDuration={2.6}
          isLoaded={!solanaTokenPriceLoading}
        >
          <HStack p="0px 2px" gap="8px" w="full">
            <SOL
              size={
                size
                  ? size === 'sm'
                    ? { base: '18px', md: '20px' }
                    : size === 'md'
                    ? { base: '24px', md: '30px' }
                    : { base: '28px', md: '38px' }
                  : { base: '18px', md: '20px' }
              }
            />
            <Box
              as="p"
              textStyle={
                size
                  ? size === 'md'
                    ? { base: 'body4', md: 'body3' }
                    : { base: 'body3', md: 'body2' }
                  : { base: 'body5', md: 'body4' }
              }
              color="neutral.11"
            >
              SOL
            </Box>
            <HStack alignItems={'end'} justify={'end'} w="full">
              <Skeleton isLoaded={!solanaTokenPriceLoading}>
                <Box
                  display={size === 'lg' ? 'block' : 'none'}
                  textAlign={'end'}
                  as="p"
                  textStyle={
                    size
                      ? size === 'md'
                        ? { base: 'body5', md: 'body4' }
                        : { base: 'body4', md: 'body3' }
                      : { base: 'body5', md: 'body4' }
                  }
                  color="neutral.7"
                >
                  $
                  {data.nativeBalance / LAMPORTS_PER_SOL === 0
                    ? 0
                    : data.nativeBalance / LAMPORTS_PER_SOL < 0.01
                    ? (
                        (data.nativeBalance / LAMPORTS_PER_SOL) *
                        (solanaCurrentPrice as number)
                      ).toFixed(2)
                    : (
                        (data.nativeBalance / LAMPORTS_PER_SOL) *
                        (solanaCurrentPrice as number)
                      ).toFixed(2)}
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!solanaTokenPriceLoading}>
                <Box
                  textAlign={'end'}
                  as="p"
                  textStyle={
                    size
                      ? size === 'md'
                        ? { base: 'title4', md: 'title3' }
                        : { base: 'title3', md: 'title2' }
                      : { base: 'title6', md: 'title5' }
                  }
                  color="neutral.11"
                >
                  {data.nativeBalance / LAMPORTS_PER_SOL === 0
                    ? 0
                    : data.nativeBalance / LAMPORTS_PER_SOL < 0.01
                    ? (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(4)
                    : (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(1)}
                </Box>
              </Skeleton>
            </HStack>
          </HStack>
        </Skeleton>
      )}
      {filteredData?.map((token) => {
        const tokenBalance = token.amount / 10 ** token.decimals;

        return token.tokenAccount ==
          'BYgQgaAcgxmAHh7iAYeyV2V1RVTd9edvesrQbSiAYKET' ? (
          <HStack p="0px 2px" gap="8px" w="full" key={token.tokenAccount}>
            <BONK
              size={
                size
                  ? size === 'sm'
                    ? { base: '18px', md: '20px' }
                    : size === 'md'
                    ? { base: '24px', md: '30px' }
                    : { base: '28px', md: '38px' }
                  : { base: '18px', md: '20px' }
              }
            />
            <Box
              as="p"
              textStyle={
                size
                  ? size === 'md'
                    ? { base: 'body4', md: 'body3' }
                    : { base: 'body3', md: 'body2' }
                  : { base: 'body5', md: 'body4' }
              }
              color="neutral.11"
            >
              BONK
            </Box>
            <HStack alignItems={'end'} justify={'end'} w="full">
              <Skeleton isLoaded={!solanaTokenPriceLoading}>
                <Box
                  display={size === 'lg' ? 'block' : 'none'}
                  textAlign={'end'}
                  as="p"
                  textStyle={
                    size
                      ? size === 'md'
                        ? { base: 'body5', md: 'body4' }
                        : { base: 'body4', md: 'body3' }
                      : { base: 'body5', md: 'body4' }
                  }
                  color="neutral.7"
                >
                  $
                  {tokenBalance === 0
                    ? 0
                    : tokenBalance < 0.01
                    ? tokenBalance.toFixed(4)
                    : formatNumberWithK(+tokenBalance.toFixed(1))}
                </Box>
              </Skeleton>
              <Box
                w="full"
                textAlign={'end'}
                as="p"
                textStyle={'title5'}
                color="neutral.11"
              >
                {tokenBalance === 0
                  ? 0
                  : tokenBalance < 0.01
                  ? tokenBalance.toFixed(4)
                  : formatNumberWithK(+tokenBalance.toFixed(1))}
              </Box>
            </HStack>
          </HStack>
        ) : token.tokenAccount ==
          'CG8TA4H9dysAaXS9hTAnhgWXUcJmoHZYK4oKDJqYcFSE' ? (
          <HStack p="0px 2px" gap="8px" w="full" key={token.tokenAccount}>
            <USDC size={'20px'} />
            <Box
              as="p"
              textStyle={
                size
                  ? size === 'md'
                    ? { base: 'body4', md: 'body3' }
                    : { base: 'body3', md: 'body2' }
                  : { base: 'body5', md: 'body4' }
              }
              color="neutral.11"
            >
              USDC
            </Box>
            <Box
              w="full"
              textAlign={'end'}
              as="p"
              textStyle={'title5'}
              color="neutral.11"
            >
              {tokenBalance === 0
                ? 0
                : tokenBalance < 0.01
                ? tokenBalance.toFixed(4)
                : formatNumberWithK(+tokenBalance.toFixed(1))}
            </Box>
          </HStack>
        ) : null;
      })}
    </VStack>
  );
};

export default WalletBalance;
