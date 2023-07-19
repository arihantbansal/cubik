import {
  Box,
  Center,
  Container,
  HStack,
  LinkBox,
  Skeleton,
  SkeletonText,
  Stack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import Link from 'next/link';
import RoundStatus from '~/components/common/dates/Status';
import { formatNumberWithK } from '~/utils/formatWithK';
import { trpc } from '~/utils/trpc';

// todo make upcoming live grants separate
const RoundPage = () => {
  const {
    data: rounds,
    isLoading,
    isError,
    error,
  } = trpc.round.findActive.useQuery();

  return (
    <>
      <Container maxW="7xl" py={{ base: '48px', md: '64px' }}>
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
              textStyle={{ base: 'display5', md: 'display3' }}
            >
              Quadratic Funding Grants
            </Box>{' '}
            <Box
              color="neutral.9"
              as="p"
              textStyle={{ base: 'body4', md: 'body3' }}
            >
              Participate in Engaging Community Grant Rounds
            </Box>
          </VStack>
          {/* <Button variant="close_modal" rightIcon={<BiPlus />}>
            <Link href="/grants/new-grant">Create Grant Round</Link>
          </Button> */}
        </Stack>
        <VStack
          py={{ base: '32px', md: '64px' }}
          w="full"
          align="start"
          spacing="32px"
        >
          {' '}
          <Tabs
            w="full"
            border="1px solid red"
            variant="soft-rounded"
            colorScheme="green"
          >
            <HStack w="full" justify="space-between">
              <Box
                color="neutral.11"
                as="p"
                textStyle={{ base: 'title3', md: 'title2' }}
              >
                Grant Rounds
              </Box>

              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
              </TabList>
            </HStack>
          </Tabs>
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
            <VStack align="start" w="full" gap={{ base: '8px', md: '18px' }}>
              {rounds?.map((round) => (
                <Link
                  style={{
                    width: '100%',
                  }}
                  href={'/grants/' + round.id}
                >
                  <Box
                    display={'flex'}
                    flexDirection={{ base: 'column', md: 'row' }}
                    alignItems={{ base: 'start', md: 'center' }}
                    justifyContent="space-between"
                    key={round.id}
                    border={'2px solid'}
                    borderColor="#ffffff10"
                    _hover={{ borderColor: '#31F57920' }}
                    backgroundColor="#000000"
                    p={{ base: '16px', md: '32px' }}
                    w="full"
                    rounded="20px"
                    position="relative"
                    overflow={'hidden'}
                    textAlign={'start'}
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
                      // on hover
                      _hover: {
                        transform: 'translate(0%, -50%) scale(1.5)',
                        transition: 'transform 0.5s ease-in-out',
                      },
                    }}
                  >
                    <VStack
                      align="start"
                      spacing={{ base: '32px', md: '24px' }}
                    >
                      <VStack
                        align="start"
                        w="full"
                        spacing={{ base: '12px', md: '12px' }}
                      >
                        <Stack
                          direction={{ base: 'row', md: 'row' }}
                          align="center"
                          gap={{ base: '0px', md: '16px' }}
                          alignItems={{ base: 'start', md: 'center' }}
                        >
                          <Box
                            color="neutral.11"
                            as="p"
                            textStyle={{ base: 'title3', md: 'title1' }}
                            textTransform={'capitalize'}
                          >
                            {round.roundName}
                          </Box>
                          <RoundStatus
                            show={false}
                            startDate={round.startTime}
                            endDate={round.endTime}
                          />
                        </Stack>
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
                    {/* <Stack
                    align={{ base: 'center', md: 'center' }}
                    direction={{ base: 'row', md: 'column' }}
                  >
                    <Center>
                      {user?.id === round.userId ? (
                        <Button
                          as={Link}
                          href={`/grants/admin/${round.id}`}
                          variant={'cubikFilled'}
                          size={'cubikSmall'}
                          minW="10rem"
                          rightIcon={
                            <Box
                              as={FiChevronRight}
                              boxSize={{ base: '14px', md: '18px' }}
                            />
                          }
                        >
                          Manage Grant
                        </Button>
                      ) : (
                        checkRoundStatus(round.startTime, round.endTime) ===
                          GRANT_STATUS.notStarted && (
                          <Button
                            onClick={() => {
                              setSelectedGrantRound(round);
                              handleApplyForGrant();
                            }}
                            variant={'cubikFilled'}
                            size={'cubikSmall'}
                            minW="10rem"
                          >
                            Apply for Grant
                          </Button>
                        )
                      )}
                    </Center>
                  </Stack> */}
                  </Box>
                </Link>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default RoundPage;
