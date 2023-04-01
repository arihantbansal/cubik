import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { UserWithProjectType } from '~/types/user';
import UserDetails from './details-tab/UserDetails';
import ProfileHeader from './ProfileHeader';
import ProjectAdminCard from './projects-tab/ProjectAdminCard';
import { AdminViewSkeleton } from './skeletons/ProfileViewSkeletons';

type adminViewType = {
  user: UserWithProjectType;
  isLoading: boolean;
};

const AdminView = ({ user, isLoading }: adminViewType) => {
  const { hasError, ErrorBoundaryWrapper } = useErrorBoundary();

  if (hasError) {
    return <p>Custom error message or fallback UI</p>;
  }

  if (isLoading) return <AdminViewSkeleton />;

  return (
    <ErrorBoundaryWrapper>
      <Flex w={'full'} flexDir={'column'} gap="48px" my="8rem">
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
              <Container
                maxW={'full'}
                p="0"
                display={'flex'}
                flexDir="column"
                gap="32px"
              >
                {user.project.map((project, key) => (
                  <ProjectAdminCard project={project} key={key} />
                ))}
              </Container>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ErrorBoundaryWrapper>
  );
};

export default AdminView;
