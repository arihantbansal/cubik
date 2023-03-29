import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Discussions from './ProjectDiscussion';

export const ProjectsTabs = () => {
  return (
    <Tabs variant={'cubik'} alignSelf={'start'} w="full">
      <TabList gap={{ base: '0.5rem', md: '1rem' }}>
        <Tab fontSize={{ base: 'sm', md: 'md' }}>Discussion</Tab>
        {/* <Tab fontSize={{ base: 'sm', md: 'md' }}>Cohorts</Tab> */}
        <Tab fontSize={{ base: 'sm', md: 'md' }}>Contributors</Tab>
      </TabList>
      <TabPanels p={{ base: '1rem', md: '0rem' }}>
        <TabPanel>
          <Discussions />
        </TabPanel>
        {/* <TabPanel>Cohorts</TabPanel> */}
        <TabPanel>Contributors</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
