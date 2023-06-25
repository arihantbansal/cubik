import { Center, Container, VStack } from '@chakra-ui/layout';
import Image from 'next/image';
import HackathonDetails from '~/components/pages/hackathons/hackathonDetails/HackathonDetails';

const HackathonDetail = () => {
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
            src={
              'https://res.cloudinary.com/demonicirfan/image/upload/v1685650788/Frame_141_d02pxf.png'
            }
            alt={'hackathon'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Center>
        <HackathonDetails />
      </VStack>
    </Container>
  );
};

export default HackathonDetail;
