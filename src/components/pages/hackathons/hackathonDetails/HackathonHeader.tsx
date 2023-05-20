import {
  Avatar,
  Box,
  Button,
  Center,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react';

const HackathonHeader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <VStack w="full" gap="24px" align={'start'}>
      <SkeletonCircle
        isLoaded={!isLoading}
        fadeDuration={3}
        opacity={isLoading ? '0.6' : '1'}
        width={{ base: '5.5rem', md: '7rem' }}
        height={{ base: '5.5rem', md: '7rem' }}
      >
        <Avatar
          borderRadius="12px"
          backgroundColor={'#1C1C1C'}
          src={
            'https://ik.imagekit.io/blockster/7e08488b-ff77-4c92-b81d-b506249ed630.gif?tr=w-600,h-450'
          }
          width={{ base: '5.5rem', md: '7rem' }}
          height={{ base: '5.5rem', md: '7rem' }}
        />
      </SkeletonCircle>
      <Stack
        gap={{ base: '16px', md: '24px', lg: '12vw' }}
        w="full"
        alignItems="end"
        direction={{ base: 'column', lg: 'row' }}
      >
        <VStack flex={3} alignItems="start" w="full" spacing="16px">
          <Box
            as="p"
            textStyle={{ base: 'title1', md: 'headline3' }}
            textTransform="capitalize"
            color="neutral.11"
            noOfLines={1}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            Sandstorm Hackathon
          </Box>
          <SkeletonText
            isLoaded={!isLoading}
            w="full"
            fadeDuration={5}
            noOfLines={2}
            opacity={isLoading ? '0.5' : '1'}
            skeletonHeight="16px"
            spacing="4"
          >
            <Box
              as="p"
              textStyle={{ base: 'body4', md: 'body2' }}
              color="neutral.9"
              noOfLines={2}
              textOverflow="ellipsis"
            >
              A Community run Hackathon organized by Lamport DAO to build the
              next generation of decentralized applications on Solana.
            </Box>
          </SkeletonText>
        </VStack>
        <Center w="full" alignItems="end" flex={1.5}>
          <Button
            variant="cubikFilled"
            size={{ base: 'cubikSmall', md: 'cubikMedium' }}
            w="full"
          >
            Register
          </Button>
        </Center>
      </Stack>
    </VStack>
  );
};

export default HackathonHeader;
