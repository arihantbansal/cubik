'use client';

import React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { useProjectEventStore } from '../store';
import { getStats } from './stats';

export const RoundStats = () => {
  const { event } = useProjectEventStore();

  const stats = useQuery({
    queryFn: () => getStats(event),
    queryKey: ['round-stats'],
    enabled: event ? true : false,
  });

  if (!event) return <></>;

  return (
    <>
      <VStack gap={4} align={'start'} w="full">
        <HStack align={'start'}>
          <Box>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 20L6 14M12 20L12 4M18 20V10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box color={'white'} fontSize={'xl'} fontWeight={700}>
            Round Stats
          </Box>
        </HStack>
        <HStack
          borderRadius={8}
          p={4}
          w="full"
          border={'1.5px solid'}
          borderColor={'#1A1A1A'}
        >
          <Box
            border={'1.5px solid'}
            borderColor={'#003810'}
            fontSize={'md'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            p={3}
            borderRadius={8}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.97193C1 11.075 1.945 11.9775 3.1 11.9775H4.18453M15.7 10.9747V10.9757M19.0033 8.11364C19.3783 8.4787 19.7267 8.86923 19.8514 9.4733C19.9949 10.1678 20.9361 9.97193 21.475 9.97193C21.765 9.97193 22 10.1964 22 10.4733V13.4818C22 14.6128 17.8 14.6664 17.8 16.2987C17.8 17.2357 18.3763 20 16.75 20H15.2989C14.3806 20 14.0801 18.9114 13.7451 18.2716C13.4462 17.7007 10.6038 17.7007 10.3049 18.2716C9.9699 18.9114 9.66941 20 8.75106 20H7.29999C5.7556 20 6.24999 17.6058 6.24999 16.6979C6.24999 16.5649 6.19109 16.4349 6.09513 16.3385C0.740627 10.9613 7.55506 3.36319 15.1403 6.69803C15.4356 6.82785 15.8139 6.69944 16.0122 6.45342C16.4657 5.8908 17.3282 5.19775 18.3283 5.00795C18.6127 4.95399 18.85 5.18239 18.85 5.4593C18.85 6.08488 18.4989 7.62271 19.0033 8.11364Z"
                stroke="#18FF59"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <VStack align={'start'} spacing={0}>
            <Box color={'white'} opacity={0.6} fontSize={'sm'} fontWeight={700}>
              Estimated Match
            </Box>
            <Box color={'white'} fontSize={'lg'} fontWeight={700}>
              ${stats.data?.estimatedMatch.toFixed(2)}
            </Box>
          </VStack>
        </HStack>

        <HStack
          borderRadius={8}
          p={4}
          w="full"
          border={'1.5px solid'}
          borderColor={'#1A1A1A'}
        >
          <Box
            border={'1.5px solid'}
            borderColor={'#312C00'}
            fontSize={'md'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            p={3}
            borderRadius={8}
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3378 14.3416H19.9455C21.3516 14.3416 23.5204 16.2172 21.9567 17.6737C17.4777 22.1242 10.262 22.1242 5.62329 17.5803M5.62329 17.5803V17.677C5.62329 18.2668 5.40608 18.8323 5.01945 19.2493C4.63281 19.6663 4.10843 19.9006 3.56164 19.9006C3.01486 19.9006 2.49048 19.6663 2.10384 19.2493C1.71721 18.8323 1.5 18.2668 1.5 17.677V12.118C1.50091 11.5408 1.7099 10.9865 2.0828 10.5725C2.4557 10.1584 2.96327 9.91698 3.49821 9.89922C4.03316 9.88146 4.55354 10.0888 4.94934 10.4773C5.34514 10.8658 5.58535 11.4052 5.61917 11.9813M5.62329 17.5803V12.118C5.62329 12.0735 5.62329 12.0268 5.61917 11.9813M9.74658 16.5652H14.7337C15.5212 16.5652 16.0325 15.6724 15.681 14.9131C15.4466 14.4072 15.0861 13.9817 14.64 13.6844C14.194 13.387 13.6799 13.2296 13.1555 13.2298H11.9989C11.8737 13.2296 11.7502 13.198 11.6381 13.1375C9.77716 12.1342 7.68689 11.7327 5.61917 11.9813M19.5394 2.8089C20.1337 3.25502 20.5899 3.8837 20.8485 4.61319C21.1071 5.34267 21.1562 6.13921 20.9894 6.8992C20.8226 7.65919 20.4476 8.34746 19.9133 8.8745C19.3789 9.40155 18.7099 9.74298 17.9932 9.85438M16.9623 4.8913C16.9623 5.92334 16.5822 6.91311 15.9056 7.64287C15.229 8.37263 14.3113 8.78261 13.3545 8.78261C12.3976 8.78261 11.4799 8.37263 10.8033 7.64287C10.1267 6.91311 9.74658 5.92334 9.74658 4.8913C9.74658 3.85927 10.1267 2.8695 10.8033 2.13974C11.4799 1.40998 12.3976 1 13.3545 1C14.3113 1 15.229 1.40998 15.9056 2.13974C16.5822 2.8695 16.9623 3.85927 16.9623 4.8913Z"
                stroke="#FFE818"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <VStack align={'start'} spacing={0}>
            <Box color={'white'} opacity={0.6} fontSize={'sm'} fontWeight={700}>
              Community Contributions
            </Box>
            <Box color={'white'} fontSize={'lg'} fontWeight={700}>
              ${stats.data?.communityMatch}
            </Box>
          </VStack>
        </HStack>

        <HStack
          borderRadius={8}
          p={4}
          w="full"
          border={'1.5px solid'}
          borderColor={'#1A1A1A'}
        >
          <Box
            border={'1.5px solid'}
            borderColor={'#1B0D2E'}
            fontSize={'md'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            p={3}
            borderRadius={8}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 15H7C4.79086 15 3 16.7909 3 19C3 20.1046 3.89543 21 5 21H11M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM17 21C16.6 21 13 19.0556 13 16.3335C13 14.9724 14.2 14.0003 15.4 14.0003C15.9896 14.0003 16.6 14.1947 17 14.778C17.4 14.1947 18 13.9918 18.6 14.0003C19.8 14.0171 21 14.9724 21 16.3335C21 19.0556 17.4 21 17 21Z"
                stroke="#9747FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <VStack align={'start'} spacing={0}>
            <Box color={'white'} opacity={0.6} fontSize={'sm'} fontWeight={700}>
              Contributors
            </Box>
            <Box color={'white'} fontSize={'lg'} fontWeight={700}>
              {stats.data?.contributors}
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};
