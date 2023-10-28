import Link from 'next/link';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import { Button, Center } from '@/utils/chakra';

export const VisitorProjectEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={'neutral.3'}
      rounded="12px"
      flexDir={'column'}
    >
      <EmptyStateHOC
        heading={'No Projects'}
        subHeading={
          'This user has no projects yet. Explore other projects by clicking the button below.'
        }
        CTA={
          <Link href="/projects">
            <Button
              variant={'cubikFilled'}
              size={{ base: 'cubikSmall', md: 'cubikMedium' }}
            >
              Explore Projects
            </Button>
          </Link>
        }
      />
    </Center>
  );
};
