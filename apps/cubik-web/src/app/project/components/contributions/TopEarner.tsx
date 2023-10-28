import React from 'react';
import ProfilePictureAvatar from '@/app/components/common/profile-picture';
import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@/utils/chakra';
import { useQuery } from '@tanstack/react-query';

import type { NFTProfile } from '@cubik/common-types';

import { useProjectEventStore } from '../store';
import { getTopEarner } from './getContributors';

export const TopEarner = () => {
  const { event } = useProjectEventStore();

  const topEarner = useQuery({
    queryFn: () => getTopEarner(event),
    queryKey: ['topEarner'],
    enabled: event ? true : false,
  });

  return (
    <VStack mt={4} w="full" align={'start'}>
      <HStack align={'center'}>
        <Box borderRadius={4} border={'1.5px solid #2B1449'} p={2}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5513 10.6167C13.5955 9.65712 14.25 8.27999 14.25 6.75C14.25 3.85051 11.8995 1.5 9 1.5C6.10051 1.5 3.75 3.85051 3.75 6.75C3.75 8.37266 4.48616 9.82338 5.64272 10.7864M12.5513 10.6167C11.6165 11.4736 10.3695 12 9 12C7.72316 12 6.55279 11.5442 5.64272 10.7864M12.5513 10.6167L13.875 16.5L13.606 16.3345C10.7988 14.6069 7.24266 14.6716 4.5 16.5L5.64272 10.7864"
              stroke="#9747FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
        <Box color={'white'} fontSize={'lg'} fontWeight={600}>
          Top Contributors
        </Box>
      </HStack>
      <TableContainer mt={4} w={'full'}>
        <Table variant={'unstyled'} w={'full'}>
          <Thead color="neutral.8" fontFamily={'Inter'}>
            <Tr>
              <Th textAlign={'start'} p={1}>
                <Text fontSize={{ base: '12px', md: '14px' }} color={'#515251'}>
                  Rank
                </Text>
              </Th>
              <Th textAlign={'start'} p={1}>
                <Text color={'#515251'} fontSize={{ base: '12px', md: '14px' }}>
                  Contributor
                </Text>
              </Th>
              <Th
                p={1}
                textAlign="end"
                fontSize={{ base: '12px', md: '14px' }}
                color={'#515251'}
              >
                Amount
              </Th>
            </Tr>
          </Thead>
          <Tbody gap={3}>
            {topEarner.data?.map((earner, index: number) => {
              return (
                <Tr key={earner.id}>
                  <Td p={1} textAlign={'center'}>
                    <span
                      style={{
                        color: '#3B3D3D',
                        fontWeight: 600,
                        fontSize: '16px',
                      }}
                    >
                      #
                    </span>
                    <span
                      style={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '20px',
                      }}
                    >
                      {index + 1}
                    </span>
                  </Td>
                  <Td p={1}>
                    <HStack align={'start'} gap={2}>
                      <ProfilePictureAvatar
                        NFTProfile={
                          earner.user?.profileNft as unknown as NFTProfile
                        }
                        asNFT={earner.user?.profileNft ? true : false}
                        profilePicture={
                          earner.user?.profileNft
                            ? undefined
                            : earner.user?.profilePicture!
                        }
                        username={earner.user?.username as string}
                        width={{
                          base: '36px',
                          sm: '36px',
                          md: '36px',
                          lg: '36px',
                          xl: '36px',
                        }}
                        height={{
                          base: '36px',
                          sm: '36px',
                          md: '36px',
                          lg: '36px',
                          xl: '36px',
                        }}
                      />
                      <Box color={'white'} fontWeight={600} fontSize={'md'}>
                        @{earner.user?.username}
                      </Box>
                    </HStack>
                  </Td>
                  <Td textAlign="end" p={1}>
                    <Text color={'white'} fontWeight={600}>
                      ${earner.totalUsdAmount}
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
