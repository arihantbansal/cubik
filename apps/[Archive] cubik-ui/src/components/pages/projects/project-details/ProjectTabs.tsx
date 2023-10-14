import { Box, Stack, VStack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Contribution, ProjectsModel, Team, UserModel } from "@cubik/database";
import { formateDateInMonths } from "~/utils/formatDates";
import { ProjectsDetailedDescription } from "./ProjectDetailedDescription";
import Discussions from "./ProjectDiscussion";
import { ProjectDiscussion } from "./discussion/ProjectDiscussion";
import ProjectContributors from "./project-interactions/project-tabs/ProjectContributors";
import { Button, Center } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";

export const ProjectsTabs = ({
  projectDetails,
  isLoading,
  roundId,
  ownerName,
  isHackathon = false,
}: {
  projectDetails:
    | (ProjectsModel & {
        Team: (Team & {
          user: UserModel;
        })[];
        Contribution: (Contribution & {
          user: UserModel;
        })[];
        owner: UserModel;
      })
    | undefined;
  ownerName: string;
  roundId: string;
  isLoading: boolean;
  isHackathon?: boolean;
}) => {
  // get the project id from the url using window object
  return (
    <Tabs variant={"cubik"} alignSelf={"start"} w="full">
      <TabList
        overflowY={{ base: "hidden", md: "inherit" }}
        overflowX={{ base: "scroll", md: "inherit" }}
        gap={{ base: "24px", md: "32px" }}
      >
        <Tab>Details</Tab>
        <Tab>Contributors</Tab>
        <Tab>Discussion</Tab>
        <Tab isDisabled>Updates</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel>
          <VStack w="full" align="start" gap="1rem">
            <VStack gap="12px" overflow="hidden" align={"start"}>
              <ProjectsDetailedDescription
                isLoading={isLoading}
                description={projectDetails?.long_description}
              />
            </VStack>
            {projectDetails && (
              <Stack direction={{ base: "row", md: "row" }}>
                <Skeleton
                  isLoaded={!isLoading}
                  fadeDuration={2.5}
                  opacity={isLoading ? "0.1" : "1"}
                >
                  <Box as="p" textStyle="body4" color="neutral.7">
                    Project Created:{" "}
                    {formateDateInMonths(
                      projectDetails?.createdAt ?? Date.now()
                    )}
                    {""} by @{ownerName}
                  </Box>
                </Skeleton>
              </Stack>
            )}
          </VStack>
        </TabPanel>
        <TabPanel overflowX="scroll">
          {projectDetails?.id && (
            <ProjectContributors
              isHackathon={true}
              roundId={roundId}
              projectId={projectDetails?.id}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel>
          {isLoading ? (
            <></>
          ) : (
            <ProjectDiscussion
              ownerName={ownerName}
              projectId={projectDetails?.id as string}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
