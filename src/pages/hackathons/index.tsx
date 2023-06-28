import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  LinkBox,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import RoundStatus from '~/components/common/dates/Status';
import { formatNumberWithK } from '~/utils/formatWithK';
import { trpc } from '~/utils/trpc';
import Image from 'next/image';

// todo make upcoming live grants separate

const HackathonsPage = () => {
  const { data, isLoading, isError, error } = trpc.hackathon.getAll.useQuery();

  return (
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
            Explore and Join Solana Ecosystem Hackathons
          </Box>{' '}
          <Box
            color="neutral.9"
            as="p"
            textStyle={{ base: 'body4', md: 'body3' }}
          >
            Participate in community run Hackathons and build the next big thing
            on Solana
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
        <Box
          color="neutral.11"
          as="p"
          textStyle={{ base: 'title3', md: 'title2' }}
        >
          All Hackathons
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
        ) : error ? (
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
                {/* {error?.message} */}
              </Box>
            </Center>
          </Container>
        ) : (
          <VStack align="start" w="full" gap={{ base: '8px', md: '18px' }}>
            {data?.map((hackathon) => (
              <LinkBox
                maxW="40rem"
                as={Link}
                href={'/hackathons/' + hackathon.id}
                display={'flex'}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'start', md: 'center' }}
                justifyContent="space-between"
                key={hackathon.id}
                border={'2px solid'}
                borderColor="#141414"
                _hover={{ borderColor: '#141414' }}
                backgroundColor="#080808"
                p={'0'}
                w="full"
                rounded="20px"
                position="relative"
                overflow={'hidden'}
                textAlign={'start'}
              >
                <VStack
                  position={'relative'}
                  align="start"
                  w="full"
                  spacing={{ base: '32px', md: '24px' }}
                >
                  <Center
                    position={'absolute'}
                    w="40rem"
                    top="0%"
                    left="50%"
                    transform="translate(-50%, 0%)"
                  >
                    <Center
                      zIndex={'0'}
                      alignItems={'end'}
                      w="40rem"
                      h={'10rem'}
                      position={'relative'}
                      overflow={'hidden'}
                      _before={{
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '10rem',
                        background:
                          'linear-gradient(0deg, #080808 0%, #08080800 60%)',
                        zIndex: 1,
                      }}
                    >
                      <Image
                        src={hackathon.background}
                        alt={'hackathon'}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </Center>
                  </Center>
                  <VStack
                    w="full"
                    gap={{ base: '14px', md: '18px' }}
                    align={'start'}
                    zIndex={'1'}
                    p="28px"
                    pt="4rem"
                  >
                    <SkeletonCircle
                      isLoaded={!isLoading}
                      fadeDuration={2}
                      opacity={isLoading ? '0.6' : '1'}
                      width={{ base: '5.5rem', md: '7rem' }}
                      height={{ base: '5.5rem', md: '7rem' }}
                    >
                      <Avatar
                        borderRadius="12px"
                        backgroundColor={'#1C1C1C'}
                        src={hackathon.logo}
                        width={{ base: '5.5rem', md: '7rem' }}
                        height={{ base: '5.5rem', md: '7rem' }}
                      />
                    </SkeletonCircle>
                    <Stack
                      align="start"
                      justify={'space-between'}
                      direction={{ base: 'column', lg: 'row' }}
                      w="full"
                    >
                      <VStack alignItems="start" maxW="24rem" spacing="16px">
                        <Box
                          as="p"
                          textStyle={{ base: 'title2', md: 'title1' }}
                          textTransform="capitalize"
                          color="neutral.11"
                          noOfLines={1}
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                        >
                          Solana Speedrun
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: 'body5', md: 'body4' }}
                          textTransform="capitalize"
                          color="neutral.8"
                          noOfLines={3}
                        >
                          {hackathon.short_description}
                        </Box>
                      </VStack>
                      <HStack
                        bg="#ffffff08"
                        rounded="8px"
                        shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                        outline="1px solid #ffffff16"
                        p={{ base: '0.6rem .8rem', md: '0.6rem 1rem' }}
                      >
                        <Box
                          color="#B4B0B2"
                          textTransform={'uppercase'}
                          as="p"
                          textStyle={{ base: 'body6', md: 'body5' }}
                        >
                          Prize Pool
                        </Box>
                        <Box as="p" textStyle={{ base: 'body4', md: 'body3' }}>
                          : ${formatNumberWithK(25000)}
                        </Box>
                      </HStack>
                    </Stack>
                  </VStack>
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
              </LinkBox>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default HackathonsPage;
