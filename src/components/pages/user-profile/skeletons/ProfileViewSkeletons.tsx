import {
  Center,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const ProfileHeaderSkeleton = () => {
  return (
    <HStack w="full" align={'center'} justify="start" gap={'16px'}>
      <Center>
        <SkeletonCircle width="84px" height="84px" />
      </Center>
      <VStack p="8px" gap="8px" justifyContent={'center'} alignItems={'start'}>
        <Skeleton w="14rem" height="28px" opacity={'0.6'} />
        <Skeleton w="10rem" height="22px" opacity={'0.3'} />
      </VStack>
    </HStack>
  );
};

const ProfileTabsSkeleton = () => {
  return (
    <Tabs variant={'cubik'}>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Projects</Tab>
        <Tab>Contributions</Tab>
      </TabList>
      <TabPanels p={{ base: '1rem', md: '0rem' }}>
        <TabPanel>
          <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
            <Stack direction={{ base: 'column', md: 'row' }} gap="32px">
              <Skeleton w="275px" height="220px" rounded="12px" />
              <Skeleton
                w="420px"
                height="220px"
                opacity={'0.6'}
                rounded="12px"
              />
              <Skeleton
                w="400px"
                height="220px"
                opacity={'0.3'}
                rounded="12px"
              />
            </Stack>
          </Flex>
        </TabPanel>
        <TabPanel>
          {/* {projects.data ? (
          <Container
            maxW={'full'}
            p="0"
            display={'flex'}
            flexDir="column"
            gap="32px"
          >
            {projects.data.map((project, key) => (
              <ProjectAdminCard project={project} key={key} />
            ))}
          </Container>
        ) : (
          ''
        )} */}
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export const AdminViewSkeleton = () => {
  return (
    <Flex flexDir={'column'} gap="48px" my="8rem">
      <ProfileHeaderSkeleton />
      <ProfileTabsSkeleton />
    </Flex>
  );
};

export const VisitorViewSkeleton = () => {
  return (
    <Flex flexDir={'column'} gap="48px" my="8rem">
      <ProfileHeaderSkeleton />
      <ProfileTabsSkeleton />
    </Flex>
  );
};
