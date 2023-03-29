import { Box, Center, HStack, Stack, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

interface CountdownTimerProps {
  finalDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ finalDate }) => {
  const getTimeRemaining = (endDate: Date) => {
    const total = endDate.getTime() - new Date().getTime();
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

  const [timeRemaining, setTimeRemaining] = useState<number>(
    getTimeRemaining(finalDate).total
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeRemaining(finalDate);
      if (time.total <= 0) {
        clearInterval(interval);
      }
      setTimeRemaining(time.total);
    }, 1000);

    return () => clearInterval(interval);
  }, [finalDate]);

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
        {getTimeRemaining(finalDate).days && (
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
                  numbers={String(
                    formatNumber(getTimeRemaining(finalDate).days)
                  )}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Days
            </Box>
          </VStack>
        )}
        {getTimeRemaining(finalDate).hours && (
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
                  numbers={String(
                    formatNumber(getTimeRemaining(finalDate).hours)
                  )}
                />
              </Box>
            </Box>
            <Box as="p" textStyle="overline3" color="#B4B0B2">
              Hours
            </Box>
          </VStack>
        )}
        {getTimeRemaining(finalDate).minutes && (
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
                  numbers={String(
                    formatNumber(getTimeRemaining(finalDate).minutes)
                  )}
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

interface Ripple {
  x: number;
  y: number;
  size: number;
}

function RippleEffect() {
  const rippleRef = useRef<Ripple[]>([]);

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const newRipple: Ripple = {
      x: event.clientX,
      y: event.clientY,
      size: 0,
    };
    rippleRef.current.push(newRipple);
  };

  return (
    <Center
      onClick={addRipple}
      rounded={'full'}
      p="0.25rem"
      background="#4ADE8020"
    >
      {rippleRef.current.map((ripple, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: '#4ADE80',
          }}
          initial={{ width: 0, height: 0, opacity: 1, scale: 1 }}
          animate={{
            width: 2 * ripple.size,
            height: 2 * ripple.size,
            opacity: 0,
            scale: 2,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            rippleRef.current.splice(index, 1);
          }}
        />
      ))}
      <Center
        rounded="full"
        w="0.5rem"
        h="0.5rem"
        background="#4ADE80"
        boxShadow={`0px 0px ${rippleRef.current.length * 10}px #4ADE80`}
      />
    </Center>
  );
}

const RoundStatus = () => {
  const finalDate = new Date('2023-04-01T00:00:00');

  return (
    <VStack
      gap={{ base: '0.7rem', md: '1rem' }}
      align={{ base: 'start', md: 'center' }}
    >
      <Center
        flexDirection="row"
        p="0.4rem 0.8rem"
        gap="0.5rem"
        rounded="full"
        bg="#091414"
        color="#4ADE80"
      >
        <RippleEffect />
        <Box as="p" textStyle="overline3" textTransform="uppercase">
          On going round ends in
        </Box>
      </Center>
      <CountdownTimer finalDate={finalDate} />
    </VStack>
  );
};

const FundingRoundBanner = () => {
  return (
    <Stack
      p={{ base: '2rem', md: '3rem' }}
      border="2px solid #ffffff10"
      overflow="hidden"
      w="full"
      gap="3rem"
      rounded="12px"
      justify={'space-between'}
      align="start"
      direction={{ base: 'column', md: 'row' }}
      position={'relative'}
      _before={{
        content: '""',
        zIndex: '0',
        position: 'absolute',
        top: '0',
        left: '0',
        transform: 'translate(-50%, -50%)',
        width: '20vw',
        maxW: '20rem',
        minW: '12rem',
        height: '20vw',
        maxH: '20rem',
        minH: '12rem',
        backgroundColor: '#4ADE80',
        filter: 'blur(200px)',
        WebkitFilter: 'blur(200px)',
        rounded: 'full',
      }}
      _after={{
        content: '""',
        zIndex: '-1',
        position: 'absolute',
        bottom: '0%',
        border: '1px solid red',
        right: '0',
        transform: 'translate(50%, -50%)',
        width: '20vw',
        maxW: '20rem',
        minW: '12rem',
        height: '20vw',
        maxH: '20rem',
        minH: '12rem',
        backgroundColor: '#4ADE80',
        filter: 'blur(200px)',
        WebkitFilter: 'blur(200px)',
        rounded: 'full',
      }}
    >
      <VStack align={'start'} spacing="1.4rem">
        <Box as="p" textStyle={{ base: 'title1', md: 'headline3' }}>
          Web3 Open Source Software Round
        </Box>
        <HStack
          bg="#ffffff10"
          rounded="8px"
          p={{ base: '0.6rem 1.2rem', md: '0.8rem 1.5rem' }}
        >
          <Box
            color="#B4B0B2"
            textTransform={'uppercase'}
            as="p"
            textStyle={{ base: 'body4', md: 'overline3' }}
          >
            Matching Pool
          </Box>
          <Box as="p" textStyle={{ base: 'body4', md: 'title3' }}>
            : $30,000
          </Box>
        </HStack>
      </VStack>
      <RoundStatus />
    </Stack>
  );
};

export default FundingRoundBanner;
