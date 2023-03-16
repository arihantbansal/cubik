import { Center, HStack, Text } from '@chakra-ui/react';

const Logo = () => {
  return (
    <HStack gap="0.2rem" alignItems={'center'} justify="space-between">
      <Center
        width={{ base: '1.2rem', md: '1.8rem' }}
        height={{ base: '1.2rem', md: '1.8rem' }}
      >
        <svg
          width="101"
          height="120"
          viewBox="0 0 101 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M97 52.3137V31.451L50.5 4L4 31.451V87.451M97 52.3137L50.5 24.8627L23.0227 40.2353V55.6078L35.7045 48.006L50.5 39.1373L85.0368 60M97 52.3137L85.0368 60M95.9432 87.451V66.5882L85.0368 60M95.9432 87.451L50.5 61.098L4 87.451M95.9432 87.451L50.5 116L4 87.451"
            stroke="white"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </svg>
      </Center>
      <Text
        letterSpacing={'0.12em'}
        fontWeight={'800'}
        fontSize={{ base: '18px', md: '22px' }}
        color="white"
      >
        CUBIK
      </Text>
    </HStack>
  );
};

export default Logo;
