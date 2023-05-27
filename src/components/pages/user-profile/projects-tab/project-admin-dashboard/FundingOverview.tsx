import { Box, Center, HStack, Spinner, VStack } from '@chakra-ui/react';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { trpc } from '~/utils/trpc';
import { FundingChart } from './Charts';

const FundingOverview = ({ projectId }: { projectId: string }) => {
  const { data, isError, isLoading, error } =
    trpc.contribution.getProjectContributors.useQuery({
      projectId,
    });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  const totalCommunityDonation = data?.reduce(
    (acc, curr) => acc + curr.currentTotal,
    0
  );
  const estimatedMatchingAmount = data?.reduce(
    (acc, curr) => acc + curr.currentusdTotal,
    0
  );

  console.log('project contributors data - ', data);

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
        Funding Overview
      </Box>
      <VStack align={'start'} w="full">
        <HStack>
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Amount Raised
          </Box>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          ${(totalCommunityDonation + estimatedMatchingAmount).toFixed(2)}
        </Box>
      </VStack>
      <Center
        gap={{ base: '16px', sm: '20px', md: '24px' }}
        w={'full'}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Total Community Donation
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="neutral.11"
          >
            ${totalCommunityDonation.toFixed(2)}
          </Box>
        </VStack>
        <VStack align={'start'} flex="50%" w="full">
          <Box as="p" textStyle="body5" color={'neutral.8'}>
            Estimated Matching Amount
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color="neutral.11"
          >
            ${estimatedMatchingAmount.toFixed(2)}
          </Box>
        </VStack>
      </Center>
      <FundingChart data={data} />
    </VStack>
  );
};

export default FundingOverview;
