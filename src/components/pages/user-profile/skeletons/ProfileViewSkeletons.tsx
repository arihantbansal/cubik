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

const ProfileHeaderSkeleton = () => {
  return (
    <HStack w="full" align={'center'} justify="start" gap={'16px'}>
      <Center>
        <SkeletonCircle
          width={{ base: '80px', md: '84px' }}
          height={{ base: '80px', md: '84px' }}
        />
      </Center>
      <VStack
        p="8px"
        gap={{ base: '6px', md: '8px' }}
        justifyContent={'center'}
        alignItems={'start'}
      >
        <Skeleton
          w={{ base: '10rem', md: '14rem' }}
          height="28px"
          opacity={'0.6'}
        />
        <Skeleton
          w={{ base: '8rem', md: '10rem' }}
          height="22px"
          opacity={'0.3'}
        />
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
      <TabPanels p="0">
        <TabPanel>
          <Flex maxW={'full'} p="0" flexDir="column" gap="32px">
            <Stack direction={{ base: 'column', md: 'row' }} gap="32px">
              <Skeleton
                w={{ base: '320px', md: '275px' }}
                height={{ base: '180px', md: '220px' }}
                rounded="12px"
              />
              <Skeleton
                w={{ base: '320px', md: '420px' }}
                height={{ base: '180px', md: '220px' }}
                opacity={'0.6'}
                rounded="12px"
              />
              <Skeleton
                w={{ base: '320px', md: '400px' }}
                height={{ base: '180px', md: '220px' }}
                opacity={'0.3'}
                rounded="12px"
              />
            </Stack>
          </Flex>
        </TabPanel>
        <TabPanel w="100%">
          <Stack direction={'column'} gap="32px" w="100%">
            <Skeleton
              w={{ base: '320px', md: '100%' }}
              height={{ base: '180px', md: '220px' }}
              rounded="12px"
            />
            <Skeleton
              w={{ base: '320px', md: '100%' }}
              height={{ base: '180px', md: '220px' }}
              opacity={'0.6'}
              rounded="12px"
            />
            <Skeleton
              w={{ base: '320px', md: '100%' }}
              height={{ base: '180px', md: '220px' }}
              opacity={'0.3'}
              rounded="12px"
            />
          </Stack>
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const AdminViewSkeleton = () => {
  return (
    <Flex flexDir={'column'} gap="48px">
      <ProfileHeaderSkeleton />
      <ProfileTabsSkeleton />
    </Flex>
  );
};

export const VisitorViewSkeleton = () => {
  return (
    <Flex flexDir={'column'} gap="48px">
      <ProfileHeaderSkeleton />
      <ProfileTabsSkeleton />
    </Flex>
  );
};
