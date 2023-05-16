import { VStack } from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import FundingRoundBanner from './FundingRoundBanner';
import GrantsCarousel from './GrantsCaruosel';
import RoundsCarouselLoadingState from './LoadingState';

const ExplorePageHeader = () => {
  const {
    data: roundData,
    isLoading,
    isError,
  } = trpc.round.findActive.useQuery();

  return (
    <VStack w="full">
      {isLoading ? (
        <RoundsCarouselLoadingState />
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
            <RoundsCarouselLoadingState />
          )}
        </GrantsCarousel>
      )}
    </VStack>
  );
};

export default ExplorePageHeader;
