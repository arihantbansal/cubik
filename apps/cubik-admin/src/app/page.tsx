import { Metadata } from "next";
import { Button, Text } from "@cubik/ui";
import Image from "next/image";
import {
  Box,
  Center,
  HStack,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  Wrap,
} from "@/utils/chakra";
import LineChart from "@/components/Graphs/LineChart";
import { isFuture, isPast } from "date-fns";
import { EventStatus } from "@/components/EventStatus";
import { CountdownTimer } from "@/components/CountdownTimer";
import HackathonSponsorsView from "@/components/Hackathon/Sponsors/SponsorsView";

export const metadata: Metadata = {
  title: "Cubik - Dashboard",
};

const generateFakeData = (dates: Date[]): [number, number][] => {
  return dates.map((date) => {
    return [date.getTime(), Math.round(Math.random() * 100)];
  });
};

const generateDateRange = (start: Date, end: Date): Date[] => {
  let currentDate = new Date(start);
  const dates = [];

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dates;
};

const last7Days = generateDateRange(
  new Date(new Date().setDate(new Date().getDate() - 7)),
  new Date()
);
const fakeData = generateFakeData(last7Days);
const fakeData2 = generateFakeData(last7Days);

const GrantAdminDashboardOverview = ({
  roundEndingDate,
  roundStartingDate,
}: {
  roundEndingDate: Date | undefined;
  roundStartingDate: Date | undefined;
}) => {
  const today = new Date();
  return (
    <HStack
      w={"full"}
      maxW={{ base: "88vw", sm: "full", md: "full" }}
      minW="12rem"
      overflow="hidden"
    >
      <VStack p="24px" mb="18px" align="center" mx="auto" gap="1rem">
        <EventStatus
          startDate={roundStartingDate}
          endDate={roundEndingDate}
          show={true}
        />
        <CountdownTimer
          finalDate={
            isPast(roundEndingDate as Date)
              ? today
              : isFuture(roundStartingDate as Date)
              ? (roundStartingDate as Date)
              : (roundEndingDate as Date)
          }
        />
      </VStack>
    </HStack>
  );
};

export default function Home() {
  return (
    <VStack
      zIndex={1}
      gap={{ base: "48px", sm: "64px", md: "80px" }}
      align="start"
      w="full"
      maxW="8xl"
    >
      <VStack
        w={{ base: "full", md: "fit-content" }}
        gap={["8px", "12px", "16px"]}
        align="start"
      >
        <HStack gap={["2px", "4px", "6px"]}>
          <Center
            width={{ base: "18px", sm: "22px", md: "22px" }}
            height={{ base: "18px", sm: "22px", md: "22px" }}
            position="relative"
            right="auto"
            bottom="auto"
          >
            <Image
              src="/icons/code.svg"
              alt="Solana"
              width={"100"}
              height={"100"}
            />
          </Center>
          <Box
            color="white"
            as="p"
            fontWeight={"700"}
            textStyle={{ base: "title3", sm: "title2", md: "title2" }}
          >
            Hackathon Overview
          </Box>
        </HStack>
        <HStack
          flexWrap={"wrap"}
          bg="#080808"
          p={{ base: "24px", md: "36px" }}
          pr={{ base: "24px", md: "80px" }}
          w="full"
          gap={{ base: "24px", sm: "36px", md: "48px" }}
          alignItems="flex-start"
          rounded={"12px"}
          border="1px solid"
          borderColor="#141414"
        >
          <VStack h="full" align="start" spacing={["4px", "6px", "8px"]}>
            <Box
              color="white"
              as="p"
              fontWeight={"800"}
              textStyle={{ base: "title1", md: "display5" }}
            >
              136
            </Box>
            <Box
              color="#ADB8B6"
              as="p"
              textStyle={{ base: "body6", md: "body5" }}
            >
              Projects Submitted
            </Box>
          </VStack>
          <VStack h="full" align="start" spacing={["4px", "6px", "8px"]}>
            <Box
              color="white"
              as="p"
              fontWeight={"800"}
              textStyle={{ base: "title1", md: "display5" }}
            >
              240
            </Box>
            <Box
              color="#ADB8B6"
              as="p"
              textStyle={{ base: "body6", md: "body5" }}
            >
              Hackers
            </Box>
          </VStack>
          <VStack h="full" align="start" spacing={["4px", "6px", "8px"]}>
            <Box
              color="white"
              as="p"
              fontWeight={"800"}
              textStyle={{ base: "title1", md: "display5" }}
            >
              412
            </Box>
            <Box
              color="#ADB8B6"
              as="p"
              textStyle={{ base: "body6", md: "body5" }}
            >
              Project Tracks
            </Box>
          </VStack>
        </HStack>
      </VStack>
      <VStack w="full" gap={["8px", "12px", "16px"]} align="start">
        <HStack gap={["2px", "4px", "6px"]}>
          <Center
            width={{ base: "18px", sm: "22px", md: "22px" }}
            height={{ base: "18px", sm: "22px", md: "22px" }}
            position="relative"
            right="auto"
            bottom="auto"
          >
            <Image
              src="/icons/line.svg"
              alt="Solana"
              width={"100"}
              height={"100"}
            />
          </Center>
          <Box
            color="white"
            as="p"
            fontWeight={"700"}
            textStyle={{ base: "title3", sm: "title2", md: "title2" }}
          >
            Voting Overview
          </Box>
        </HStack>
        <Wrap
          spacing="16px"
          alignItems="stretch"
          w="100%"
          justify={"space-between"}
          flexDirection={"row"}
        >
          <HStack
            w="full"
            maxW="25rem"
            bg="#080808"
            p={["24px", "28px", "36px"]}
            gap={["24px", "28px", "36px"]}
            rounded={"12px"}
            border="1px solid"
            borderColor="#141414"
          >
            <VStack w="full" align="start" gap={["16px", "20px", "24px"]}>
              <HStack w="full" justify="space-between">
                <Box
                  color="#ADB8B6"
                  as="p"
                  fontWeight={"600"}
                  textStyle={{ base: "title6", md: "title5" }}
                >
                  Contributions
                </Box>
                <Center
                  width={{ base: "16px", md: "22px" }}
                  position="relative"
                  right="auto"
                  bottom="auto"
                >
                  <Image
                    src="/icons/vertical.svg"
                    alt="Solana"
                    width={"100"}
                    height={"100"}
                  />
                </Center>
              </HStack>
              <HStack justify={"space-between"} w="full" align="flex-end">
                <VStack
                  align="start"
                  spacing={["4px", "6px", "8px"]}
                  py={{ base: "24px", md: "16px" }}
                >
                  <Box
                    color="white"
                    as="p"
                    fontWeight="700"
                    textStyle={{ base: "title1", md: "display5" }}
                  >
                    $136
                  </Box>
                  <HStack>
                    <Box
                      color="#39B70D"
                      as="p"
                      textStyle={{ base: "title5", md: "title4" }}
                    >
                      0 %
                    </Box>
                  </HStack>
                </VStack>
                <Center width="200px">
                  <LineChart
                    data={fakeData}
                    color="#39B70D"
                    key="contributors"
                  />
                </Center>
              </HStack>{" "}
            </VStack>
          </HStack>
          <HStack
            w="full"
            maxW="25rem"
            bg="#080808"
            p={["24px", "28px", "36px"]}
            gap={["24px", "28px", "36px"]}
            rounded={"12px"}
            border="1px solid"
            borderColor="#141414"
          >
            <VStack w="full" align="start" gap={["16px", "20px", "24px"]}>
              <HStack w="full" justify="space-between">
                <Box
                  color="#ADB8B6"
                  as="p"
                  fontWeight={"600"}
                  textStyle={{ base: "title6", md: "title5" }}
                >
                  Voters
                </Box>
                <Center
                  width={{ base: "16px", md: "22px" }}
                  position="relative"
                  right="auto"
                  bottom="auto"
                >
                  <Image
                    src="/icons/vertical.svg"
                    alt="Solana"
                    width={"100"}
                    height={"100"}
                  />
                </Center>
              </HStack>
              <HStack justify={"space-between"} w="full" align="flex-end">
                <VStack
                  align="start"
                  spacing={["4px", "6px", "8px"]}
                  py={{ base: "24px", md: "16px" }}
                >
                  <Box
                    color="white"
                    as="p"
                    fontWeight="700"
                    textStyle={{ base: "title1", md: "display5" }}
                  >
                    0
                  </Box>
                  <HStack>
                    <Box
                      color="#FFD600"
                      as="p"
                      textStyle={{ base: "title5", md: "title4" }}
                    >
                      0 %
                    </Box>
                  </HStack>
                </VStack>
                <Center width="200px">
                  <LineChart data={fakeData2} color="#FFD600" key="votes" />
                </Center>
              </HStack>{" "}
            </VStack>
          </HStack>
          <Center
            w="full"
            maxW="25rem"
            bg="#080808"
            rounded={"12px"}
            border="1px solid"
            borderColor="#141414"
          >
            <GrantAdminDashboardOverview
              roundEndingDate={new Date(2023, 9, 2)}
              roundStartingDate={new Date(2023, 0, 1)}
            />
          </Center>
        </Wrap>
      </VStack>
      <VStack w="full" gap={["8px", "12px", "16px"]} align="start">
        <HStack gap={["2px", "4px", "6px"]}>
          <Center
            width={{ base: "18px", sm: "22px", md: "22px" }}
            height={{ base: "18px", sm: "22px", md: "22px" }}
            position="relative"
            right="auto"
            bottom="auto"
          >
            <Image
              src="/icons/user/2.svg"
              alt="Solana"
              width={"100"}
              height={"100"}
            />
          </Center>
          <Box
            color="white"
            as="p"
            fontWeight={"700"}
            textStyle={{ base: "title3", sm: "title2", md: "title2" }}
          >
            Hackathon Participants
          </Box>
        </HStack>
        <Tabs w="full" variant="unstyled" position={"relative"}>
          <HStack pb="1rem" w="full" justify="space-between">
            <TabList
              gap={{ base: "4px", sm: "8px", md: "14px" }}
              border="1px solid"
              borderColor="#212121"
              bg="#080808"
              p="4px"
              rounded="full"
            >
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
              >
                <Box
                  color-="white"
                  as="p"
                  textStyle={{ base: "title6", md: "title4" }}
                >
                  Sponsors
                </Box>
              </Tab>
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
                disabled
              >
                <Box
                  color-="white"
                  as="p"
                  textStyle={{ base: "title6", md: "title4" }}
                >
                  Projects
                </Box>
              </Tab>
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
                isDisabled
              >
                <Box
                  color-="white"
                  as="p"
                  textStyle={{ base: "title6", md: "title4" }}
                >
                  Contributors
                </Box>
              </Tab>
            </TabList>
          </HStack>
          <TabIndicator
            zIndex={"0"}
            position={"absolute"}
            top="0"
            borderColor="neutral.4"
            bg="#212121"
            rounded="full"
            h={{ base: "2.1rem", md: "2.5rem" }}
            mt="4px"
          />
          <TabPanels px="0" py={{ base: "12px", md: "16px" }}>
            <TabPanel p="0">
              <HackathonSponsorsView />
            </TabPanel>
            <TabPanel p="0"></TabPanel>
            <TabPanel p="0"></TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </VStack>
  );
}
