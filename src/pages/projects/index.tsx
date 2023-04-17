import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import ExplorePageHeader from '~/components/pages/projects/ExplorePageHeader';
import ProjectsList from '~/components/pages/projects/ProjectsList';
import ProjectListLoadingSkeleton from '~/components/pages/projects/skeletons/ProjectListLoadingSkeleton';

import { trpc } from '~/utils/trpc';

type projectsPropsType = {
  allProjectsData: {
    data: any;
  };
};

const Projects = (_props: projectsPropsType) => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();

  return (
    <main>
      <Container
        px={{ base: '1.5rem', sm: '2rem', md: '2rem', xl: '0px' }}
        maxW="7xl"
        py={{ base: '2rem', md: '3rem' }}
      >
        <VStack w="full" alignItems={'start'} justifyContent="start" gap="2rem">
          <ExplorePageHeader />
          <Tabs variant={'cubik'} w="full">
            <TabList>
              <Tab>Projects</Tab>
              <Tab>Collections</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {isLoading || !projects ? (
                  <ProjectListLoadingSkeleton />
                ) : (
                  <ProjectsList allProjectsData={projects} />
                )}
              </TabPanel>
              <TabPanel>
                {isLoading || !projects ? (
                  ''
                ) : (
                  <ProjectsList allProjectsData={projects} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </main>
  );
};
export default Projects;
