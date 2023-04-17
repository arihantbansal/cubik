import {
  Box,
  Container,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import ProjectsDetailedDescriptionSkeleton from './ProjectsDetailedDescriptionSkeleton';

export const ProjectDetailSkeleton = () => {
  return (
    <Stack
      direction={{ base: 'row', md: 'row' }}
      gap={{ base: '16px', md: '24px' }}
      width={'100%'}
    >
      <SkeletonCircle
        width={{ base: '4.8rem', md: '7.4rem' }}
        height={{ base: '4.8rem', md: '6.2rem' }}
      />
      <VStack
        justify={'center'}
        gap={{ base: '8px', md: '14px' }}
        alignItems={'start'}
        justifyContent="center"
        w="full"
      >
        <Stack gap="1rem" direction={'row'}>
          <Skeleton
            w={{ base: '10rem', md: '14rem' }}
            height="32px"
            opacity={'0.6'}
          />
        </Stack>
        <SkeletonText
          spacing="3"
          w={'full'}
          noOfLines={2}
          height="28px"
          opacity={'0.4'}
        />
      </VStack>
    </Stack>
  );
};

const SideBarSkeleton = () => {
  return <></>;
};

const ProjectInteractionSkeleton = () => {
  return (
    <Stack
      w="full"
      maxW="20rem"
      flex="1"
      // position={{ base: 'relative', lg: 'fixed' }}
      gap="48px"
      flexDir="column"
      justifyContent="start"
    >
      <Box display={{ base: 'none', md: 'block' }}>
        <VStack
          ml="auto"
          right="20rem"
          w={'full'}
          alignItems={{ base: 'center', md: 'start' }}
        >
          <VStack gap="16px" align={'end'} spacing="0" w="full" pb="0.5rem">
            <Skeleton h="2.5rem" w="16rem" opacity="0.6" />
            <Skeleton h="2.5rem" w="16rem" opacity="0.4" />
          </VStack>
        </VStack>
      </Box>
      <SideBarSkeleton />
    </Stack>
  );
};

const ProjectPageLoadingSkeleton = () => {
  return (
    <Stack
      maxW="7xl"
      w="full"
      mx="auto"
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '24px', md: '12px', lg: '80px', xl: '100px' }}
      px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
      alignItems={'start'}
      justifyContent={'start'}
    >
      <Container
        display={'flex'}
        w="100%"
        maxW="4xl"
        flex="3"
        flexDir="column"
        alignItems={{ base: 'end', md: 'center' }}
        justifyContent="start"
        gap={{ base: '24px', md: '64px' }}
      >
        <ProjectDetailSkeleton />{' '}
        <HStack w="full" display={{ base: 'flex', md: 'none' }} gap="0.5rem">
          <Skeleton w="full" height="32px" opacity={'0.4'} />
          <Skeleton w="full" height="32px" opacity={'0.4'} />
        </HStack>
        <Tabs variant={'cubik'} alignSelf={'start'} w="full">
          <TabList gap={{ base: '0.5rem', md: '1rem' }}>
            <Tab>Details</Tab>
            <Tab>Discussion</Tab>
            <Tab>Contributors</Tab>
          </TabList>
          <TabPanels p={{ base: '1rem', md: '0rem' }}>
            <TabPanel>
              <ProjectsDetailedDescriptionSkeleton />
            </TabPanel>
            <TabPanel> </TabPanel>
            <TabPanel> </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <ProjectInteractionSkeleton />
    </Stack>
  );
};

export default ProjectPageLoadingSkeleton;
