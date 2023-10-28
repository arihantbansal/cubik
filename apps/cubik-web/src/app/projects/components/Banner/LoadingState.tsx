import { Skeleton, SkeletonText, Stack, VStack } from '@/utils/chakra';

export const RoundsCarouselLoadingState = () => {
  return (
    <Stack w="full" direction={{ base: 'column', md: 'row' }}>
      <Stack
        p={{ base: '16px', md: '32px' }}
        border="2px solid #ffffff01"
        backgroundColor="#0C0D0D"
        w="full"
        rounded="16px"
        justify={'space-between'}
        align="start"
        direction={{ base: 'column', md: 'row' }}
      >
        <VStack w="full" align={'start'} gap={{ base: '8px', md: '16px' }}>
          <Skeleton
            width={'10rem'}
            height={{ base: '1.4rem', md: '1.8rem' }}
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
            <VStack align={'start'} gap="12px" w={{ base: 'full', md: '60%' }}>
              <Skeleton
                width="18rem"
                height={{ base: '1.6rem', md: '2rem' }}
                opacity="0.7"
              />
              <SkeletonText
                height="4.4rem"
                noOfLines={2}
                width="full"
                opacity={0.5}
              />
            </VStack>
            <Skeleton
              w="14rem"
              height={{ base: '2.3rem', md: '2.8rem' }}
              rounded="full"
              opacity={0.5}
            />
          </Stack>
        </VStack>
      </Stack>
    </Stack>
  );
};
