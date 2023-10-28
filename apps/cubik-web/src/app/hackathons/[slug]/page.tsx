import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Center, Container, VStack } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import { HackathonBody } from '../components/HackathonBody';
import { HackathonHeader } from '../components/HackathonHeader';

interface Props {
  params: { slug: string };
}
const fetchHackathon = async (slug: string) => {
  const res = await prisma.hackathon.findFirst({
    where: {
      slug: slug,
    },
  });

  return res;
};
export const metadata: Metadata = {
  title: 'Hackathon- Cubik',
  description: 'Browse hackathon and Cubik and support them',
  openGraph: {
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
  twitter: {
    title: 'Cubik',
    card: 'summary_large_image',
    images: [
      'https://res.cloudinary.com/demonicirfan/image/upload/v1692786112/OG-Grant_23_tbhrsg.png',
    ],
  },
};
const HackathonPage = async ({ params: { slug } }: Props) => {
  const hackathon = await fetchHackathon(slug);
  return (
    <>
      <Container p={'0'} maxW={'full'}>
        <VStack>
          <Center
            alignItems={'end'}
            w="full"
            p="0"
            h={{ base: '16rem', md: '20rem', lg: '24rem' }}
            position={'relative'}
            overflow={'hidden'}
            _before={{
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: { base: '16rem', md: '20rem', lg: '24rem' },
              background:
                'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
            }}
          >
            <Image
              src={hackathon?.background as string}
              alt={hackathon?.name as string}
              fill={true}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Center>
          <Container
            maxW="7xl"
            zIndex={'1'}
            transform={'translateY(-10rem)'}
            display="flex"
            flexDirection={'column'}
            gap="48px"
            px={{ base: '2rem', md: '3rem', xl: '1rem' }}
          >
            <HackathonHeader slug={slug} />
            <HackathonBody slug={slug} />
          </Container>
        </VStack>
      </Container>
    </>
  );
};

export default HackathonPage;
