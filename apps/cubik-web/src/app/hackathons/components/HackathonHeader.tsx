import React from 'react';
import Image from 'next/image';
import { Box, HStack, Stack, VStack } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { HackathonStatus } from './HackathonStatus';
import { SubmitNowButton } from './SubmitNowButton';

interface Props {
  slug: string;
}
const fetchHackathon = async (slug: string) => {
  const res = await prisma.hackathon.findFirst({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      logo: true,
      shortDescription: true,
      hackathonEndDate: true,
      hackathonStartDate: true,
      votingEndDate: true,
      votingStartDate: true,
      resultDate: true,
      registrationEndDate: true,
      registrationStartDate: true,
      hackathonSponsors: {
        select: {
          name: true,
        },
      },
    },
  });

  return res;
};
export const HackathonHeader = async ({ slug }: Props) => {
  const hackathon = await fetchHackathon(slug);

  return (
    <>
      <VStack w="full" gap="24px" align={'start'}>
        <Image
          alt="hackathon logo"
          loading="lazy"
          style={{
            borderRadius: '12px',
            backgroundColor: '#1C1C1C',
          }}
          width={100}
          height={100}
          src={hackathon?.logo as string}
        />
        <Stack
          gap={{ base: '16px', md: '24px', lg: '12vw' }}
          w="full"
          alignItems="end"
          direction={{ base: 'column', lg: 'row' }}
        >
          <VStack flex={3} alignItems="start" w="full" spacing="16px">
            <HStack>
              <Box
                as="p"
                textStyle={{ base: 'title1', md: 'headline3' }}
                textTransform="capitalize"
                color="neutral.11"
                noOfLines={1}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {hackathon?.name}
              </Box>
              <HackathonStatus
                hackathonStartDate={hackathon?.hackathonStartDate as Date}
                registrationEndDate={hackathon?.registrationEndDate as Date}
                registrationStartDate={hackathon?.registrationStartDate as Date}
                resultDate={hackathon?.resultDate as Date}
                votingEndDate={hackathon?.votingEndDate as Date}
                votingStartDate={hackathon?.votingStartDate as Date}
                hackathonEndDate={hackathon?.hackathonEndDate as Date}
                show={true}
              />
            </HStack>

            <Box
              as="p"
              textStyle={{ base: 'body4', md: 'body2' }}
              color="neutral.9"
              noOfLines={2}
              textOverflow="ellipsis"
            >
              {hackathon?.shortDescription}
            </Box>
          </VStack>
          <VStack w={'full'} alignItems="start" flex={1.5} spacing="16px">
            <SubmitNowButton
              id={hackathon?.id as string}
              logo={hackathon?.logo as string}
              name={hackathon?.name as string}
              shortDescription={hackathon?.shortDescription as string}
              tracks={
                hackathon?.hackathonSponsors.map((sponsor) => {
                  return {
                    value: sponsor.name,
                    label: sponsor.name,
                  };
                }) || []
              }
            />
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};
