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
          <VStack w="full" align={'start'} gap={{ base: '2rem', md: '2rem' }}>
            <VStack align={'start'}>
              <Box
                color="neutral.11"
                as="p"
                textStyle={{ base: 'headline3', md: 'headline1' }}
              >
                Discover and Fund Public Goods
              </Box>
              <Box
                color="neutral.9"
                as="p"
                textStyle={{ base: 'body3', md: 'body2' }}
              >
                Help fund projects that matter to you and your community
              </Box>
            </VStack>
            <FundingRoundBanner />
            <InputGroup
              rounded="8px"
              h="fit-content"
              background={'#0F0F0F'}
              border="1px solid #1B181A"
              w={'36%'}
              zIndex="1"
            >
              <InputLeftElement
                w="3.5rem"
                h="full"
                pointerEvents="none"
                bg="transparent"
              >
                <BiSearch size="1.4rem" color="#757575" />
              </InputLeftElement>
              <Input
                variant={'unstyled'}
                pl="3rem"
                fontSize={'md'}
                background="#05060F"
                bg="transparent"
                placeholder="Search For Projects, Categories..."
                _placeholder={{
                  fontcolor: '#757575',
                  fontSize: 'md',
                  opacity: '0.4',
                  fontWeight: '500',
                }}
                h="2.5rem"
                pb={'3px'}
              />
            </InputGroup>
          </VStack>
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
