import React from 'react';
import { Box, HStack, VStack } from '@/utils/chakra';

export const VaultInfo = () => {
  return (
    <VStack align={'start'} w="full">
      <HStack align={'center'} justify={'space-between'} w="full">
        <HStack>
          <Box borderRadius={4} border={'1.5px solid #241E00'} p={2}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.25 15.75V15M3.75 15.75V15M14.25 10.5V8.25M4.31802 12.182L5.37868 11.1213M9.6213 6.87869L10.682 5.81803M10.682 12.182L9.6213 11.1213M5.37868 6.87867L4.31802 5.81801M5.1 15H12.9C14.1601 15 14.7902 15 15.2715 14.7548C15.6948 14.539 16.039 14.1948 16.2548 13.7715C16.5 13.2902 16.5 12.6601 16.5 11.4V6.6C16.5 5.33988 16.5 4.70982 16.2548 4.22852C16.039 3.80516 15.6948 3.46095 15.2715 3.24524C14.7902 3 14.1601 3 12.9 3H5.1C3.83988 3 3.20982 3 2.72852 3.24524C2.30516 3.46095 1.96095 3.80516 1.74524 4.22852C1.5 4.70982 1.5 5.33988 1.5 6.6V11.4C1.5 12.6601 1.5 13.2902 1.74524 13.7715C1.96095 14.1948 2.30516 14.539 2.72852 14.7548C3.20982 15 3.83988 15 5.1 15ZM10.5 8.99999C10.5 10.6568 9.15685 12 7.49999 12C5.84314 12 4.49999 10.6568 4.49999 8.99999C4.49999 7.34313 5.84314 5.99999 7.49999 5.99999C9.15685 5.99999 10.5 7.34313 10.5 8.99999Z"
                stroke="#FFD600"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box color={'white'} fontSize={'lg'} fontWeight={600}>
            Project Treasury
          </Box>
        </HStack>
        <Box>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.4999 6C11.9246 6 11.4583 5.55228 11.4583 5C11.4583 4.44772 11.9246 4 12.4999 4C13.0752 4 13.5416 4.44772 13.5416 5C13.5416 5.55228 13.0752 6 12.4999 6Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4999 13C11.9246 13 11.4583 12.5523 11.4583 12C11.4583 11.4477 11.9246 11 12.4999 11C13.0752 11 13.5416 11.4477 13.5416 12C13.5416 12.5523 13.0752 13 12.4999 13Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.4999 20C11.9246 20 11.4583 19.5523 11.4583 19C11.4583 18.4477 11.9246 18 12.4999 18C13.0752 18 13.5416 18.4477 13.5416 19C13.5416 19.5523 13.0752 20 12.4999 20Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </HStack>
      <HStack h={20} align={'end'}>
        <VStack gap={0} align={'start'}>
          <Box color={'white'} fontSize={'xl'} fontWeight={600}>
            $333
          </Box>
          <HStack gap={0}>
            <Box>
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 3.67933C3.14815 2.80292 3.90533 2.01576 4.75237 1.3373C4.82503 1.2791 4.91251 1.25 5 1.25M7.5 3.67933C6.85185 2.80292 6.09467 2.01576 5.24763 1.3373C5.17497 1.2791 5.08749 1.25 5 1.25M5 1.25L5 8.75"
                  stroke="#31B702"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            <Box color={'#31B702'} fontSize={'md'} fontWeight={600}>
              00%
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
