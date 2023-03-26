import { Box, Center, VStack } from '@chakra-ui/react';
import { FundingChart } from './Charts';

const FundingOverview = () => {
  return (
    <VStack flex={'50%'} align={'start'} width="full" gap="24px">
      <Box as="p" textStyle={'title2'} color={'neutral.11'}>
        Funding Overview
      </Box>
      <VStack align={'start'} w="full">
        <Box as="p" textStyle="body5" color={'neutral.8'}>
          Estimated Amount Raised
        </Box>
        <Box as="p" textStyle={'title3'} color="neutral.11">
          $300
        </Box>
      </VStack>
      <Center w={'full'} flexDir={{ base: 'column', md: 'row' }}>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Total Community Donation
          </Box>
          <Box as="p" textStyle={'title3'} color="neutral.11">
            $300
          </Box>
        </VStack>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Estimated Matching Amount
          </Box>
          <Box as="p" textStyle={'title3'} color="neutral.11">
            $1564
          </Box>
        </VStack>
      </Center>
      <FundingChart />
    </VStack>
  );
};

export default FundingOverview;
