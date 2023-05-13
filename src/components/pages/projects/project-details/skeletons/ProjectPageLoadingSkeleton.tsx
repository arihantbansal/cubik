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
  Wrap,
} from '@chakra-ui/react';
import ProjectsDetailedDescriptionSkeleton from './ProjectsDetailedDescriptionSkeleton';

export const ProjectSocialsSkeleton = () => {
  return (
    <VStack gap={{ base: '8px', md: '16px' }} align="start" w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Socials
      </Box>
      <Wrap w="full" spacing={{ base: '8px', md: '16px' }}>
        <SkeletonCircle
          width={{ base: '2.8rem', md: '2.8rem' }}
          height={{ base: '2.8rem', md: '2.8rem' }}
          opacity="0.4"
        />
        <SkeletonCircle
          width={{ base: '2.8rem', md: '2.8rem' }}
          height={{ base: '2.8rem', md: '2.8rem' }}
          opacity="0.4"
        />
        <SkeletonCircle
          width={{ base: '2.8rem', md: '2.8rem' }}
          height={{ base: '2.8rem', md: '2.8rem' }}
          opacity="0.4"
        />
        <SkeletonCircle
          width={{ base: '2.8rem', md: '2.8rem' }}
          height={{ base: '2.8rem', md: '2.8rem' }}
          opacity="0.4"
        />
      </Wrap>
    </VStack>
  );
};
export const ProjectFundingSkeleton = () => {
  return (
    <VStack gap="16px" align={'start'} w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Funding
      </Box>
      <VStack
        border="1px solid"
        borderColor={'#ffffff05'}
        rounded="16px"
        backgroundColor={'surface.green.0'}
        w="full"
        p="24px 32px"
        overflow={'hidden'}
        position={'relative'}
      >
        <HStack w="full" align={'start'}>
          <VStack w="full" align={'start'} gap="8px">
            <Skeleton w="8rem" height="1.8rem" opacity={'0.4'} />
            <SkeletonText
              spacing="3"
              w={'full'}
              noOfLines={2}
              height="28px"
              opacity={'0.4'}
            />
          </VStack>
        </HStack>
      </VStack>
      <VStack
        border="1px solid"
        borderColor={'#ffffff05'}
        rounded="16px"
        backgroundColor={'surface.green.0'}
        w="full"
        p="24px 32px"
        overflow={'hidden'}
        position={'relative'}
      >
        <HStack w="full" align={'start'}>
          <VStack w="full" align={'start'} gap="8px">
            <Skeleton w="8rem" height="1.8rem" opacity={'0.4'} />
            <SkeletonText
              spacing="3"
              w={'full'}
              noOfLines={2}
              height="28px"
              opacity={'0.4'}
            />
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
export const ProjectCreatorSkeleton = () => {
  return (
    <VStack gap="16px" align={'start'} w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Project Creators
      </Box>
      <HStack
        border="1px solid"
        borderColor={'#ffffff05'}
        rounded="16px"
        backgroundColor={'surface.green.0'}
        w="full"
        p={{ base: '12px 16px', md: '16px' }}
        overflow={'hidden'}
        position={'relative'}
        gap="4rem"
        align={'center'}
      >
        <HStack gap="0.6rem" w="full">
          <SkeletonCircle
            width={{ base: '1rem', md: '10' }}
            height={{ base: '1rem', md: '8' }}
            opacity="0.4"
          />
          <SkeletonText
            spacing="3"
            w={'full'}
            noOfLines={2}
            height="28px"
            opacity={'0.4'}
          />
        </HStack>
        <SkeletonText
          spacing="3"
          w={'2.8rem'}
          noOfLines={1}
          height="28px"
          opacity={'0.4'}
        />
      </HStack>
    </VStack>
  );
};
export const SimilarProjectsSkeleton = () => {
  return (
    <VStack gap="16px" align={'start'} w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Project Creators
      </Box>
      <HStack
        border="1px solid"
        borderColor={'#ffffff05'}
        rounded="16px"
        backgroundColor={'surface.green.0'}
        w="full"
        p={{ base: '12px 16px', md: '16px' }}
        overflow={'hidden'}
        position={'relative'}
        gap="4rem"
        align={'center'}
      >
        <HStack gap="0.6rem" w="full">
          <SkeletonCircle
            width={{ base: '1rem', md: '10' }}
            height={{ base: '1rem', md: '8' }}
            opacity="0.4"
          />
          <SkeletonText
            spacing="3"
            w={'full'}
            noOfLines={2}
            height="28px"
            opacity={'0.4'}
          />
        </HStack>
        <SkeletonText
          spacing="3"
          w={'2.8rem'}
          noOfLines={1}
          height="28px"
          opacity={'0.4'}
        />
      </HStack>
      <HStack
        border="1px solid"
        borderColor={'#ffffff05'}
        rounded="16px"
        backgroundColor={'surface.green.0'}
        w="full"
        p={{ base: '12px 16px', md: '16px' }}
        overflow={'hidden'}
        position={'relative'}
        gap="4rem"
        align={'center'}
      >
        <HStack gap="0.6rem" w="full">
          <SkeletonCircle
            width={{ base: '1rem', md: '10' }}
            height={{ base: '1rem', md: '8' }}
            opacity="0.4"
          />
          <SkeletonText
            spacing="3"
            w={'full'}
            noOfLines={2}
            height="28px"
            opacity={'0.4'}
          />
        </HStack>
        <SkeletonText
          spacing="3"
          w={'2.8rem'}
          noOfLines={1}
          height="28px"
          opacity={'0.4'}
        />
      </HStack>
    </VStack>
  );
};

export const MobileOnlyViewSkeleton = () => {
  return (
    <VStack
      w="full"
      gap={{ base: '24px', md: '64px' }}
      display={{ base: 'flex', lg: 'none' }}
    >
      <HStack w="full" gap="8px">
        <Skeleton w="full" h="2.6rem" opacity="0.4" />
        <Skeleton w="full" h="2.6rem" opacity="0.4" />
      </HStack>
      <ProjectSocialsSkeleton />
      <ProjectFundingSkeleton />
      <ProjectCreatorSkeleton />
    </VStack>
  );
};

export const ProjectDetailSkeleton = () => {
  return (
    <Stack
      direction={{ base: 'row', lg: 'row' }}
      gap={{ base: '16px', md: '24px' }}
      width={'100%'}
    >
      <SkeletonCircle
        width={{ base: '5.8rem', md: '7.4rem' }}
        height={{ base: '4.1rem', md: '6.2rem' }}
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
            height={{ base: '24px', md: '32px' }}
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
            <Skeleton h="2.8rem" w="20rem" opacity="0.6" />
            <Skeleton h="2.8rem" w="20rem" opacity="0.4" />
          </VStack>
        </VStack>
      </Box>
      <ProjectSocialsSkeleton />
      <ProjectFundingSkeleton />
      <ProjectCreatorSkeleton />
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
      px={{ base: '0px', xl: '1rem' }}
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
        p="0"
      >
        <ProjectDetailSkeleton /> <MobileOnlyViewSkeleton />
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
