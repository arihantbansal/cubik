import { Box, Button, Center, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const AdminProjectEmptyState = () => {
  const router = useRouter();
  return (
    <Center
      p="80px 18px"
      w="full"
      outline="2px dashed #1D1F1E"
      minH="10rem"
      rounded="12px"
    >
      <VStack gap="16px">
        <VStack>
          <Box
            color="white"
            as="p"
            textStyle={{ base: 'title3', md: 'title1' }}
          >
            Submit Your Project
          </Box>
          <Box
            maxW="22rem"
            textAlign={'center'}
            as="p"
            color="neutral.8"
            textStyle={{ base: 'body5', md: 'body4' }}
          >
            This is where your projects will appear. Click the Submit Project
            button below to get started.
          </Box>
        </VStack>
        <Button
          variant={'connect_wallet'}
          onClick={() => router.prefetch('/submit-project')}
        >
          Submit Project
        </Button>
      </VStack>
    </Center>
  );
};
export const VisitorProjectEmptyState = () => {
  const router = useRouter();
  return (
    <Center
      p="80px 18px"
      w="full"
      outline="2px dashed #1D1F1E"
      minH="10rem"
      rounded="12px"
    >
      <VStack gap="16px">
        <VStack>
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
          variant={'connect_wallet'}
          onClick={() => router.prefetch('/projects')}
        >
          Explore Projects
        </Button>
      </VStack>
    </Center>
  );
};
