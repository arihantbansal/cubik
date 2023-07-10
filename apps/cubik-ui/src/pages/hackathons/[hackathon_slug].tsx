import { Center, Container, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import HackathonDetails from '~/components/pages/hackathons/hackathonDetails/HackathonDetails';
import SEO from '~/components/SEO';
import { trpc } from '~/utils/trpc';

const HackathonDetail = (props: { slug: string; share: boolean }) => {
  console.log(props);
  const { data, isLoading } = trpc.hackathon.get.useQuery(
    {
      slug: props.slug,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <SEO
        title={`Speedrun`}
        description={`First ever Solana Virtual Game Jam hosted by Lamport DAO and Solana Graming Community`}
        image={
          props.share
            ? 'https://res.cloudinary.com/demonicirfan/image/upload/v1688145530/OG-Grant_11_mchdyq.png'
            : 'https://res.cloudinary.com/demonicirfan/image/upload/v1688128772/OG-Grant_10_jlqdjx.png'
        }
      />
      <Container p={'0'} maxW={'full'}>
        <VStack>
          <Skeleton
            isLoaded={!isLoading}
            opacity={isLoading ? '0.1' : '1'}
            fadeDuration={2}
          >
            <Center
              alignItems={'end'}
              w="100vw"
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
                src={data?.background as string}
                alt={data?.name as string}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </Center>
          </Skeleton>
          <HackathonDetails
            team={data?.team ?? []}
            id={(data?.id as string) ?? ''}
            isLoading={isLoading}
            logo={data?.logo}
            name={data?.name}
            short_description={data?.short_description}
            background={data?.background}
            description={data?.description}
            host={data?.host}
            prize_pool={data?.prize_pool}
            prize={data?.prize}
            timeline={data?.timeline}
            social={data?.social}
          />
        </VStack>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hackathon_slug = context.params?.hackathon_slug;
  const hasShare = context.query.share;

  return {
    props: {
      slug: hackathon_slug,
      share: hasShare ?? false,
    },
  };
};

export default HackathonDetail;
