import type { Metadata } from 'next';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@/utils/chakra';

import ContributionPage from './components/contributions/contributionTab';
import { ProjectsTab } from './components/projects/ProjectsTab';
import { UserDetails } from './components/user/UserDetails';
import { UserProof } from './components/user/userProof';

interface Props {
  params: { username: string };
}
export const metadata: Metadata = {
  title: 'User - Cubik',
  description: 'Browse user and support there projects',
  openGraph: {
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
  twitter: {
    title: 'Cubik',
    card: 'summary_large_image',
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
};
const Details = ({ params: { username } }: Props) => {
  return (
    <>
      <Tabs variant={'cubik'} isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={'0'}>
          <TabPanel p="0">
            <Flex maxW={'full'} p="0" flexDir="column" gap="40px">
              <UserDetails username={username} />
              <UserProof username={username} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              <ProjectsTab username={username} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <ContributionPage username={username} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Details;
