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

const HackathonHeader = ({
  isLoading,
  logo,
  name,
  short_description,
}: {
  isLoading: boolean;
  logo: string;
  name: string;
  short_description: string;
}) => {
  return (
    <VStack w="full" gap="24px" align={'start'}>
      <SkeletonCircle
        isLoaded={!isLoading}
        fadeDuration={2}
        opacity={isLoading ? '0.6' : '1'}
        width={{ base: '5.5rem', md: '7rem' }}
        height={{ base: '5.5rem', md: '7rem' }}
      >
        <Avatar
          borderRadius="12px"
          backgroundColor={'#1C1C1C'}
          src={logo}
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
            {name}
          </Box>
          <SkeletonText
            isLoaded={!isLoading}
            w="full"
            fadeDuration={3}
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
              {short_description}
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
