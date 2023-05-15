import { Skeleton, SkeletonText, Stack, VStack } from '@chakra-ui/react';

const RoundsCarouselLoadingState = () => {
  return (
    <Stack w="full" direction={{ base: 'column', md: 'row' }}>
      <Stack
        maxW={'full'}
        p={{ base: '16px', md: '32px' }}
        border="2px solid #ffffff01"
        overflow="hidden"
        backgroundColor="#0C0D0D"
        w="full"
        gap="3rem"
        rounded="16px"
        justify={'space-between'}
        align="start"
        direction={{ base: 'column', md: 'row' }}
        position={'relative'}
      >
        <VStack w="full" align={'start'} spacing={{ base: '16px', md: '24px' }}>
          <Skeleton
            width={'8rem'}
            height={{ base: '1.6rem', md: '2rem' }}
            rounded="full"
            opacity="0.5"
          />
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify={'space-between'}
            align="start"
            gap={{ base: '8px', md: '16px' }}
            w="full"
          >
            <VStack align={'start'} gap="8px" w={{ base: 'full', md: '60%' }}>
              <Skeleton
                width="18rem"
                height={{ base: '1.6rem', md: '2rem' }}
                opacity="0.7"
              />
              <SkeletonText noOfLines={2} width="full" opacity={0.5} />
            </VStack>
            <Skeleton w="12rem" height="2.4rem" rounded="full" opacity={0.5} />
          </Stack>
        </VStack>
      </Stack>
    </Stack>
  );
};

export default RoundsCarouselLoadingState;
