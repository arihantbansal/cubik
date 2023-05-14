import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import VaultHeader from './VaultHeader';

const Vault = ({ projectData }: any) => {
  console.log('project details - ', projectData);
  return (
    <VStack
      alignItems={'start'}
      px={{ base: '16px', sm: '20px', md: '24px' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
    >
      <VaultHeader multiSigAddress={projectData.mutliSigAddress as string} />
      <Box height="1px" width="full" background={'neutral.3'} />
      <Tabs variant={'cubik'}>
        <TabList>
          <Tab>Tokens</Tab>
          <Tab>Transactions</Tab>
          <Tab>Contributors</Tab>
        </TabList>
        <TabPanels p={{ base: '1rem', md: '0rem' }}>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <Container maxW={'full'} p="0"></Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Vault;
