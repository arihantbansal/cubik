import { Box, Center, VStack } from '@chakra-ui/react';
import { VisitorsChart } from './Charts';

const ProjectInsights = () => {
  return (
    <VStack flex={'50%'} align={'start'} width="full" gap="24px">
      <Box as="p" textStyle={'title2'} color={'neutral.11'}>
        Project Insights
      </Box>
      <VStack align={'start'} w="full">
        <Box as="p" textStyle="body5" color={'neutral.8'}>
          Conversion Rate
        </Box>
        <Box as="p" textStyle={'title3'} color="neutral.11">
          20.5%
        </Box>
      </VStack>
      <Center w={'full'} flexDir={{ base: 'column', md: 'row' }}>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Unique Visitors
          </Box>
          <Box as="p" textStyle={'title3'} color="neutral.11">
            200
          </Box>
        </VStack>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Contributors
          </Box>
          <Box as="p" textStyle={'title3'} color="neutral.11">
            124
          </Box>
        </VStack>
      </Center>
      <VisitorsChart />
    </VStack>
  );
};

export default ProjectInsights;
