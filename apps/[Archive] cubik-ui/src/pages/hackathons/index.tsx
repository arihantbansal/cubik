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
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import RoundStatus from "~/components/common/dates/Status";
import { formatNumberWithK } from "~/utils/formatWithK";
import { trpc } from "~/utils/trpc";
import Image from "next/image";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import EmptyStateHOC from "~/components/HOC/EmptyState";
import HackathonStatus from "~/components/pages/hackathons/HackathonStatus";
import { HackathonSchedule } from "~/types/hackathon";

const HackathonsPage = () => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const {
    data: upcomingHackathons,
    isLoading: upcomingHackathonsIsLoading,
    isError: upcomingHackathonsIsError,
    error: upcomingHackathonsError,
  } = trpc.hackathon.getAll.useQuery();

  return (
    <Container maxW="7xl" py={{ base: "48px", md: "64px" }}>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap="40px"
        w="full"
        align="start"
        justify="space-between"
        pb={{ base: "32px", md: "48px" }}
        position={"relative"}
        _after={{
          content: '""',
          zIndex: "0",
          position: "absolute",
          top: "-100%",
          right: { base: "20%", md: "5%" },
          transform: "translate(0%,0%) scale(12)",
          width: "2vw",
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
          top: "-100%",
          right: { base: "20%", md: "0%" },
          transform: {
            base: "translate(0%,0%) scale(8)",
            md: "translate(0%,0%) scale(16)",
          },
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
        <VStack align={"start"} gap="8px">
          <Box
            color="neutral.11"
            as="p"
            textStyle={{ base: "display5", md: "display3" }}
          >
            Solana Ecosystem Hackathons
          </Box>{" "}
          <Box
            color="neutral.9"
            as="p"
            textStyle={{ base: "body4", md: "body3" }}
          >
            Participate in community run Hackathons and build the next big thing
            on Solana
          </Box>
        </VStack>
      </Stack>
      <VStack
        py={{ base: "32px", md: "64px" }}
        w="full"
        align="start"
        spacing="32px"
      >
        <Tabs w="full" variant="unstyled" position={"relative"}>
          <HStack pb="1rem" w="full" justify="space-between">
            <Box
              color="neutral.11"
              as="p"
              textStyle={{ base: "title2", md: "title1" }}
            >
              Hackathons
            </Box>
            <TabList
              gap={{ base: "8px", md: "14px" }}
              border="1px solid"
              borderColor="neutral.4"
              bg="neutral.3"
              p="4px"
              rounded="12px"
            >
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
              >
                <Box as="p" textStyle={{ base: "title6", md: "title4" }}>
                  Upcoming
                </Box>
              </Tab>
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
              >
                <Box as="p" textStyle={{ base: "title6", md: "title4" }}>
                  Past
                </Box>
              </Tab>
            </TabList>
          </HStack>
          <TabIndicator
            zIndex={"0"}
            position={"absolute"}
            top="0"
            borderColor="neutral.4"
            bg="neutral.4"
            rounded="10px"
            h={{ base: "2.1rem", md: "2.5rem" }}
            mt="4px"
          />
          <TabPanels px="0" py={{ base: "12px", md: "16px" }}>
            <TabPanel p="0">
              {upcomingHackathonsIsLoading ? (
                [0, 1, 2].map((index) => (
                  <HStack
                    key={index}
                    border="2px solid"
                    borderColor="#ffffff10"
                    backgroundColor="#000000"
                    p={{ base: "16px", md: "32px" }}
                    w="full"
                    gap="24px"
                    rounded="16px"
                    justify={"space-between"}
                    align="center"
                    direction={{ base: "column", md: "row" }}
                  >
                    <VStack align={"start"} width="full" spacing="24px">
                      <VStack align="start" width="full" spacing="12px">
                        <Skeleton height="2rem" width="10rem" />
                        <SkeletonText
                          noOfLines={2}
                          skeletonHeight={2}
                          width={"full"}
                        />
                      </VStack>
                      <Skeleton py="24px" height="1rem" width="18rem" />
                    </VStack>{" "}
                  </HStack>
                ))
              ) : (
                <VStack
                  align="start"
                  w="full"
                  gap={{ base: "8px", md: "18px" }}
                >
                  <ErrorBoundaryWrapper>
                    {upcomingHackathons?.map((hackathon) => (
                      <Link
                        key={hackathon.id}
                        style={{
                          width: "100%",
                        }}
                        href={"/hackathons/" + hackathon.slug}
                      >
                        <LinkBox
                          display={"flex"}
                          flexDirection={{ base: "column", md: "row" }}
                          alignItems={{ base: "start", md: "center" }}
                          justifyContent="space-between"
                          key={hackathon.id}
                          border={"1px solid"}
                          borderColor="#ffffff10"
                          transition="all 0.3s ease-in-out"
                          _hover={{
                            borderColor: "#ffffff10",
                            transform: "translateY(-2px)",
                            transition: "transform 0.3s ease-in-out",
                            shadow: "2xl",
                          }}
                          backgroundColor="#080808"
                          p={"0"}
                          w="full"
                          rounded="20px"
                          position="relative"
                          overflow={"hidden"}
                          textAlign={"start"}
                        >
                          <HStack
                            position={"relative"}
                            align="start"
                            w="full"
                            spacing={{ base: "32px", md: "24px" }}
                          >
                            {/* hackathon image */}
                            <Center
                              position={"absolute"}
                              w="40rem"
                              top="0%"
                              h="full"
                              right="0%"
                              //  transform="translate(-50%, 0%)"
                            >
                              <Center
                                zIndex={"0"}
                                alignItems={"end"}
                                w="40rem"
                                h={"14rem"}
                                position={"relative"}
                                overflow={"hidden"}
                                _before={{
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  height: "14rem",
                                  w: "40rem",
                                  background:
                                    "linear-gradient(90deg, #080808 0%, #08080800 100%)",
                                  zIndex: 1,
                                }}
                              >
                                <Image
                                  src={hackathon.background}
                                  alt={"hackathon"}
                                  fill
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              </Center>
                            </Center>
                            <HStack
                              w="full"
                              gap={{ base: "14px", md: "18px" }}
                              align={"start"}
                              zIndex={"1"}
                              p="28px"
                            >
                              {/* hackathon avatar */}
                              {/* <SkeletonCircle
                                isLoaded={!upcomingHackathonsIsLoading}
                                fadeDuration={2}
                                opacity={
                                  upcomingHackathonsIsLoading ? '0.6' : '1'
                                }
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
                              </SkeletonCircle> */}
                              {/* hackathon content */}
                              <VStack
                                zIndex="3"
                                align="start"
                                w="full"
                                spacing={{ base: "32px", md: "32px" }}
                              >
                                <VStack
                                  align="start"
                                  w="full"
                                  spacing={{ base: "12px", md: "12px" }}
                                >
                                  <HStack
                                    w="full"
                                    gap="8px"
                                    align={"flex-end"}
                                    justify={"start"}
                                  >
                                    <Box
                                      color="neutral.11"
                                      as="p"
                                      noOfLines={1}
                                      textStyle={{
                                        base: "title3",
                                        md: "title1",
                                      }}
                                      textTransform={"capitalize"}
                                    >
                                      {hackathon.name}
                                    </Box>
                                    <HackathonStatus
                                      show={true}
                                      timeline={
                                        hackathon.timeline as unknown as HackathonSchedule
                                      }
                                    />
                                  </HStack>
                                  <Box
                                    as="p"
                                    noOfLines={2}
                                    maxW="38rem"
                                    textStyle={{ base: "body5", md: "body4" }}
                                    color="neutral.9"
                                  >
                                    {hackathon.short_description}
                                  </Box>
                                </VStack>
                                <HStack
                                  bg="#ffffff08"
                                  rounded="full"
                                  shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                                  outline="1px solid #ffffff16"
                                  p={{
                                    base: "0.6rem 1.2rem",
                                    md: "0.8rem 1.5rem",
                                  }}
                                >
                                  <Box
                                    color="#B4B0B2"
                                    textTransform={"uppercase"}
                                    as="p"
                                    textStyle={{
                                      base: "body6",
                                      md: "overline3",
                                    }}
                                  >
                                    Matching Pool
                                  </Box>
                                  <Box
                                    as="p"
                                    textTransform="uppercase"
                                    color="neutral.11"
                                    textStyle={{ base: "body5", md: "title4" }}
                                  >
                                    {formatNumberWithK(hackathon.prize_pool)}{" "}
                                    USDC
                                  </Box>
                                </HStack>
                              </VStack>
                            </HStack>
                          </HStack>
                        </LinkBox>
                      </Link>
                    ))}
                  </ErrorBoundaryWrapper>
                </VStack>
              )}
            </TabPanel>
            <TabPanel p="0">
              {" "}
              <Center
                w="full"
                border="1px dashed"
                borderColor={"neutral.6"}
                rounded="12px"
                flexDir={"column"}
              >
                <EmptyStateHOC
                  heading={"No Previous Hackathons to View"}
                  subHeading={"There is no data to view here"}
                />
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default HackathonsPage;
