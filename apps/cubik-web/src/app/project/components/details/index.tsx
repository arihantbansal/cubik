import React from 'react';
import type { ProjectPageDetailsType } from '@/types/project';
import { Box, Container, VStack } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { Comments } from './comments';
import { Description } from './description';
import { RoundStats } from './RoundStats';
import { Socials } from './Socials';
import { ProjectTags } from './tags';

const getDetails = async (
  slug: string,
): Promise<[ProjectPageDetailsType | null, Error | null]> => {
  try {
    const res = await prisma.project.findFirst({
      where: {
        slug: slug,
      },
      select: {
        id: true,
        name: true,
        industry: true,
        longDescription: true,
        discordLink: true,
        twitterHandle: true,
        telegramLink: true,
        githubLink: true,
        slides: true,
        projectLink: true,
      },
    });
    return [res, null];
  } catch (error) {
    console.log(error);
    return [null, error as Error];
  }
};

interface Props {
  slug: string;
}

export const DetailSection = async ({ slug }: Props) => {
  const [details, error] = await getDetails(slug);
  if (error) {
    console.log(error);
    return <>error</>;
  }

  return (
    <>
      <Container
        display={'flex'}
        flexDirection={{
          base: 'column-reverse',
          lg: 'row',
        }}
        w={'full'}
        maxW={'7xl'}
        mx={'auto'}
        gap={10}
      >
        <VStack align={'start'} w="full">
          <VStack gap={5} align={'start'}>
            <Box color={'white'} fontWeight={700} fontSize={'xl'}>
              About {details?.name}
            </Box>
            <Description longDescription={details?.longDescription || ''} />
            <Box bg="#1E1E1E" w={'full'} h={'0.5'} />
            <Comments />
          </VStack>
        </VStack>
        <VStack
          w={'full'}
          align={'start'}
          maxW={{
            base: 'full',
            lg: 'sm',
          }}
          gap={8}
          color={'white'}
        >
          <ProjectTags tags={details?.industry || ''} />
          <RoundStats />
          <Socials
            projectLink={details?.projectLink}
            discordLink={details?.discordLink}
            telegramLink={details?.telegramLink}
            twitterHandle={details?.twitterHandle}
            githubLink={details?.githubLink}
          />
        </VStack>
      </Container>
    </>
  );
};
