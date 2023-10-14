import { Center, Skeleton, VStack } from "@chakra-ui/react";
import { isPast } from "date-fns";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";
import FundingRoundBanner from "./FundingRoundBanner";
import GrantsCarousel from "./GrantsCaruosel";
import RoundsCarouselLoadingState from "./LoadingState";
import { ProjectExploreBanner } from "@cubik/common-types";

const ExplorePageHeader = ({ banner }: { banner: ProjectExploreBanner[] }) => {
  console.log(banner);
  //const { data: roundData, isLoading, isError } = trpc.round.findActive.useQuery(); // optimise this

  // const activeAndFutureRounds = roundData?.filter((round: { endTime: number | Date }) =>
  //   isPast(round.endTime) ? null : round,
  // );

  // if (banner?.length === 0) {
  //   return (
  //     <Center
  //       w="full"
  //       py={{ base: '16px', sm: '24px' }}
  //       border="1px dashed"
  //       borderColor={'#1D1F1E'}
  //       rounded="12px"
  //     >
  //       <ComponentErrors />
  //     </Center>
  //   );
  // }

  return (
    <VStack w="full">
      {/* // todo: loading state here */}
      {/* {banner.length === 0 ? (
        <>
          <RoundsCarouselLoadingState />
        </>
      ) : ( */}
      <GrantsCarousel>
        {banner ? (
          banner?.map((resource_distribution_event) => (
            <FundingRoundBanner
              key={resource_distribution_event.id}
              startDate={new Date(resource_distribution_event.startTime)}
              endDate={new Date(resource_distribution_event.endTime)}
              id={resource_distribution_event.id}
              name={resource_distribution_event.name}
              description={resource_distribution_event?.shortDescription || ""}
              matchingPool={resource_distribution_event.matchingPool}
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
      {/* )} */}
    </VStack>
  );
};

export default ExplorePageHeader;
