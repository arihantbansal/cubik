import { Center, Skeleton, VStack } from '@chakra-ui/react';
import { isPast } from 'date-fns';
import ComponentErrors from '~/components/errors/ComponentErrors';
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
  // filter round data with only active rounds and future rounds
  const activeAndFutureRounds = roundData?.filter(
    (round: { endTime: number | Date }) =>
      isPast(round.endTime) ? null : round
  );

  if (isError) {
    return (
      <Center
        w="full"
        py={{ base: '16px', sm: '24px' }}
        border="1px dashed"
        borderColor={'#1D1F1E'}
        rounded="12px"
      >
        <ComponentErrors />
      </Center>
    );
  }

  return (
    <VStack
      // display={
      //   activeAndFutureRounds && activeAndFutureRounds?.length > 0
      //     ? 'flex'
      //     : 'none'
      // }
      w="full"
    >
      {isLoading ? (
        <>
          <RoundsCarouselLoadingState />
          {/* <Center w="full" py="16px">
            <Skeleton w="12rem" height="6px" />
          </Center> */}
        </>
      ) : (
        <GrantsCarousel>
          {activeAndFutureRounds ? (
            activeAndFutureRounds?.map((round) => (
              <FundingRoundBanner
                key={round.id}
                startDate={round.startTime}
                endDate={round.endTime}
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
