import { Box, Center, VStack } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { VisitorsChart } from './Charts';

const ProjectInsights = ({ projectId }: { projectId: string }) => {
  const { data, isError, isLoading } =
    trpc.contribution.getProjectContributors.useQuery({
      projectId,
    });
  return (
    <VStack
      flex={'50%'}
      align={'start'}
      width="full"
      gap={{ base: '16px', sm: '20px', md: '24px' }}
    >
      <Box
        as="p"
        textStyle={{ base: 'title3', md: 'title2' }}
        color={'neutral.11'}
      >
        Project Insights
      </Box>
      <VStack align={'start'} w="full">
        <Box as="p" textStyle="body5" color={'neutral.8'}>
          Conversion Rate
        </Box>
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          20.5%
        </Box>
      </VStack>
      <Center
        gap={{ base: '16px', sm: '20px', md: '24px' }}
        w={'full'}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Unique Visitors
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="neutral.11"
          >
            200
          </Box>
        </VStack>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Contributors
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="neutral.11"
          >
            124
          </Box>
        </VStack>
      </Center>
      <VisitorsChart />
    </VStack>
  );
};

export default ProjectInsights;
