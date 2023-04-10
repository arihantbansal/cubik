import { Box, Button, Center, Container, Flex, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse';
import DetailsSection from './DetailsSection';
import SplineAsset from './SplineAsset';

const MotionBox = motion(Box);

const BackgroundImageWrapper = ({
  imgURL,
  factor,
}: {
  imgURL: string;
  factor: number;
}) => {
  return (
    <MouseParallaxChild
      style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%,50%)',
        width: '100%',
        height: '100%',
      }}
      factorX={factor}
      factorY={factor}
    >
      <Box
        w={'90rem'}
        height="51rem"
        overflow={'hidden'}
        position={'absolute'}
        top="50%"
        left="50%"
        transform={'translate(-50%,-50%)'}
      >
        <Image
          src={imgURL}
          alt="hero background"
          layout="responsive"
          width={1200}
          height={800}
          objectFit="contain"
        />
      </Box>
    </MouseParallaxChild>
  );
};

const LandingPage = () => {
  const router = useRouter();

  return (
    <Container background="black" maxW="full" px="0">
      <Center bg="black" h={{ base: '38rem', md: '51rem' }} w="full">
        <Center background="black" position={'fixed'}>
          <Flex
            zIndex={'1'}
            h="60rem"
            w="100vw"
            maxW="90rem"
            _before={{
              content: '""',
              zIndex: '10',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '25vw',
              height: '100vh',
              background:
                'linear-gradient(90deg, #000000 1%, rgb(0 0 0 / 0%) 50%)',
            }}
            _after={{
              content: '""',
              zIndex: '10',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '25vw',
              height: '100vh',
              background:
                'linear-gradient(271deg, #000000 1%, rgb(0 0 0 / 0%) 50%)',
            }}
          >
            <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
              <Box position={'relative'} height="55rem" overflow="hidden">
                <Box
                  w={'90rem'}
                  h="55rem"
                  overflow={'hidden'}
                  position={'absolute'}
                  top="50%"
                  left="50%"
                  transform={'translate(-50%,-50%)'}
                >
                  <Image
                    src={'/images/6.PNG'}
                    alt="hero background"
                    layout="responsive"
                    width={1200}
                    height={600}
                    objectFit="contain"
                  />
                </Box>
              </Box>
              <BackgroundImageWrapper imgURL={'/images/4.PNG'} factor={0.1} />
              <BackgroundImageWrapper imgURL={'/images/3.PNG'} factor={0.15} />
              <BackgroundImageWrapper imgURL={'/images/2.PNG'} factor={0.0} />
              <BackgroundImageWrapper imgURL={'/images/1.PNG'} factor={0.25} />
            </MouseParallaxContainer>{' '}
          </Flex>
          <VStack
            zIndex={'2'}
            h="1rem"
            position={'absolute'}
            textAlign="center"
            mx="auto"
            maxW={'4xl'}
            alignItems={'center'}
            justify="center"
            gap={{ base: '0rem', md: '', lg: '1.4rem' }}
            px={{ base: '5rem', sm: '8rem', md: '8rem', lg: '2rem' }}
            pt={{ base: '4rem', md: '16rem' }}
          >
            <Center pt="2rem" w="full" flexDirection={'column'}>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0, duration: 1 },
                }}
                textTransform="uppercase"
                pb="0.4rem"
                as="p"
                textStyle={{
                  base: 'overline2',
                  lg: 'overline1',
                }}
                color="brand.teal4"
              >
                Join the Movement
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, y: 40 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0, duration: 1 },
                }}
                zIndex={1}
                as="p"
                lineHeight={{ base: '1.2', md: '1.4' }}
                textStyle={{
                  base: 'headline1',
                  md: 'display3',
                  lg: 'display1',
                }}
              >
                Fund Public Goods Through Community Voting On Solana
              </MotionBox>
            </Center>
            <MotionBox
              w="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              pt={{ base: '1rem', md: '0rem' }}
              flexDirection={{ base: 'column', md: 'row' }}
              maxW={{ base: '20rem', md: 'full' }}
              gap={{ base: '0.6rem', md: '1rem' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.15, duration: 1 },
              }}
            >
              <Button
                onClick={() => {
                  router.push('/projects');
                }}
                variant="primary"
              >
                Explore Projects
              </Button>
              <Button
                onClick={() => {
                  router.push('/connect-wallet');
                }}
                variant="secondary"
              >
                Get Started
              </Button>
            </MotionBox>
            <Center
              transform={{
                base: 'translateY(-1rem)',
                md: 'translateY(-1rem)',
              }}
              zIndex="0"
              minH={{ base: '280px', md: '600px', lg: '700px' }}
            >
              <SplineAsset />
            </Center>
          </VStack>
        </Center>
      </Center>
      <Center
        position={'relative'}
        h="full"
        w="full"
        zIndex="1"
        background={'black'}
        borderRadius="50px 50px 0px 0px"
      >
        <DetailsSection />
      </Center>
    </Container>
  );
};

export default LandingPage;
