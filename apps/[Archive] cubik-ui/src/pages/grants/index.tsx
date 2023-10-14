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
  TabIndicator,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import EmptyStateHOC from "~/components/HOC/EmptyState";
import RoundStatus from "~/components/common/dates/Status";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { formatNumberWithK } from "~/utils/formatWithK";
import { trpc } from "~/utils/trpc";

// todo make upcoming live grants separate
const RoundPage = () => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const {
    data: upcomingRounds,
    isLoading: upcomingRoundsIsLoading,
    isError: upcomingRoundsIsError,
    error: upcomingRoundsError,
  } = trpc.round.findActive.useQuery();

  const {
    data: pastRounds,
    isLoading: pastRoundsIsLoading,
    isError: pastRoundsIsError,
    error: pastRoundsError,
  } = trpc.round.findPast.useQuery();

  return (
    <Container
      maxW={{ base: "full", md: "7xl" }}
      w="100vw"
      py={{ base: "32px", md: "64px" }}
      px={{ base: "16px" }}
    >
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
        <VStack align={"start"} gap={{ base: "6px", md: "8px" }}>
          <Box
            color="neutral.11"
            as="p"
            textStyle={{ base: "title1", md: "display3" }}
          >
            Quadratic Funding Grants
          </Box>{" "}
          <Box
            color="neutral.9"
            as="p"
            textStyle={{ base: "body5", md: "body3" }}
          >
            Participate in Community driven Grants
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
              Grant Rounds
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
              <ErrorBoundaryWrapper>
                {pastRoundsIsError ? (
                  <VStack w="full" spacing="32px">
                    {[0, 1, 2].map((index) => (
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
                    ))}
                  </VStack>
                ) : (
                  <VStack w="full" spacing="32px">
                    {upcomingRounds?.length ? (
                      upcomingRounds?.map((round) => (
                        <Link
                          key={round.id}
                          style={{
                            width: "100%",
                          }}
                          href={"/grants/" + round.id}
                        >
                          <LinkBox
                            display={"flex"}
                            flexDirection={{ base: "row", md: "row" }}
                            alignItems={{ base: "center", md: "center" }}
                            justifyContent="space-between"
                            border={"1px solid"}
                            borderColor="#ffffff10"
                            transition="all 0.3s ease-in-out"
                            _hover={{
                              borderColor: "#ffffff10",
                              transform: "translateY(-2px)",
                              transition: "transform 0.3s ease-in-out",
                              shadow: "2xl",
                            }}
                            backgroundColor="#000000"
                            p={{ base: "22px 18px", md: "32px 48px" }}
                            w="full"
                            rounded="20px"
                            overflow={"hidden"}
                            textAlign={"start"}
                            position="relative"
                            _after={{
                              content: '""',
                              zIndex: "1",
                              position: "absolute",
                              bottom: "-100%",
                              left: "80%",
                              transform: "translate(0%, -50%)",
                              width: "12rem",
                              height: "12rem",
                              backgroundColor: "#31F579",
                              filter: "blur(180px)",
                              WebkitFilter: "blur(180px)",
                              borderRadius: "full",
                              // on hover
                              _hover: {
                                transform: "translate(0%, -50%) scale(1.5)",
                                transition: "transform 0.5s ease-in-out",
                              },
                            }}
                          >
                            <VStack
                              zIndex="3"
                              align="start"
                              spacing={{ base: "32px", md: "32px" }}
                            >
                              <VStack
                                align="start"
                                w="full"
                                spacing={{ base: "12px", md: "12px" }}
                              >
                                <Stack
                                  direction="row"
                                  alignItems="flex-end"
                                  gap={{ base: "8px", md: "16px" }}
                                >
                                  <Box
                                    color="neutral.11"
                                    as="p"
                                    noOfLines={1}
                                    textStyle={{ base: "title3", md: "title1" }}
                                    textTransform={"capitalize"}
                                  >
                                    {round.roundName}
                                  </Box>
                                  <RoundStatus
                                    show={true}
                                    startDate={round.startTime}
                                    endDate={round.endTime}
                                  />
                                </Stack>
                                <Box
                                  as="p"
                                  noOfLines={2}
                                  maxW="38rem"
                                  textStyle={{ base: "body5", md: "body4" }}
                                  color="neutral.9"
                                >
                                  {round.short_description}
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
                                  textStyle={{ base: "body6", md: "overline3" }}
                                >
                                  Matching Pool
                                </Box>
                                <Box
                                  as="p"
                                  textTransform="uppercase"
                                  color="neutral.11"
                                  textStyle={{ base: "body5", md: "title4" }}
                                >
                                  {formatNumberWithK(round.matchedPool)} USDC
                                </Box>
                              </HStack>
                            </VStack>
                            <Center
                              width={{ base: "100px", md: "112px" }}
                              height={{ base: "100px", md: "112px" }}
                              position={{ base: "absolute", md: "relative" }}
                              right={{ base: "-5%", md: "auto" }}
                              bottom={{ base: "-5%", md: "auto" }}
                              // zIndex={'1'}
                            >
                              <Box
                                width={{ base: "100px", md: "112px" }}
                                height={{ base: "100px", md: "112px" }}
                                position="absolute"
                                top="0"
                                left="0"
                                right="0"
                                bottom="0"
                                zIndex="1"
                                mixBlendMode={"hue"}
                                bg="#071A0F"
                              />
                              <Image
                                src="https://res.cloudinary.com/demonicirfan/image/upload/v1689923669/Mask_group_4_xmxqdg.png"
                                alt="Twitter Logo"
                                width={"300"}
                                height={"300"}
                              />
                            </Center>
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
                        </Link>
                      ))
                    ) : (
                      <Center
                        w="full"
                        border="1px dashed"
                        borderColor={"neutral.6"}
                        rounded="12px"
                        flexDir={"column"}
                      >
                        <EmptyStateHOC
                          heading={"ah, no grant round currently!"}
                          subHeading={
                            "There are no ongoing round and no upcoming rounds right now to view here, check previous grant rounds"
                          }
                        />
                      </Center>
                    )}
                  </VStack>
                )}
              </ErrorBoundaryWrapper>
            </TabPanel>
            <TabPanel p="0">
              <ErrorBoundaryWrapper>
                {pastRoundsIsLoading ? (
                  <VStack w="full" spacing="32px">
                    {[0, 1, 2].map((index) => (
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
                    ))}
                  </VStack>
                ) : (
                  pastRounds && (
                    <VStack w="full" spacing="32px">
                      {pastRounds?.length > 0 ? (
                        pastRounds?.map((round) => (
                          <Link
                            key={round.id}
                            style={{
                              width: "100%",
                            }}
                            href={"/grants/" + round.id}
                          >
                            <LinkBox
                              display={"flex"}
                              flexDirection="row"
                              alignItems={{ base: "center", md: "center" }}
                              justifyContent="space-between"
                              border={"1px solid"}
                              borderColor="#ffffff10"
                              transition="all 0.3s ease-in-out"
                              _hover={{
                                borderColor: "#ffffff10",
                                transform: "translateY(-2px)",
                                transition: "transform 0.3s ease-in-out",
                                shadow: "2xl",
                              }}
                              backgroundColor="#000000"
                              p={{ base: "22px 18px", md: "32px 48px" }}
                              w="full"
                              rounded="20px"
                              overflow={"hidden"}
                              textAlign={"start"}
                              position="relative"
                              _after={{
                                content: '""',
                                zIndex: "1",
                                position: "absolute",
                                bottom: "-100%",
                                left: "80%",
                                transform: "translate(0%, -50%)",
                                width: "12rem",
                                height: "12rem",
                                backgroundColor: "#31F579",
                                filter: "blur(180px)",
                                WebkitFilter: "blur(180px)",
                                borderRadius: "full",
                                // on hover
                                _hover: {
                                  transform: "translate(0%, -50%) scale(1.5)",
                                  transition: "transform 0.5s ease-in-out",
                                },
                              }}
                            >
                              <VStack
                                zIndex="3"
                                align="start"
                                spacing={{ base: "32px", md: "32px" }}
                              >
                                <VStack
                                  align="start"
                                  w="full"
                                  spacing={{ base: "12px", md: "12px" }}
                                >
                                  <Stack
                                    direction={{ base: "row", md: "row" }}
                                    alignItems="flex-end"
                                    gap={{ base: "8px", md: "16px" }}
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
                                      {round.roundName}
                                    </Box>
                                    <RoundStatus
                                      show={true}
                                      startDate={round.startTime}
                                      endDate={round.endTime}
                                    />
                                  </Stack>
                                  <Box
                                    as="p"
                                    noOfLines={2}
                                    maxW="38rem"
                                    textStyle={{ base: "body5", md: "body4" }}
                                    color="neutral.9"
                                  >
                                    {round.short_description}
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
                                    {formatNumberWithK(round.matchedPool)} USDC
                                  </Box>
                                </HStack>
                              </VStack>
                              <Center
                                width={{ base: "100px", md: "112px" }}
                                height={{ base: "100px", md: "112px" }}
                                position={{ base: "absolute", md: "relative" }}
                                right={{ base: "-5%", md: "auto" }}
                                bottom={{ base: "-5%", md: "auto" }}
                                // zIndex={'1'}
                              >
                                <Box
                                  width={{ base: "100px", md: "112px" }}
                                  height={{ base: "100px", md: "112px" }}
                                  position="absolute"
                                  top="0"
                                  left="0"
                                  right="0"
                                  bottom="0"
                                  zIndex="1"
                                  mixBlendMode={"hue"}
                                  bg="#071A0F"
                                />
                                <Image
                                  src="https://res.cloudinary.com/demonicirfan/image/upload/v1689923669/Mask_group_4_xmxqdg.png"
                                  alt="Twitter Logo"
                                  width={"300"}
                                  height={"300"}
                                />
                              </Center>
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
                          </Link>
                        ))
                      ) : (
                        <Center
                          w="full"
                          border="1px dashed"
                          borderColor={"neutral.6"}
                          rounded="12px"
                          flexDir={"column"}
                        >
                          <EmptyStateHOC
                            heading={"No Round History to View"}
                            subHeading={
                              "There are no previous rounds to view here"
                            }
                          />
                        </Center>
                      )}
                    </VStack>
                  )
                )}
              </ErrorBoundaryWrapper>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default RoundPage;
