import { Box, HStack, Stack, Tooltip, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FlipNumbers from "react-flip-numbers";
import { FiInfo } from "react-icons/fi";
import RoundStatus from "~/components/common/dates/Status";

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

  const [timeRemaining, setTimeRemaining] = useState<number>(
    getTimeRemaining(date).total
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeRemaining(date);
      if (time.total <= 0) {
        clearInterval(interval);
      }
      setTimeRemaining(time.total);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const formatNumber = (number: number) => {
    return number < 10 ? "0" + number : number;
  };

  return (
    <HStack as="span" spacing="4px">
      {getTimeRemaining(date).days && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).days)) + "d : "}
        </Box>
      )}

      {getTimeRemaining(date).hours && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).hours) + "h : ")}
        </Box>
      )}

      {getTimeRemaining(date).minutes && (
        <Box as="p" textStyle="body5">
          {String(formatNumber(getTimeRemaining(date).minutes) + "m")}
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

  const [timeRemaining, setTimeRemaining] = useState<number>(
    getTimeRemaining(date).total
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeRemaining(date);
      if (time.total <= 0) {
        clearInterval(interval);
      }
      setTimeRemaining(time.total);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const formatNumber = (number: number) => {
    return number < 10 ? "0" + number : number;
  };

  return (
    <Box
      display="flex"
      alignItems={{ base: "start", md: "center" }}
      justifyContent="center"
      fontWeight={"700"}
    >
      <HStack gap={{ base: "1.8rem", md: "2rem" }}>
        {getTimeRemaining(date).days && (
          <VStack>
            <Box as="p" textStyle={"headline3"}>
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
            <Box as="p" textStyle={"headline3"}>
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
            <Box as="p" textStyle={"headline3"}>
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
  startDate,
  endDate,
  id,
  name,
  description,
  matchingPool,
}: {
  startDate: Date;
  endDate: Date;
  id: string;
  name: string;
  description: string;
  matchingPool: number;
}) => {
  return (
    <Stack
      cursor={"pointer"}
      w="full"
      direction={{ base: "column", md: "row" }}
    >
      <Stack
        maxW={"full"}
        p={{ base: "16px", md: "32px" }}
        border="2px solid #ffffff10"
        overflow="hidden"
        background={"#080808"}
        w="full"
        gap="3rem"
        rounded="16px"
        justify={"space-between"}
        align="start"
        direction={{ base: "column", md: "row" }}
        position={"relative"}
        _after={{
          content: '""',
          zIndex: "0",
          position: "absolute",
          top: "-10",
          right: "-20",
          transform: "translate(-50%, -50%) scale(10)",
          width: "1vw",
          maxW: "1rem",
          minW: "0.6rem",
          height: "full",
          maxH: "1.2rem",
          minH: "0.8rem",
          backgroundColor: "#FFE53D",
          filter: "blur(10px)",
          WebkitFilter: "blur(10px)",
          rounded: "full",
        }}
        _before={{
          content: '""',
          zIndex: "0",
          position: "absolute",
          top: "50%",
          right: "10%",
          transform: "translate(50%, -50%) scale(10)",
          width: "2vw",
          maxW: "2rem",
          minW: "1.2rem",
          height: "2vw",
          maxH: "2rem",
          minH: "1.2rem",
          backgroundColor: "#31F579",
          filter: "blur(25px)",
          WebkitFilter: "blur(25px)",
          rounded: "full",
        }}
      >
        <VStack w="full" align={"start"} spacing="48px">
          <VStack w="full" align={"start"} spacing="24px">
            <RoundStatus
              isHackathon={true}
              startDate={startDate}
              endDate={endDate}
            />
            <Stack
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              align="start"
              gap={{ base: "8px", md: "16px" }}
              w="full"
            >
              <VStack align={"start"} gap="8px">
                <Box
                  color="neutral.11"
                  as="p"
                  textStyle={{ base: "title2", md: "headline3" }}
                >
                  {name}
                </Box>
                <Box
                  maxW={{ base: "340px", md: "500px" }}
                  as="p"
                  color="neutral.8"
                  h="2.8rem"
                  textStyle={{ base: "body5", md: "body3" }}
                  noOfLines={2}
                >
                  {description}
                </Box>
              </VStack>
              <HStack
                bg="#ffffff10"
                rounded="full"
                boxShadow={"0px 4px 24px rgba(0, 0, 0, 0.08)"}
                p={{ base: "0.6rem 1.2rem", md: "0.8rem 1.5rem" }}
              >
                <Box
                  whiteSpace={"nowrap"}
                  color="neutral.8"
                  textTransform={"uppercase"}
                  as="p"
                  textStyle={{ base: "body7", md: "overline4" }}
                  letterSpacing="2px"
                >
                  Matching Pool :
                </Box>
                <HStack>
                  <Box as="p" textStyle={{ base: "body5", md: "title3" }}>
                    ${matchingPool}
                  </Box>
                  <Tooltip
                    zIndex={1000}
                    background={"black"}
                    p={2}
                    label="The matching pool is in 1M $RAIN  + 1K $USDC. The USD value of $RAIN is subject to change"
                  >
                    <Box zIndex={1000} as="p">
                      <FiInfo />
                    </Box>
                  </Tooltip>
                </HStack>
              </HStack>
            </Stack>
          </VStack>
          {/* <Button
            rightIcon={<BiChevronRight size={20} />}
            borderRadius="8px"
            p="12px 32px"
            backgroundColor="white"
            colorScheme={'white'}
          >
            Submit Project
          </Button>*/}
        </VStack>
        {/* <RoundStatus /> */}
      </Stack>
    </Stack>
  );
};

export default FundingRoundBanner;
