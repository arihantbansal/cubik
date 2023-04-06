import { HStack, VStack } from '@chakra-ui/layout';
import { Box, Skeleton } from '@chakra-ui/react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
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
  console.log(
    `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
  );
  const { data } = await axios.get(
    `https://api.helius.xyz/v0/addresses/${address}/balances?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`
  );
  return data;
};

const WalletBalance = () => {
  const { data: session } = useSession();
  const { isLoading, error, data } = useQuery('balances', () =>
    getBalances(session?.user.mainWallet as string)
  );

  if (!session?.user.id) return <>no user</>;
  if (!data) {
    if (isLoading) return <Skeleton w="full" height="4rem" />;
    return <>no data</>;
  }
  if (error) {
    return <>error</>;
  }

  const filteredData = filterTokens(data.tokens);
  return (
    <VStack gap="0px" px="8px" w="full">
      <Box w="full" as="p" textStyle={'body5'} color="neutral.8" p="8px 2px">
        Wallet Balance
      </Box>
      {data && (
        <HStack p="0px 2px" gap="8px" w="full">
          <SOL size={20} />
          <Box as="p" textStyle={'body5'} color="neutral.11">
            SOL
          </Box>
          <Box
            w="full"
            textAlign={'end'}
            as="p"
            textStyle={'title5'}
            color="neutral.11"
          >
            {data.nativeBalance / LAMPORTS_PER_SOL === 0
              ? 0
              : data.nativeBalance / LAMPORTS_PER_SOL < 0.01
              ? (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(4)
              : (data.nativeBalance / LAMPORTS_PER_SOL).toFixed(1)}
          </Box>
        </HStack>
      )}
      {filteredData?.map((token) => {
        return token.tokenAccount ==
          'BYgQgaAcgxmAHh7iAYeyV2V1RVTd9edvesrQbSiAYKET' ? (
          <HStack p="0px 2px" gap="8px" w="full">
            <BONK size={20} />
            <Box as="p" textStyle={'body5'} color="neutral.11">
              BONK
            </Box>
            <Box
              w="full"
              textAlign={'end'}
              as="p"
              textStyle={'title5'}
              color="neutral.11"
            >
              {token.amount / LAMPORTS_PER_SOL === 0
                ? 0
                : token.amount / LAMPORTS_PER_SOL < 0.01
                ? (token.amount / LAMPORTS_PER_SOL).toFixed(4)
                : formatNumberWithK(
                    +(token.amount / LAMPORTS_PER_SOL).toFixed(1)
                  )}
            </Box>
          </HStack>
        ) : token.tokenAccount ==
          'CG8TA4H9dysAaXS9hTAnhgWXUcJmoHZYK4oKDJqYcFSE' ? (
          <HStack p="0px 2px" gap="8px" w="full">
            <USDC size={20} />
            <Box as="p" textStyle={'body5'} color="neutral.11">
              USDC
            </Box>
            <Box
              w="full"
              textAlign={'end'}
              as="p"
              textStyle={'title5'}
              color="neutral.11"
            >
              {token.amount / LAMPORTS_PER_SOL === 0
                ? 0
                : token.amount / LAMPORTS_PER_SOL < 0.01
                ? (token.amount / LAMPORTS_PER_SOL).toFixed(4)
                : formatNumberWithK(
                    +(token.amount / LAMPORTS_PER_SOL).toFixed(1)
                  )}
            </Box>
          </HStack>
        ) : null;
      })}
    </VStack>
  );
};

export default WalletBalance;
