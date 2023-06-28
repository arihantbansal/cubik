import { Center, Container, VStack } from '@chakra-ui/layout';
import Image from 'next/image';
import HackathonDetails from '~/components/pages/hackathons/hackathonDetails/HackathonDetails';

const HackathonDetail = () => {
  const hackathonData = {
    id: 1,
    name: 'Solana Speedrun',
    alias: 'speedrun',
    logo: 'https://res.cloudinary.com/demonicirfan/image/upload/v1687869347/Frame_236_kac5mk.png',
    background:
      'https://res.cloudinary.com/demonicirfan/image/upload/v1687936886/Frame_236_2_-min_gzlyed.png',
    short_description:
      'First ever Solana Virtual Game Jam hosted by Lamport DAO and Solana Graming Community',
    description: '',
    host: '',
    prize_pool: '',
    prize: '',
    timeline: '',
    social: '',
    team: '',
  };

  return (
    <Container p={'0'} maxW={'full'}>
      <VStack>
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
            src={hackathonData.background}
            alt={hackathonData.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Center>
        <HackathonDetails
          isLoading={false}
          logo={hackathonData.logo}
          name={hackathonData.name}
          short_description={hackathonData.short_description}
          background={hackathonData.background}
          description={hackathonData.description}
          host={hackathonData.host}
          prize_pool={hackathonData.prize_pool}
          prize={hackathonData.prize}
          timeline={hackathonData.timeline}
          social={hackathonData.social}
          team={hackathonData.team}
        />
      </VStack>
    </Container>
  );
};

export default HackathonDetail;
