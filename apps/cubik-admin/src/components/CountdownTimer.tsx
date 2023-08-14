"use client";

import { Box, HStack, VStack } from "@/utils/chakra";
import { useState, useEffect } from "react";
import FlipNumbers from "react-flip-numbers";

interface CountdownTimerProps {
  finalDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  finalDate,
}) => {
  const getTimeRemaining = (endDate: Date) => {
    const total = endDate?.getTime() - new Date().getTime();
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
        {getTimeRemaining(finalDate).days && (
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
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).days > 0
                        ? getTimeRemaining(finalDate).days
                        : 0
                    )
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
            <Box as="p" textStyle={"headline3"}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).hours > 0
                        ? getTimeRemaining(finalDate).hours
                        : 0
                    )
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
            <Box as="p" textStyle={"headline3"}>
              <Box as="p" textStyle="headline3">
                <FlipNumbers
                  height={30}
                  width={22}
                  color="white"
                  //background="black"
                  play
                  perspective={700}
                  numbers={String(
                    formatNumber(
                      getTimeRemaining(finalDate).minutes > 0
                        ? getTimeRemaining(finalDate).minutes
                        : 0
                    )
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
