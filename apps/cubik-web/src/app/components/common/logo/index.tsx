import Link from 'next/link';
import { Box, Center, HStack, Tag, Text } from '@chakra-ui/react';

const Logo = () => {
  const beta = true;
  return (
    <HStack
      spacing={{ base: '2px', md: '8px' }}
      alignItems={'center'}
      justify="space-between"
    >
      <Link style={{ height: 'fit-content' }} href="/">
        <Box
          display="flex"
          flexDir={'row'}
          gap={{ base: '8px', md: '12px' }}
          alignContent={'center'}
          justifyContent={'center'}
        >
          <Center
            width={{ base: '1.4rem', sm: '1.7rem' }}
            height={{ base: '1.4rem', sm: '1.7rem' }}
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
                strokeWidth="8"
                strokeLinejoin="round"
              />
            </svg>
          </Center>
          <Text
            letterSpacing={'0.12em'}
            fontWeight={'800'}
            fontSize={{ base: '16px', sm: '20px' }}
            color="white"
            display={{ base: 'block', sm: 'block', lg: 'block' }}
            lineHeight={{ base: '23px', md: '26px' }}
          >
            CUBIK
          </Text>
        </Box>
      </Link>
      {beta ? (
        <Tag
          rounded="full"
          variant="colorful"
          backgroundColor="#FFD83D18"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
          fontSize="xs"
          p={{ base: '4px 12px', md: '8px 12px' }}
          mx={1}
        >
          <Box
            as="p"
            whiteSpace="pre"
            color="#FFE747"
            textStyle={{ base: 'body6', md: 'body5' }}
            fontWeight="700 !important"
            letterSpacing="1.2px"
          >
            BETA
          </Box>
        </Tag>
      ) : (
        <></>
      )}
    </HStack>
  );
};

export default Logo;
