'use client';

import React from 'react';
import Link from 'next/link';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import { Button, Center, Spinner } from '@/utils/chakra';

import { ContributionTable } from './ContributionTable';
import type { ContributionRowType } from './index';

interface Props {
  contributions: ContributionRowType[];
  isLoading: boolean;
}

export const Contributions = ({ contributions, isLoading }: Props) => {
  if (isLoading && !contributions) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (contributions?.length === 0) {
    return (
      <Center
        w="full"
        border="1px dashed"
        borderColor={'neutral.3'}
        rounded="12px"
      >
        <EmptyStateHOC
          heading={'No Contributions Yet'}
          subHeading={
            'This project hasn`t received any contributions yet. Be the first to support this project!'
          }
          CTA={
            <Link href="/projects">
              <Button
                variant="cubikFilled"
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
              >
                Make a contribution
              </Button>
            </Link>
          }
        />
      </Center>
    );
  }
  return <ContributionTable contribution={contributions ?? []} />;
};
