import { Center, Skeleton, VStack } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import FundingRoundBanner from './FundingRoundBanner';
import GrantsCarousel from './GrantsCaruosel';
import RoundsCarouselLoadingState from './LoadingState';

const ExplorePageHeader = () => {
  const {
    data: roundData,
    isLoading,
    isError,
  } = trpc.round.findActivePresentAndFutureRounds.useQuery();
  return (
    <VStack w="full">
      {isLoading ? (
        <>
          <RoundsCarouselLoadingState />
          <Center w="full" py="16px">
            <Skeleton w="12rem" height="6px" />
          </Center>
        </>
      ) : (
        <GrantsCarousel>
          {roundData ? (
            roundData?.map((round) => (
              <FundingRoundBanner
                key={round.id}
                startDate={round.startTime}
                endDate={round.endtime}
                roundId={round.id}
                roundName={round.roundName}
                roundDescription={round.short_description}
                matchingPool={round.matchedPool}
              />
            ))
          ) : (
            <>
              <RoundsCarouselLoadingState />
              <Center w="full" py="16px">
                <Skeleton w="12rem" height="6px" />
              </Center>
            </>
          )}
        </GrantsCarousel>
      )}
    </VStack>
  );
};

export default ExplorePageHeader;
