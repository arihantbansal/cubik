import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import ExplorePageHeader from '~/components/pages/projects/ExplorePageHeader';
import FundingRoundBanner from '~/components/pages/projects/FundingRoundBanner';
import ProjectsList from '~/components/pages/projects/ProjectsList';

import { trpc } from '~/utils/trpc';

type projectsPropsType = {
  allProjectsData: {
    data: any;
  };
};

const Projects = (props: projectsPropsType) => {
  const projects = trpc.project.findMany.useQuery();

  return (
    <main>
      <Container maxW="7xl" py={{ base: '4rem', md: '8rem' }}>
        <VStack w="full" alignItems={'start'} justifyContent="start" gap="2rem">
          <ExplorePageHeader />
          <Tabs variant={'cubik'}>
            <TabList>
              <Tab>Projects</Tab>
              <Tab>Collections</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProjectsList allProjectsData={projects.data ?? []} />
              </TabPanel>
              <TabPanel>
                <ProjectsList allProjectsData={projects.data ?? []} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </main>
  );
};
export default Projects;
