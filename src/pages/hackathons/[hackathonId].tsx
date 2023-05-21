import { Center, Container, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import HackathonDetails from '~/components/pages/hackathons/hackathonDetails/HackathonDetails';

const HackathonDetail = () => {
  return (
    <Container p="0" maxW={'full'}>
      <VStack>
        <Center
          alignItems={'end'}
          justifyContent={'end'}
          w="100vw"
          h={{ base: '10rem', md: '12rem', lg: '16rem' }}
          position={'relative'}
          overflow={'hidden'}
          _before={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: { base: '10rem', md: '12rem', lg: '16rem' },
            background:
              'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          }}
        >
          <Image
            src={
              'https://media-fastly.hackerearth.com/media/hackathon/grizzlython-a-global-online-solana-hackathon/images/f77e67b4b8-hackerearth---2700x600.png'
            }
            width={8000}
            height={8000}
            alt={'hackathon'}
          />
        </Center>
        <HackathonDetails />
      </VStack>
    </Container>
  );
};

export default HackathonDetail;
