import { Box, Button, Center, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import EmptyStateHOC from '~/components/HOC/EmptyState';

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
          <Button
            as={Link}
            href="/submit-project"
            variant="cubikFilled"
            size={{ base: 'cubikMini', md: 'cubikSmall' }}
          >
            Submit a Project
          </Button>
        }
      />
    </Center>
  );
};
export const VisitorProjectEmptyState = () => {
  return (
    <Center p="60px 4vh" w="full" minH="18vh" rounded="12px">
      <VStack gap="16px">
        <VStack>
          <Box py="12px">
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
          </Box>
          <Box
            color="white"
            as="p"
            textStyle={{ base: 'title3', md: 'title1' }}
          >
            No Projects
          </Box>
          <Box
            maxW="22rem"
            textAlign={'center'}
            as="p"
            color="neutral.8"
            textStyle={{ base: 'body5', md: 'body4' }}
          >
            This user has no projects yet. Explore other projects by clicking
            the button below.
          </Box>
        </VStack>
        <Button
          as={Link}
          href="/projects"
          variant={'cubikFilled'}
          size={{ base: 'cubikSmall', md: 'cubikMedium' }}
        >
          Explore Projects
        </Button>
      </VStack>
    </Center>
  );
};
