import { Box, Card, HStack, Skeleton, Stack, VStack } from '@chakra-ui/react';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { trpc } from '~/utils/trpc';

const UserDetails = ({
  isLoading,
  userId,
}: {
  isLoading: boolean;
  userId: string;
}) => {
  const { data, error, isError } =
    trpc.contribution.getUserContributions.useQuery({ userId: userId });

  if (isError) {
    return <ComponentErrors error={error} />;
  }
  const userTotalContributionsAmount = data?.reduce((acc, contribution) => {
    return acc + contribution.usdTotal;
  }, 0);

  const userLastDonationAmount = data
    ? data[(data?.length as number) - 1]?.usdTotal
    : 0;

  console.log('usercontribution', userTotalContributionsAmount);

  return (
    <VStack align="start" w="full" gap={{ base: '16px', md: '24px' }}>
      <Skeleton
        isLoaded={!isLoading}
        opacity={isLoading ? '0.5' : 1}
        fadeDuration={3}
      >
        <Box
          as="p"
          textStyle={{ base: 'title4', md: 'title3' }}
          color="neutral.11"
        >
          Funding
        </Box>
      </Skeleton>
      <Stack
        w="full"
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '24px', md: '32px' }}
      >
        <Card
          minH="12rem"
          justify={'space-between'}
          p={{ base: '16px', md: '24px' }}
        >
          <VStack align={'start'} gap="8px">
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={3}
            >
              <Box
                as="p"
                color="neutral.8"
                textStyle={{ base: 'body5', md: 'body4' }}
              >
                Donations
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={3}
            >
              <Box
                as="p"
                color="neutral.11"
                textStyle={{ base: 'title3', sm: 'title2', md: 'title1' }}
              >
                ${userTotalContributionsAmount}
              </Box>
            </Skeleton>
          </VStack>
          <Skeleton
            isLoaded={!isLoading}
            opacity={isLoading ? '0.3' : 1}
            fadeDuration={3}
          >
            <HStack
              w={{ base: 'full', sm: '14.5rem' }}
              justifyContent={'space-between'}
              alignItems="end"
            >
              <Box
                as="p"
                color="neutral.8"
                textStyle={{ base: 'body6', md: 'body5' }}
              >
                Last Donation
              </Box>
              <Box as="p" color="neutral.11" textStyle="title4">
                {userLastDonationAmount === 0 && !userLastDonationAmount
                  ? '--'
                  : `$${userLastDonationAmount}`}
              </Box>
            </HStack>
          </Skeleton>
        </Card>
        <Card
          p={{ base: '16px', md: '24px' }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: '48px', md: '80px' }}
          w={{ base: '100%', md: 'auto' }}
        >
          <VStack align={'start'} gap="8px">
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={3}
            >
              <Box
                as="p"
                color="neutral.8"
                textStyle={{ base: 'body5', md: 'body4' }}
              >
                Funds Raised
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={3}
            >
              <Box
                as="p"
                color="neutral.11"
                textStyle={{ base: 'title3', sm: 'title2', md: 'title1' }}
              >
                $00
              </Box>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={4}
            >
              {/* <Box
                as="p"
                color="#73FF9A"
                backgroundColor={'#042919'}
                rounded="full"
                p="0.4rem 0.8rem"
                textStyle={{ base: 'body5', md: 'body4' }}
              >
                + $00
              </Box> */}
            </Skeleton>
          </VStack>
          <VStack align={'start'} gap={{ base: '8px', md: '12px' }}>
            <Skeleton
              fadeDuration={3}
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
            >
              <HStack
                w={{ base: 'full', md: '14rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Grants
                </Box>
                <Box as="p" color="neutral.11" textStyle="title4">
                  -
                </Box>
              </HStack>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={4}
            >
              <HStack
                w={{ base: 'full', md: '14rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Community
                </Box>
                <Box as="p" color="neutral.11" textStyle="title4">
                  -
                </Box>
              </HStack>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={5}
            >
              <HStack
                w={{ base: 'full', md: '14rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Tipping
                </Box>
                <Box as="p" color="neutral.11" textStyle="title4">
                  -
                </Box>
              </HStack>
            </Skeleton>
            <Skeleton
              isLoaded={!isLoading}
              opacity={isLoading ? '0.3' : 1}
              fadeDuration={6}
            >
              <HStack
                w={{ base: 'full', md: '14rem' }}
                justifyContent={'space-between'}
                alignItems="end"
              >
                <Box
                  as="p"
                  color="neutral.8"
                  textStyle={{ base: 'body6', md: 'body5' }}
                >
                  Hackathons
                </Box>
                <Box as="p" color="neutral.11" textStyle="title4">
                  -
                </Box>
              </HStack>
            </Skeleton>
          </VStack>
        </Card>
      </Stack>
    </VStack>
  );
};

export default UserDetails;
