import {
  Box,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import ExplorePageHeader from "./header/ExplorePageHeader";
import { ProjectExploreBanner, ProjectExplorerType } from "@cubik/common-types";
import ProjectsList from "./body/ProjectsList";
import { ProjectLeaderboard } from "./ProjectLeaderboard";
type PropsType = {
  banner: ProjectExploreBanner[];
  projects: ProjectExplorerType[];
};

const ProjectsExplorer = ({ projects, banner }: PropsType) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const finalProjects = projects;

  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        alignItems={"start"}
        justifyContent="start"
        gap={{ base: "28px", md: "40px" }}
      >
        <ExplorePageHeader banner={banner} />
        <Tabs w="full" variant="unstyled" position={"relative"}>
          <HStack pb="1rem" w="full" justify="space-between">
            <Box
              color="neutral.11"
              as="p"
              textStyle={{ base: "title2", md: "title1" }}
            >
              Projects
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
                  Projects
                </Box>
              </Tab>
              <Tab
                zIndex="1"
                color="neutral.7"
                _selected={{ color: "neutral.10" }}
              >
                <Box as="p" textStyle={{ base: "title6", md: "title4" }}>
                  Leaderboard
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
          <TabPanels w="full" px="0" py={{ base: "12px", md: "16px" }}>
            <TabPanel w="full" flexWrap={"wrap"} p="0">
              <ProjectsList explorerProjects={shuffle(finalProjects)} />
            </TabPanel>
            <TabPanel>
              <ProjectLeaderboard explorerProjects={projects} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default ProjectsExplorer;
