import React from 'react';
import Link from 'next/link';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import { Button, Center } from '@/utils/chakra';

export const AdminProjectEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={'neutral.3'}
      rounded="12px"
      flexDir={'column'}
    >
      <EmptyStateHOC
        heading={'Submit your Project'}
        subHeading={
          'This is where your projects will appear. Click the Submit Project button below to get started'
        }
        CTA={
          <Link href="/create/project">
            <Button
              variant={'cubikFilled'}
              size={{ base: 'cubikSmall', md: 'cubikMedium' }}
            >
              Create Project
            </Button>
          </Link>
        }
      />
    </Center>
  );
};
