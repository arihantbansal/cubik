import React from 'react';
import {
  Box,
  Center,
  Flex,
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

const ProjectDetailSkeleton = () => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: '16px', md: '24px' }}
      width={'100%'}
    >
      <HStack justify={{ base: 'start-', md: 'start' }} align="center">
        <SkeletonCircle
          minW={{ base: '80px', md: '84px' }}
          minH={{ base: '80px', md: '84px' }}
        />
        <VStack
          justify={'center'}
          gap={{ base: '8px', md: '16px' }}
          alignItems={'start'}
          justifyContent="center"
          w="full"
        >
          <Stack gap="1rem" direction={'row'}>
            <Skeleton
              w={{ base: '10rem', md: '14rem' }}
              height="28px"
              opacity={'0.6'}
            />
          </Stack>
          <SkeletonText
            w={'full'}
            noOfLines={2}
            height="28px"
            opacity={'0.4'}
          />
        </VStack>
      </HStack>
    </Stack>
  );
};

const ProjectInteractionSkeleton = () => {
  return <></>;
};

const ProjectPageLoadingSkeleton = () => {
  return (
    <>
      <ProjectDetailSkeleton />
      <HStack w="full" display={{ base: 'flex', md: 'none' }} gap="0.5rem">
        <Skeleton w="full" height="32px" opacity={'0.4'} />
        <Skeleton w="full" height="32px" opacity={'0.4'} />
      </HStack>
      <ProjectInteractionSkeleton />
    </>
  );
};

export default ProjectPageLoadingSkeleton;
