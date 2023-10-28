import React from 'react';
import { RoundStatus } from '@/app/components/common/dates/roundStatus';
import { Box, Center, HStack, Skeleton, Stack, VStack } from '@/utils/chakra';

interface Props {
  isLoading: boolean;
  startTime: Date;
  endTime: Date;
  roundName: string;
  shortDescription: string;
  matchingPool: number;
}

export const GrantDetailsHeader = (props: Props) => {
  return (
    <>
      <VStack w="full" align={'start'} gap={{ base: '28px', md: '40px' }}>
        <VStack w="full" align={'start'} gap={{ base: '8px', md: '8px' }}>
          <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
            <Skeleton
              isLoaded={!props.isLoading}
              fadeDuration={0.5}
              opacity={props.isLoading ? '0.5' : '1'}
              rounded="full"
            >
              <RoundStatus
                show={true}
                startDate={props?.startTime}
                endDate={props?.endTime}
              />
            </Skeleton>
            <VStack align={'start'} spacing={{ base: '12px', md: '24px' }}>
              <Skeleton
                isLoaded={!props.isLoading}
                fadeDuration={2}
                opacity={props.isLoading ? '0.6' : '1'}
              >
                <Box
                  as="p"
                  textStyle={{ base: 'display5', md: 'display3' }}
                  color={'neutral.11'}
                >
                  {props?.roundName}
                </Box>
              </Skeleton>
              <Skeleton
                isLoaded={!props.isLoading}
                fadeDuration={1.5}
                opacity={props.isLoading ? '0.6' : '1'}
              >
                <Box
                  as="p"
                  textStyle={{ base: 'body2', md: 'body1' }}
                  color={'neutral.9'}
                >
                  {props.shortDescription}
                </Box>
              </Skeleton>
            </VStack>
          </VStack>
          <Stack
            justify={'space-between'}
            align={{ base: 'center', md: 'end' }}
            direction={{ base: 'row', md: 'row' }}
            spacing={{ base: '12px', md: '24px' }}
            w="full"
          >
            <Stack
              w={{ base: 'full', md: 'auto' }}
              align={{ base: 'start', md: 'center' }}
              flexDir={{ base: 'column', md: 'row' }}
              pt="12px"
              pb={{ base: '12px', md: '0px' }}
              gap={{ base: '0px', md: '24px' }}
            >
              <Skeleton
                isLoaded={!props.isLoading}
                fadeDuration={2}
                opacity={props.isLoading ? '0.4' : '1'}
              >
                <Stack
                  direction={{ base: 'row', md: 'row' }}
                  spacing="4px"
                  align={'baseline'}
                >
                  <HStack gap="4px" align="center" justify="start">
                    <Center
                      w="10px"
                      h="10px"
                      backgroundColor="surface.green.2"
                      rounded="full"
                    />
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color={'neutral.11'}
                    >
                      ${props?.matchingPool}
                    </Box>
                  </HStack>
                  <Box
                    as="p"
                    textStyle={{ base: 'overline4', md: 'overline3' }}
                    color={'neutral.11'}
                  >
                    Matching Pool
                  </Box>
                </Stack>
              </Skeleton>
              <Skeleton
                isLoaded={!props.isLoading}
                fadeDuration={2}
                opacity={props.isLoading ? '0.4' : '1'}
              >
                <HStack gap="4px" align="center" justify="start">
                  <Center
                    w="10px"
                    h="10px"
                    backgroundColor="surface.teal.2"
                    rounded="full"
                  />
                  <HStack spacing="4px" align={'baseline'}>
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color={'neutral.8'}
                    >
                      {/* {data?.ProjectJoinRound.filter(
                        (e) => e.status === "APPROVED"
                      ).length ?? 0} */}
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'overline4', md: 'overline3' }}
                      color={'neutral.8'}
                    >
                      Projects Participating
                    </Box>
                  </HStack>
                </HStack>
              </Skeleton>
            </Stack>
          </Stack>
        </VStack>
        <VStack spacing="16px" align="start">
          <Skeleton
            isLoaded={!props.isLoading}
            fadeDuration={2.5}
            opacity={props.isLoading ? '0.3' : '1'}
          >
            <Box
              as="p"
              textStyle={{ base: 'overline4', md: 'overline2' }}
              color={'neutral.11'}
            >
              Grant Sponsors
            </Box>
          </Skeleton>
          {/* <GrantSponsors
            endDate={data?.endTime}
            isLoading={false}
            grantName={data?.roundName}
            grantId={data?.id}
          /> */}
        </VStack>
        {/* <SelectProjectToApplyForGrant
          isOpen={isOpen}
          onClose={onClose}
          selectedGrantRound={selectedGrantRound}
        /> */}
      </VStack>
    </>
  );
};
