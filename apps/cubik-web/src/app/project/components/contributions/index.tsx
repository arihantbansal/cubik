'use client';

import React, { Suspense, useState } from 'react';
import { Container, VStack } from '@/utils/chakra';
import { useQuery } from '@tanstack/react-query';

import type { Prisma } from '@cubik/database';

import { useProjectEventStore } from '../store';
import { Contributions } from './Contributions';
import { getContributions } from './getContributors';
import { TopEarner } from './TopEarner';
import { VaultInfo } from './VaultInfo';

export type ContributionRowType = Prisma.ContributionGetPayload<{
  select: {
    id: true;
    totalAmount: true;
    totalUsdAmount: true;
    createdAt: true;
    token: true;
    user: {
      select: {
        id: true;
        mainWallet: true;
        username: true;
        profileNft: true;
        profilePicture: true;
      };
    };
  };
}>;

export const ContributionSection = () => {
  const { event } = useProjectEventStore();
  const [page] = useState<number>(0);

  const contributions = useQuery({
    queryFn: () => getContributions(event, page),
    queryKey: ['contributions'],
    enabled: event ? true : false,
  });

  return (
    <>
      <Suspense fallback={'Loading...'}>
        <Container
          display={'flex'}
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          w={'full'}
          maxW={'7xl'}
          mx={'auto'}
          gap={10}
        >
          <VStack w="full">
            <Contributions
              isLoading={contributions.isLoading}
              contributions={contributions.data ?? []}
            />
          </VStack>
          <VStack
            w={'full'}
            maxW={{
              base: 'full',
              lg: 'sm',
            }}
          >
            <VaultInfo />
            <TopEarner />
          </VStack>
        </Container>
      </Suspense>
    </>
  );
};
