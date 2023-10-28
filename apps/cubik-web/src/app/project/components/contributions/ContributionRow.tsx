'use client';

import { useRouter } from 'next/navigation';
import { SOL, USDC } from '@/app/components/common/tags/TokenTags';
import Username from '@/app/components/common/username';
import { TruncatedAddr } from '@/app/components/common/wallet';
import { Avatar, Box, Center, HStack, Td, Tr, VStack } from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatNumberWithK';
import { timeSince } from '@/utils/helpers/timeSince';
import { fullTokenList } from '@/utils/helpers/tokenlist';

type Props = {
  id: string;
  avatar: string;
  username: string;
  walletAddress: string;
  amount: number;
  timestamp: Date;
  token: string;
  usd: number;
};

export const ContributorRow: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Tr
      w={'full'}
      onClick={() => {
        router.push(`/${props?.username}`);
      }}
      cursor="pointer"
      _hover={{ backgroundColor: '#0000008A' }}
    >
      <Td p="18px">
        <HStack align={'start'} gap={{ base: '8px', md: '16px' }}>
          <Avatar
            width={{ base: '36px', md: '44px' }}
            height={{ base: '36px', md: '44px' }}
            src={props.avatar}
          />
          <VStack
            align={'start'}
            justify="center"
            spacing={{ base: '8px', md: '8px' }}
          >
            <Username isLoading={false} username={props?.username} size="sm" />
            <Box
              as="p"
              textStyle={{ base: 'body6', md: 'body5' }}
              color="neutral.7"
            >
              {TruncatedAddr({
                walletAddress: props.walletAddress,
              })}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <HStack gap="8px" align={'center'}>
          <Center>
            {fullTokenList.find(
              (e) => e.name.includes('Solana') && e.address === props.token,
            ) && <SOL size={'32px'} />}
            {fullTokenList.find(
              (e) => e.name.includes('USDC') && e.address === props.token,
            ) && <USDC size={'32px'} />}
          </Center>
          <VStack justify={'center'} spacing="2px" align={'start'}>
            <HStack align={'baseline'} color="white">
              <Box as="p" textStyle={{ base: 'title5', md: 'title4' }}>
                {formatNumberWithK(props.amount)}
              </Box>
              <Box as="p" textStyle={{ base: 'title6', md: 'title7' }}>
                {fullTokenList.find((e) => e.address === props.token)?.name}
              </Box>
            </HStack>

            <Box
              as="p"
              color="neutral.8"
              textStyle={{ base: 'body6', md: 'body5' }}
            >
              ${formatNumberWithK(props.usd)}
            </Box>
          </VStack>
        </HStack>
      </Td>
      <Td p="18px">
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body4' }}
          color="neutral.11"
        >
          {timeSince(new Date(props.timestamp))}
        </Box>
      </Td>
      <Td p="18px">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.94994 6.70698L7.65694 5.99998L1.99994 0.342983L0.585938 1.75698L4.82794 5.99998L0.585938 10.243L1.99994 11.657L6.94994 6.70698Z"
            fill="white"
          />
        </svg>
      </Td>
    </Tr>
  );
};
