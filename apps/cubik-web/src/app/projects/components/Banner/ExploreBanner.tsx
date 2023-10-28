import React from 'react';
import type { ProjectExploreBanner } from '@/types/explorer';
import { Center, Skeleton, VStack } from '@/utils/chakra';

import { GrantsCarousel } from '../carousel/grants';
import FundingRoundBanner from './FundingBanner';
import { RoundsCarouselLoadingState } from './LoadingState';

interface Props {
  banner: ProjectExploreBanner[];
}
export const ExploreBanner = ({ banner }: Props) => {
  return (
    <>
      <VStack display={{ base: 'none', md: 'flex' }} w="full">
        <GrantsCarousel>
          {banner ? (
            banner?.map((resource_distribution_event) => (
              <FundingRoundBanner
                background={resource_distribution_event.bgImage}
                event={resource_distribution_event.type}
                key={resource_distribution_event.id}
                submissionEndDate={
                  new Date(resource_distribution_event.submissionEndDate)
                }
                startDate={new Date(resource_distribution_event.startTime)}
                endDate={new Date(resource_distribution_event.endTime)}
                id={resource_distribution_event.id}
                name={resource_distribution_event.name}
                description={
                  resource_distribution_event?.shortDescription || ''
                }
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
      </VStack>
    </>
  );
};
