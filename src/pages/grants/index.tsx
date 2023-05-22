import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Icon,
  Skeleton,
  SkeletonText,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Round } from '@prisma/client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import RoundStatus from '~/components/common/dates/Status';
import SelectProjectToApplyForGrant from '~/components/pages/grants/SelectProjectToApplyForGrant';
import { formatNumberWithK } from '~/utils/formatWithK';
import { checkRoundStatus, GRANT_STATUS } from '~/utils/round/checkRoundStatus';
import { trpc } from '~/utils/trpc';

// todo make upcoming live grants separate
const RoundPage = () => {
  const {
    data: rounds,
    isLoading,
    isError,
    error,
  } = trpc.round.findActive.useQuery();
  const { data } = useSession();

  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGrantRound, setSelectedGrantRound] = useState<Round | null>(
    null
  );
  const handleApplyForGrant = () => {
    if (!wallet.publicKey?.toBase58()) return walletModal.setVisible(true);
    onOpen();
  };

  return (
    <>
      <Container maxW="7xl" py="64px">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap="40px"
          w="full"
          align="start"
          justify="space-between"
          pb="32px"
        >
          <VStack align={'start'} gap="8px">
            <Box
              color="neutral.11"
              as="p"
              textStyle={{ base: 'headline2', md: 'display3' }}
            >
              Grants Help the ecosystem grow.
            </Box>{' '}
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: 'body4', md: 'body3' }}
            >
              Apply for a grant or contribute in a grants round
            </Box>
          </VStack>
          <Button variant="close_modal" rightIcon={<BiPlus />}>
            <Link href="/grants/new-grant">Create Grant Round</Link>
          </Button>
        </Stack>
        <VStack py="64px" w="full" align="start" spacing="32px">
          <Box
            color="neutral.11"
            as="p"
            textStyle={{ base: 'title3', md: 'title2' }}
          >
            Grants Rounds
          </Box>{' '}
          {isLoading ? (
            [0, 1, 2].map((index) => (
              <HStack
                key={index}
                border="2px solid"
                borderColor="#ffffff10"
                backgroundColor="#000000"
                p={{ base: '16px', md: '32px' }}
                w="full"
                gap="24px"
                rounded="16px"
                justify={'space-between'}
                align="center"
                direction={{ base: 'column', md: 'row' }}
              >
                <VStack align={'start'} width="full" spacing="24px">
                  <VStack align="start" width="full" spacing="12px">
                    <Skeleton height="2rem" width="10rem" />
                    <SkeletonText
                      noOfLines={2}
                      skeletonHeight={2}
                      width={'full'}
                    />
                  </VStack>
                  <Skeleton py="24px" height="1rem" width="18rem" />
                </VStack>{' '}
              </HStack>
            ))
          ) : isError ? (
            <Container maxW="7xl">
              <Center
                gap="16px"
                flexDir={'column'}
                maxW="4xl"
                mx="auto"
                py="5rem"
              >
                <Box
                  as="p"
                  textStyle={'title1'}
                  color="white"
                  textTransform={'capitalize'}
                >
                  {error.message}
                </Box>
              </Center>
            </Container>
          ) : (
            rounds?.map((round) => (
              <Stack
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
                justify="space-between"
                key={round.id}
                border={'2px solid'}
                borderColor="#ffffff10"
                backgroundColor="#000000"
                p={{ base: '16px', md: '32px' }}
                w="full"
                gap={{ base: '40px', md: '24px' }}
                rounded="20px"
                position="relative"
                overflow={'hidden'}
                _after={{
                  content: '""',
                  zIndex: '1',
                  position: 'absolute',
                  bottom: '50%',
                  left: '0%',
                  transform: 'translate(0%, -50%)',
                  width: '8rem',
                  height: '8rem',
                  backgroundColor: '#31F579',
                  filter: 'blur(100px)',
                  borderRadius: 'full',
                }}
              >
                <VStack align={'start'} spacing="24px">
                  <VStack align="start" w="full" spacing="12px">
                    <HStack align="center" gap="16px">
                      <Box
                        color="neutral.11"
                        as="p"
                        textStyle={{ base: 'title3', md: 'title1' }}
                        textTransform={'capitalize'}
                      >
                        {round.roundName}
                        {''} Round
                      </Box>
                      <RoundStatus
                        startDate={round.startTime}
                        endDate={round.endtime}
                      />
                    </HStack>
                    <Box
                      as="p"
                      noOfLines={2}
                      maxW="38rem"
                      textStyle={{ base: 'body5', md: 'body4' }}
                      color="neutral.9"
                    >
                      {round.short_description}
                    </Box>
                  </VStack>
                  <HStack
                    bg="#ffffff08"
                    rounded="8px"
                    shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                    outline="1px solid #ffffff16"
                    p={{ base: '0.6rem 1.2rem', md: '0.8rem 1.5rem' }}
                  >
                    <Box
                      color="#B4B0B2"
                      textTransform={'uppercase'}
                      as="p"
                      textStyle={{ base: 'body6', md: 'overline3' }}
                    >
                      Matching Pool
                    </Box>
                    <Box as="p" textStyle={{ base: 'body5', md: 'title4' }}>
                      : {formatNumberWithK(round.matchedPool)} USDC
                    </Box>
                  </HStack>
                </VStack>
                <Stack
                  align={{ base: 'center', md: 'center' }}
                  direction={{ base: 'row', md: 'column' }}
                >
                  <Center>
                    <Button
                      as={Link}
                      href={'/grants/' + round.id}
                      variant={'cubikFilled'}
                      size={'cubikSmall'}
                      minW="10rem"
                      rightIcon={
                        <Icon as={FiChevronRight} width={4} height={4} />
                      }
                    >
                      View Details
                    </Button>
                  </Center>{' '}
                  <Center h="full">
                    {data?.user.id === round.userId ? (
                      <Button
                        variant={'cubikText'}
                        size={'cubikSmall'}
                        minW="10rem"
                      >
                        <Link href={`/grants/admin/${round.id}`}>
                          Manage Grant
                        </Link>
                      </Button>
                    ) : (
                      checkRoundStatus(round.startTime, round.endtime) ===
                        GRANT_STATUS.notStarted && (
                        <Button
                          onClick={() => {
                            setSelectedGrantRound(round);
                            handleApplyForGrant();
                          }}
                          variant={'cubikText'}
                          size={'cubikSmall'}
                          minW="10rem"
                        >
                          Apply for Grant
                        </Button>
                      )
                    )}
                  </Center>
                </Stack>
              </Stack>
            ))
          )}
        </VStack>
      </Container>
      <SelectProjectToApplyForGrant
        isOpen={isOpen}
        onClose={onClose}
        selectedGrantRound={selectedGrantRound}
      />
    </>
  );
};

export default RoundPage;
