import React from 'react';
import ComponentErrors from '@/app/components/common/errors/componentErrors';
import { SOL, USDC } from '@/app/components/common/tags/TokenTags';
import { useUser } from '@/app/context/user';
import { Box, HStack, Skeleton, VStack } from '@/utils/chakra';
import { filterTokens } from '@/utils/helpers/filterTokens';
import { formatNumberWithK } from '@/utils/helpers/formatWithK';
import { getBalances } from '@/utils/helpers/getBalances';
import { useCurrentTokenPrice } from '@/utils/helpers/tokenprice';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

interface Props {
  size?: 'sm' | 'md' | 'lg' | string;
}
export const WalletBalance = ({ size }: Props) => {
  const { user } = useUser();

  const {
    data: price,
    isLoading: priceLoading,
    error: priceError,
  } = useCurrentTokenPrice(['solana']);

  const {
    isLoading,
    error: balanceFetchingError,
    data,
  } = useQuery(
    ['balances', user?.mainWallet],
    () => getBalances(user?.mainWallet as string),
    {
      staleTime: 3 * 60 * 1000,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  if (!user?.username) return <>no user</>;
  if (!data) {
    if (isLoading) return <Skeleton w="full" height="4rem"></Skeleton>;
    return <ComponentErrors />;
  }
  if (balanceFetchingError || priceError) {
    return <ComponentErrors />;
  }

  const filteredData = filterTokens(data.tokens);
  const handleSolPriceCal = (): number => {
    if (data.nativeBalance / LAMPORTS_PER_SOL === 0) return 0;

    if (data.nativeBalance / LAMPORTS_PER_SOL < 0.01) {
      return 0.01 * price?.find((p) => p.token === 'Sol')?.price! ?? 0;
    }

    return (
      (data.nativeBalance / LAMPORTS_PER_SOL) *
      price?.find((p) => p.token === 'Sol')?.price!
    );
  };
  return (
    <VStack
      gap={
        size
          ? size === 'sm'
            ? { base: '2px', md: '4px' }
            : size === 'md'
            ? { base: '6px', md: '10px' }
            : { base: '8px', md: '12px' }
          : { base: '2px', md: '2px' }
      }
      px="8px"
      w="full"
    >
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
        <Skeleton w="full" fadeDuration={2.6} isLoaded={!priceLoading}>
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
              <Skeleton isLoaded={!priceLoading}>
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
                  ${handleSolPriceCal()}
                </Box>
              </Skeleton>
              <Skeleton isLoaded={!priceLoading}>
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
        return token.mint == 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' ? (
          <HStack p="0px 2px" gap="8px" w="full" key={token.tokenAccount}>
            <Skeleton w="full" fadeDuration={2.6} isLoaded={!priceLoading}>
              <HStack gap="8px">
                <USDC
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
                  USDC
                </Box>
              </HStack>
            </Skeleton>
            <HStack alignItems={'end'} justify={'end'} w="full">
              <Skeleton isLoaded={!priceLoading}>
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
              <Skeleton isLoaded={!priceLoading}>
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
                  {tokenBalance === 0
                    ? 0
                    : tokenBalance < 0.01
                    ? tokenBalance.toFixed(4)
                    : formatNumberWithK(+tokenBalance.toFixed(1))}
                </Box>
              </Skeleton>
            </HStack>
          </HStack>
        ) : null;
      })}
    </VStack>
  );
};
