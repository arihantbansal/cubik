'use client';

import { Box, HStack, Stack, VStack } from '@/utils/chakra';
import FlipNumbers from 'react-flip-numbers';

import { StatusBanner } from './StatusBanner';

// import { FiInfo } from "react-icons/fi";
// import RoundStatus from "~/components/common/dates/Status";

interface CountdownTimerProps {
  date: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ date }) => {
  const getTimeRemaining = (date: Date) => {
    const total = date?.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  // const [timeRemaining, setTimeRemaining] = useState<number>(
  //   getTimeRemaining(date).total
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const time = getTimeRemaining(date);
  //     if (time.total <= 0) {
  //       clearInterval(interval);
  //     }
  //     setTimeRemaining(time.total);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [date]);

  const formatNumber = (number: number) => {
    return number < 10 ? '0' + number : number;
  };

  return (
    <HStack as="span" spacing="4px">
      {getTimeRemaining(date).days && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).days)) + 'd : '}
        </Box>
      )}

      {getTimeRemaining(date).hours && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).hours) + 'h : ')}
        </Box>
      )}

      {getTimeRemaining(date).minutes && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).minutes) + 'm')}
        </Box>
      )}
    </HStack>
  );
};

export const CountdownTimerBig: React.FC<CountdownTimerProps> = ({ date }) => {
  const getTimeRemaining = (date: Date) => {
    const total = date?.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  // const [timeRemaining, setTimeRemaining] = useState<number>(
  //   getTimeRemaining(date).total
  // );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const time = getTimeRemaining(date);
  //     if (time.total <= 0) {
  //       clearInterval(interval);
  //     }
  //     setTimeRemaining(time.total);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [date]);

  const formatNumber = (number: number) => {
    return number < 10 ? '0' + number : number;
  };

  return (
    <Box
      display="flex"
      alignItems={{ base: 'start', md: 'center' }}
      justifyContent="center"
      fontWeight={'700'}
    >
      <HStack gap={{ base: '1.8rem', md: '2rem' }}>
        {getTimeRemaining(date).days && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(formatNumber(getTimeRemaining(date).days))}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Days
            </Box>
          </VStack>
        )}
        {getTimeRemaining(date).hours && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(formatNumber(getTimeRemaining(date).hours))}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Hours
            </Box>
          </VStack>
        )}
        {getTimeRemaining(date).minutes && (
          <VStack>
            <Box as="p" textStyle={'headline3'}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(formatNumber(getTimeRemaining(date).minutes))}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Minutes
            </Box>
          </VStack>
        )}
      </HStack>
    </Box>
  );
};

const FundingRoundBanner = ({
  submissionEndDate,
  startDate,
  endDate,
  name,
  description,
  event,
}: {
  submissionEndDate: Date;
  startDate: Date;
  endDate: Date;
  id: string;
  name: string;
  description: string;
  event: 'hackathon' | 'round';
  matchingPool: number;
  background?: string;
}) => {
  // if (event === "hackathon" && background) {
  //   return (
  //     <HackathonCard
  //       background={background}
  //       id={id}
  //       name={name}
  //       prizePool={matchingPool}
  //       shortDescription={description}
  //       slug={id}
  //     />
  //   );
  // }
  return (
    <Stack
      cursor={'pointer'}
      w="full"
      h="full"
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack
        maxW={'full'}
        p={{ base: '16px', sm: '24px', md: '32px' }}
        border="2px solid #ffffff10"
        overflow="hidden"
        background={'#080808'}
        w="full"
        gap="3rem"
        rounded="16px"
        justify={'space-between'}
        align="start"
        direction={{ base: 'column', md: 'row' }}
        position={'relative'}
        _after={{
          content: '""',
          zIndex: '0',
          position: 'absolute',
          top: '-10',
          right: '-20',
          transform: 'translate(-50%, -50%) scale(10)',
          width: '1vw',
          maxW: '1rem',
          minW: '0.6rem',
          height: 'full',
          maxH: '1.2rem',
          minH: '0.8rem',
          backgroundColor: '#FFE53D',
          filter: 'blur(10px)',
          WebkitFilter: 'blur(10px)',
          rounded: 'full',
        }}
        _before={{
          content: '""',
          zIndex: '0',
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translate(50%, -50%) scale(10)',
          width: '2vw',
          maxW: '2rem',
          minW: '1.2rem',
          height: '2vw',
          maxH: '2rem',
          minH: '1.2rem',
          backgroundColor: '#31F579',
          filter: 'blur(25px)',
          WebkitFilter: 'blur(25px)',
          rounded: 'full',
        }}
      >
        <VStack w="full" align={'start'}>
          <VStack
            w="full"
            align={'start'}
            spacing={{ base: '16px', sm: '20px', md: '24px' }}
          >
            <StatusBanner
              isHackathon={event === 'hackathon' ? true : false}
              submissionEndDate={submissionEndDate}
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
            />
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justify={'space-between'}
              align="start"
              gap={{ base: '12px', sm: '12px', md: '16px' }}
              w="full"
            >
              <VStack align={'start'} gap={{ base: '6px', md: '8px' }}>
                <Box
                  color="neutral.11"
                  as="p"
                  textStyle={{ base: 'title2', sm: 'title2', md: 'headline3' }}
                >
                  {name}
                </Box>
                <Box
                  maxW={{ base: '340px', md: '500px' }}
                  as="p"
                  color="neutral.8"
                  h={{ base: 'auto', md: '2.8rem' }}
                  textStyle={{ base: 'body5', sm: 'body4', md: 'body3' }}
                  noOfLines={2}
                >
                  {description}
                </Box>
              </VStack>
              <HStack
                bg="#ffffff10"
                rounded="full"
                boxShadow={'0px 4px 24px rgba(0, 0, 0, 0.08)'}
                p={{
                  base: '0.4rem 0.8rem',
                  sm: '0.6rem 1rem',
                  md: '0.8rem 1.3rem',
                }}
              >
                <Box
                  whiteSpace={'nowrap'}
                  color="neutral.8"
                  textTransform={'uppercase'}
                  as="p"
                  textStyle={{ base: 'body7', md: 'overline4' }}
                  letterSpacing="2px"
                >
                  {/* {event === "hackathon" && "Prize Pool :"}
                  {event === "round" && "Matching Pool :"} */}
                  Matching Pool :
                </Box>
                <HStack>
                  <Box as="p" textStyle={{ base: 'body5', md: 'title3' }}>
                    {/* ${formatNumberWithComma(matchingPool)} */}
                    $1K BLZE + $1K USDC
                  </Box>
                </HStack>
              </HStack>
            </Stack>
          </VStack>
        </VStack>
      </Stack>
    </Stack>
  );
};

export default FundingRoundBanner;
