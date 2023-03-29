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
import { projectType } from '~/types/project';

type projectsPropsType = {
  allProjectsData: {
    data: [projectType];
  };
};

const Projects = (props: projectsPropsType) => {
  const fetchedPropsData = props.allProjectsData.data.map(
    // @ts-ignore
    (element: { industry: string; socials: string }) => ({
      ...element,
      industry: JSON.parse(element.industry),
      socials: JSON.parse(element.socials),
    })
  );

  console.log('get all projects data - ', fetchedPropsData);

  return (
    <main>
      <Container
        maxW="7xl"
        px={{ base: '1.8rem', lg: '2rem' }}
        py={{ base: '4rem', md: '5rem' }}
      >
        <VStack w="full" alignItems={'start'} justifyContent="start">
          <VStack w="full" align={'start'} gap={{ base: '2rem', md: '2rem' }}>
            <VStack align={'start'}>
              <Box as="p" textStyle={{ base: 'headline3', md: 'headline1' }}>
                Discover and Fund Public Goods
              </Box>
              <Box as="p" textStyle={{ base: 'body3', md: 'body2' }}>
                Help fund projects that matter to you and your community
              </Box>
            </VStack>
            <FundingRoundBanner />
            <InputGroup
              rounded="8px"
              h="fit-content"
              background={'#05060F'}
              border="1px solid #1B181A"
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
          <Tabs p="4rem 0rem" variant={'cubik'}>
            <TabList gap={{ base: '0.5rem', md: '1rem' }}>
              <Tab fontSize={{ base: 'md', md: 'lg' }}>Projects</Tab>
              <Tab fontSize={{ base: 'md', md: 'lg' }}>Collections</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProjectsList allProjectsData={props.allProjectsData.data} />
              </TabPanel>
              <TabPanel>
                <ProjectsList allProjectsData={props.allProjectsData.data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </main>
  );
};
export async function getServerSideProps() {
  try {
    const allProjectsData = await getAllProjects();
    // @ts-ignore
    if (!allProjectsData) {
      return {
        notFound: true,
      };
    }
    return {
      props: { allProjectsData },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default Projects;
function getAllProjects() {
  throw new Error('Function not implemented.');
}
