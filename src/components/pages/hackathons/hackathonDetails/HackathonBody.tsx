import {
  Center,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import HackathonInteractions from './HackathonInteractions';
import { JSONValue } from 'superjson/dist/types';
import HackathonSchedule from './HackathonSchedule';
import { ProjectsDetailedDescription } from '../../projects/project-details/ProjectDetailedDescription';

const HackathonBody = ({
  isLoading,
  description,
  host,
  prize_pool,
  prize,
  timeline,
  social,
}: {
  isLoading: boolean;
  description?: string;
  host?: JSONValue;
  prize_pool?: number;
  prize?: JSONValue;
  timeline?: JSONValue;
  social?: JSONValue;
}) => {
  return (
    <Container p="0px" maxW="full">
      <Stack
        gap={{ base: '12px', md: '24px', lg: '8rem' }}
        w="full"
        alignItems="top"
        direction={{ base: 'column-reverse', lg: 'row' }}
      >
        <Center w="full" flex={3.5}>
          <Tabs variant={'cubik'} alignSelf={'start'} w="full">
            <TabList
              overflowY={{ base: 'hidden', md: 'inherit' }}
              overflowX={{ base: 'scroll', md: 'inherit' }}
              gap={{ base: '24px', md: '32px' }}
            >
              <Tab>Details</Tab>
              <Tab>Prizes</Tab>
              <Tab>Schedule</Tab>
            </TabList>
            <TabPanels p="0">
              <TabPanel>
                <ProjectsDetailedDescription
                  isLoading={isLoading}
                  description={description}
                />
              </TabPanel>
              <TabPanel overflowX="scroll"></TabPanel>
              <TabPanel>
                <HackathonSchedule />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
        <Center w="full" h="full" flex={1.5}>
          <HackathonInteractions isLoading={isLoading} />
        </Center>
      </Stack>
    </Container>
  );
};

export default HackathonBody;
