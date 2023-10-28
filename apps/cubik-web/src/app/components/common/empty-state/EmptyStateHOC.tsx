import React from 'react';
import type { JSX, ReactNode } from 'react';
import { Box, Center, VStack } from '@/utils/chakra';

export const EmptyStateHOC = ({
  heading,
  subHeading,
  children,
  CTA,
  margin,
}: {
  heading: string;
  subHeading: string;
  children?: ReactNode;
  CTA?: JSX.Element;
  margin?: string;
}) => {
  return (
    <VStack
      my={margin ? margin : '6rem'}
      alignContent={'center'}
      w="full"
      mx="auto"
      rounded="12px"
      p="6rem"
      align="center"
      gap="16px"
      border={'1px dashed'}
      borderColor="neutral.2"
    >
      {children ? (
        <>{children}</>
      ) : (
        <Center width={{ base: '15vw', md: '8vw' }} height="12vh">
          <svg
            width="128"
            height="132"
            viewBox="0 0 128 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="128"
              height="132"
              rx="12"
              fill="#14665B"
              fillOpacity="0.24"
            />
            <rect
              x="16"
              y="16"
              width="24"
              height="8"
              rx="4"
              fill="#A8F0E6"
              fillOpacity="0.16"
            />
            <rect x="18" y="18" width="20" height="4" rx="2" fill="#A8F0E6" />
            <rect
              x="15.5"
              y="31.5"
              width="25"
              height="85"
              rx="4.5"
              fill="#14665B"
              fillOpacity="0.24"
              stroke="#A8F0E6"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <rect
              x="51.5"
              y="31.5"
              width="25"
              height="85"
              rx="4.5"
              fill="#14665B"
              fillOpacity="0.24"
              stroke="#A8F0E6"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <rect
              x="87.5"
              y="31.5"
              width="25"
              height="85"
              rx="4.5"
              fill="#14665B"
              fillOpacity="0.24"
              stroke="#A8F0E6"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        </Center>
      )}
      <VStack w="full" gap="8px">
        <Box
          as="p"
          textStyle={{ base: 'title3', md: 'title2' }}
          color="neutral.11"
        >
          {heading}
        </Box>
        <Box
          maxW={'24rem'}
          textAlign="center"
          mx="auto"
          as="p"
          textStyle={{ base: 'body5', md: 'body4' }}
          color="neutral.7"
        >
          {subHeading}
        </Box>
        {CTA ? CTA : <></>}
      </VStack>
    </VStack>
  );
};
