import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { UserWithProjectType } from '~/types/user';
import UserDetails from './details-tab/UserDetails';
import ProfileHeader from './ProfileHeader';
import ProjectAdminCard from './projects-tab/ProjectAdminCard';
import { VisitorViewSkeleton } from './skeletons/ProfileViewSkeletons';

type visitorViewType = {
  user: UserWithProjectType;
  isLoading: boolean;
};

const VisitorView = ({ user, isLoading }: visitorViewType) => {
  if (isLoading) return <VisitorViewSkeleton />;
  return (
    <Flex flexDir={'column'} gap="48px" my="8rem">
      <ProfileHeader user={user} />
      <Tabs variant={'cubik'}>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={{ base: '1rem', md: '0rem' }}>
          <TabPanel>
            <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
              <UserDetails />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              {user.project.map((project, key) => (
                <ProjectAdminCard project={project} key={key} />
              ))}
            </Flex>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default VisitorView;
