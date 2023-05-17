import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, memo, useEffect, useState } from 'react';

import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { UserWithProjectType } from '~/types/user';
import UserContributions from './contributions-tab/UserContributions';
import UserDetails from './details-tab/UserDetails';

import ProfileHeader from './ProfileHeader';

type adminViewType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const AdminView: FC<adminViewType> = ({ user, isLoading }: adminViewType) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  //if (isLoading) return <AdminViewSkeleton />;

  return (
    <ErrorBoundaryWrapper>
      <Flex
        w={'full'}
        flexDir={'column'}
        gap={{ base: '32px', sm: '40px', md: '56px' }}
      >
        <ProfileHeader isLoading={isLoading} user={user} />
        <Tabs defaultIndex={router.query.project ? 1 : 0} variant={'cubik'}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Projects</Tab>
            <Tab>Contributions</Tab>
          </TabList>
          <TabPanels p={'0'}>
            <TabPanel>
              <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
                <UserDetails isLoading={isLoading} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction="column" w="full" gap="32px">
                {/* {user.project.length ? (
                  user.project.map((project, key) => (
                    <ProjectAdminCard
                      project={project}
                      activeProject={router?.query?.project as string}
                      key={key}
                    />
                  ))
                ) : (
                  <AdminProjectEmptyState />
                )} */}
              </Flex>
            </TabPanel>
            <TabPanel w="full">
              <UserContributions userId={user?.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ErrorBoundaryWrapper>
  );
};

export default memo(AdminView);
