import {
  Avatar,
  Box,
  Button,
  HStack,
  Skeleton,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Round } from '@prisma/client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import RoundStatus from '~/components/common/dates/Status';
import { RoundDetailsWithProjectsWithContributionsType } from '~/types/round';
import { GRANT_STATUS, checkRoundStatus } from '~/utils/round/checkRoundStatus';
import SelectProjectToApplyForGrant from '../SelectProjectToApplyForGrant';

const GrantDetailsHeader = ({
  data,
  isLoading,
}: {
  data: RoundDetailsWithProjectsWithContributionsType | undefined | null;
  isLoading: boolean;
}) => {
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGrantRound, setSelectedGrantRound] = useState<Round | null>(
    null
  );
  const handleApplyForGrant = () => {
    if (!wallet.publicKey?.toBase58()) return walletModal.setVisible(true);
    onOpen();
  };
  return (
    <VStack w="full" align={'start'} gap={{ base: '28px', md: '40px' }}>
      <VStack w="full" align={'start'} gap={{ base: '8px', md: '8px' }}>
        <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? '0.5' : '1'}
            rounded="full"
          >
            <RoundStatus startDate={data?.startTime} endDate={data?.endtime} />
          </Skeleton>
          <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={1}
              opacity={isLoading ? '0.7' : '1'}
            >
              <Box
                as="p"
                textStyle={{ base: 'title1', md: 'display3' }}
                color={'neutral.11'}
              >
                {data?.roundName} Round
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={2}
              opacity={isLoading ? '0.6' : '1'}
            >
              <Box
                as="p"
                textStyle={{ base: 'body2', md: 'body1' }}
                color={'neutral.9'}
              >
                {data?.short_description}
              </Box>
            </Skeleton>
          </VStack>
        </VStack>
        <Stack
          justify={'space-between'}
          align={{ base: 'start', md: 'end' }}
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '12px', md: '24px' }}
          w="full"
        >
          <HStack gap="24px">
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.4' : '1'}
            >
              <HStack spacing="4px" align={'baseline'}>
                <Box
                  as="p"
                  textStyle={{ base: 'title5', md: 'title4' }}
                  color={'neutral.11'}
                >
                  ${data?.matchedPool}
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'overline4', md: 'overline3' }}
                  color={'neutral.11'}
                >
                  Matching Pool
                </Box>
              </HStack>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.4' : '1'}
            >
              <HStack spacing="4px" align={'baseline'}>
                <Box
                  as="p"
                  textStyle={{ base: 'title5', md: 'title4' }}
                  color={'neutral.8'}
                >
                  {data?.projectCount}
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'overline4', md: 'overline3' }}
                  color={'neutral.8'}
                >
                  Projects Participating
                </Box>
              </HStack>
            </Skeleton>
          </HStack>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={4}
            opacity={isLoading ? '0.4' : '1'}
          >
            <Button
              display={
                checkRoundStatus(
                  data?.startTime as Date,
                  data?.endtime as Date
                ) === GRANT_STATUS.notStarted
                  ? 'block'
                  : 'none'
              }
              variant={'cubikFilled'}
              size={{ base: 'cubikSmall', md: 'cubikMedium' }}
              onClick={() => {
                setSelectedGrantRound(data as Round);
                handleApplyForGrant();
              }}
            >
              Apply For Grant
            </Button>
          </Skeleton>
        </Stack>
      </VStack>
      <VStack spacing="16px" align="start">
        <Skeleton
          isLoaded={!isLoading}
          fadeDuration={4}
          opacity={isLoading ? '0.3' : '1'}
        >
          <Box
            as="p"
            textStyle={{ base: 'overline4', md: 'overline2' }}
            color={'neutral.11'}
          >
            Grant Sponsors
          </Box>
        </Skeleton>
        <HStack spacing={'16px'}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={4}
            opacity={isLoading ? '0.4' : '1'}
            rounded="full"
          >
            <HStack
              rounded="full"
              backgroundColor={'neutral.4'}
              p="8px"
              spacing="16px"
              pe="24px"
            >
              <Avatar
                size="sm"
                src={
                  'https://media.licdn.com/dms/image/C4E0BAQHcCejfzCYGDg/company-logo_200_200/0/1641233667655?e=2147483647&v=beta&t=oDXuW9JIKNPt5T_g9ABUJ-osc4DJZh88HNSkX9Nkmfg'
                }
              />
              <Box
                as="p"
                textStyle={{ base: 'title5', md: 'title4' }}
                color="neutral.11"
              >
                Solana Foundation
              </Box>
            </HStack>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={4}
            opacity={isLoading ? '0.4' : '1'}
            rounded="full"
          >
            <HStack
              rounded="full"
              backgroundColor={'neutral.4'}
              p="8px"
              spacing="16px"
              pe="24px"
            >
              <Avatar
                size="sm"
                src={
                  'https://s2.coinmarketcap.com/static/img/coins/200x200/23095.png'
                }
              />
              <Box
                as="p"
                textStyle={{ base: 'title5', md: 'title4' }}
                color="neutral.11"
              >
                Bonk DAO
              </Box>
            </HStack>
          </Skeleton>
        </HStack>
      </VStack>
      <SelectProjectToApplyForGrant
        isOpen={isOpen}
        onClose={onClose}
        selectedGrantRound={selectedGrantRound}
      />
    </VStack>
  );
};

export default GrantDetailsHeader;
