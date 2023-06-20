import {
  Avatar,
  Box,
  Button,
  Center,
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
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { RoundDetailsWithProjectsWithContributionsType } from '~/types/round';
import { GRANT_STATUS, checkRoundStatus } from '~/utils/round/checkRoundStatus';
import SelectProjectToApplyForGrant from '../SelectProjectToApplyForGrant';

const GrantDetailsHeader = ({
  data,
  isLoading,
  isError,
  error,
}: {
  data: RoundDetailsWithProjectsWithContributionsType | undefined | null;
  isLoading: boolean;
  isError: boolean;
  error?: any;
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

  if (isError) {
    return (
      <Center
        w="full"
        py={{ base: '16px', sm: '24px' }}
        border="1px dashed"
        borderColor={'#1D1F1E'}
        rounded="12px"
      >
        <ComponentErrors error={error?.message} />
      </Center>
    );
  }
  return (
    <VStack w="full" align={'start'} gap={{ base: '28px', md: '40px' }}>
      <VStack w="full" align={'start'} gap={{ base: '8px', md: '8px' }}>
        <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={1}
            opacity={isLoading ? '0.5' : '1'}
            rounded="full"
          >
            <RoundStatus startDate={data?.startTime} endDate={data?.endTime} />
          </Skeleton>
          <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={1.2}
              opacity={isLoading ? '0.6' : '1'}
            >
              <Box
                as="p"
                textStyle={{ base: 'display5', md: 'display3' }}
                color={'neutral.11'}
              >
                {data?.roundName}
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={1.5}
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
          align={{ base: 'center', md: 'end' }}
          direction={{ base: 'row', md: 'row' }}
          spacing={{ base: '12px', md: '24px' }}
          w="full"
        >
          <Stack
            w={{ base: 'full', md: 'auto' }}
            align={{ base: 'start', md: 'center' }}
            flexDir={{ base: 'column', md: 'row' }}
            pt="12px"
            pb={{ base: '12px', md: '0px' }}
            gap={{ base: '0px', md: '24px' }}
          >
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.4' : '1'}
            >
              <Stack
                direction={{ base: 'row', md: 'row' }}
                spacing="4px"
                align={'baseline'}
              >
                <HStack gap="4px" align="center" justify="start">
                  <Center
                    w="10px"
                    h="10px"
                    backgroundColor="surface.green.2"
                    rounded="full"
                  />
                  <Box
                    as="p"
                    textStyle={{ base: 'title5', md: 'title4' }}
                    color={'neutral.11'}
                  >
                    ${data?.matchedPool}
                  </Box>
                </HStack>
                <Box
                  as="p"
                  textStyle={{ base: 'overline4', md: 'overline3' }}
                  color={'neutral.11'}
                >
                  Matching Pool
                </Box>
              </Stack>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.4' : '1'}
            >
              <HStack gap="4px" align="center" justify="start">
                <Center
                  w="10px"
                  h="10px"
                  backgroundColor="surface.teal.2"
                  rounded="full"
                />
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
              </HStack>
            </Skeleton>
          </Stack>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={4}
            opacity={isLoading ? '0.4' : '1'}
          >
            <Button
              display={
                checkRoundStatus(
                  data?.startTime as Date,
                  data?.endTime as Date
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
          {/* <Skeleton
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
          </Skeleton> */}
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
                  'https://pbs.twimg.com/profile_images/1505359960942657539/sMjuxRcg_400x400.jpg'
                }
              />
              <Box
                as="p"
                textStyle={{ base: 'title5', md: 'title4' }}
                color="neutral.11"
              >
                Superteam DAO
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
