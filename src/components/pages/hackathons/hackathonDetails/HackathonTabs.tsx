import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const HackathonTabs = () => {
  return (
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
        <TabPanel></TabPanel>
        <TabPanel overflowX="scroll"></TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HackathonTabs;
