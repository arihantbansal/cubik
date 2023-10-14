import {
  Center,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Avatar,
  VStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
} from "@chakra-ui/react";
import HackathonInteractions from "./HackathonInteractions";
import { ProjectsDetailedDescription } from "../../projects/project-details/ProjectDetailedDescription";
import { Team, UserModel } from "@cubik/database";
import {
  HackathonHost,
  HackathonSchedule as HackathonScheduleType,
  HackathonSocial,
  HackathonSponsor,
  HackathonTracks,
} from "~/types/hackathon";
import HackathonSchedule from "./HackathonSchedule";
import { CgExternal } from "react-icons/cg";

const HackathonBody = ({
  isLoading,
  description,
  host,
  prize_pool,
  timeline,
  social,
  team,
  hackathonId,
  tracks,
}: {
  isLoading: boolean;
  description?: string;
  prize_pool?: number;
  tracks: HackathonTracks[];
  host?: HackathonHost[];
  timeline?: HackathonScheduleType;
  social?: HackathonSocial[];
  team: (Team & {
    user: UserModel;
  })[];
  hackathonId: string;
}) => {
  // get all the sponsors array with name and logo from sponsor array
  const sponsors = tracks?.map((track) => track.sponsor).flat();
  return (
    <Container p="0px" maxW="full">
      <Stack
        gap={{ base: "12px", md: "24px", lg: "8rem" }}
        w="full"
        alignItems="top"
        direction={{ base: "column-reverse", lg: "row" }}
      >
        <Center w="full" flex={3.5}>
          <Tabs variant={"cubik"} alignSelf={"start"} w="full">
            <TabList
              overflowY={{ base: "hidden", md: "inherit" }}
              overflowX={{ base: "scroll", md: "inherit" }}
              gap={{ base: "24px", md: "32px" }}
            >
              <Tab>Details</Tab>
              <Tab>Schedule</Tab>
              <Tab>Tracks</Tab>
            </TabList>
            <TabPanels p="0 !important">
              <TabPanel>
                <ProjectsDetailedDescription
                  isLoading={isLoading}
                  description={description}
                />
              </TabPanel>
              <TabPanel>
                <HackathonSchedule
                  isLoading={isLoading}
                  timeline={timeline as HackathonScheduleType}
                />
              </TabPanel>
              <TabPanel p="0 !important" overflowX="scroll">
                <Accordion
                  m="0"
                  border="none"
                  gap="1rem"
                  width="full"
                  allowToggle
                >
                  {tracks &&
                    tracks?.map((track) => (
                      <>
                        <AccordionItem
                          id={track.name}
                          my="32px"
                          rounded="16px"
                          border="1px solid"
                          borderColor="neutral.3"
                          backgroundColor="neutral.2"
                        >
                          <AccordionButton
                            p="24px"
                            rounded="16px"
                            backgroundColor="neutral.2"
                            _hover={{
                              bg: "neutral.2",
                            }}
                          >
                            <HStack gap={"16px"} w="full">
                              {track.sponsor.map((track_sponsor) => (
                                <Avatar
                                  size="lg"
                                  borderRadius="12px"
                                  src={track_sponsor.logo}
                                />
                              ))}
                              <VStack color="neutral.11" align="start">
                                <Box
                                  as="p"
                                  textStyle={"title2"}
                                  textAlign="left"
                                >
                                  {track.name}
                                </Box>
                                <Box
                                  as="p"
                                  textStyle={"body4"}
                                  textAlign="left"
                                  noOfLines={1}
                                  maxW={"80%"}
                                >
                                  {track.description}
                                </Box>
                                {/* <HStack
                                  bg="#ffffff08"
                                  rounded="8px"
                                  shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                                  outline="1px solid #ffffff16"
                                  p={{
                                    base: '8px',
                                    md: '12px 24px',
                                  }}
                                  align={'flex-end'}
                                  gap="8px"
                                >
                                  <Box
                                    color="#B4B0B2"
                                    textTransform={'uppercase'}
                                    as="p"
                                    textStyle={{
                                      base: 'body6',
                                      md: 'overline3',
                                    }}
                                  >
                                    Prize
                                  </Box>
                                  <Box
                                    as="p"
                                    textTransform="uppercase"
                                    color="neutral.11"
                                    textStyle={{ base: 'body6', md: 'title5' }}
                                  >
                                    {track.trackPrizes.reduce(
                                      (acc, curr) => acc + curr.amount,
                                      0
                                    )}{' '}
                                    USDC
                                  </Box>
                                </HStack> */}
                              </VStack>
                              <Center
                                ml="auto"
                                p="4px"
                                bg="neutral.4"
                                rounded="full"
                              >
                                <AccordionIcon />
                              </Center>
                            </HStack>
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack
                              color="white"
                              align="start"
                              gap="18px"
                              p="12px"
                            >
                              <Box
                                pb="4px"
                                as="p"
                                textStyle={"title1"}
                                textAlign="left"
                              >
                                {track.prizeWorth} {track.prizeUnit}
                              </Box>
                              <Box as="p" textStyle={"body4"} textAlign="left">
                                {track.description}
                              </Box>
                              <HStack gap="8px">
                                {track.links.map((link) => (
                                  <Tag
                                    as="a"
                                    cursor={"pointer"}
                                    href={link.link}
                                    target="_blank"
                                    p="8px 12px"
                                  >
                                    <TagLabel fontWeight="700">
                                      {link.title}
                                    </TagLabel>
                                    <TagRightIcon
                                      boxSize="12px"
                                      as={CgExternal}
                                    />
                                  </Tag>
                                ))}
                              </HStack>
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      </>
                    ))}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
        <Center w="full" h="full" flex={1.5}>
          <HackathonInteractions
            hackathonId={hackathonId as string}
            prizePool={prize_pool?.toLocaleString() ?? "0"}
            isLoading={isLoading}
            team={team}
            sponsors={sponsors}
          />
        </Center>
      </Stack>
    </Container>
  );
};

export default HackathonBody;
