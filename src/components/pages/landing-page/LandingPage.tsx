import { Box, Button, Center, Container, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse';
import DetailsSection from './DetailsSection';
import SplineAsset from './SplineAsset';

const MotionBox = motion(Box);
const height = {
  base: '100vh',
  sm: '44rem',
  md: '60rem',
  lg: '74rem',
  xl: '75rem',
};
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
        top: '0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      factorX={factor}
      factorY={factor}
    >
      <Box
        display={'flex'}
        alignItems={'end'}
        overflow={'hidden'}
        pt={{
          base: '92rem',
          sm: '90rem',
          md: '130rem',
          lg: '150rem',
          xl: '160rem',
        }}
        objectFit="fill"
        width={{
          base: '140vw',
          sm: '130vw',
          md: '180vw',
          lg: '140vw',
          xl: '90vw',
        }}
        height={height}
        position="absolute"
      >
        <Image
          src={imgURL}
          alt="hero background"
          layout="responsive"
          width={500}
          height={800}
        />
      </Box>
    </MouseParallaxChild>
  );
};

const LandingPage = () => {
  const router = useRouter();

  return (
    <Container background="black" maxW="full" px="0">
      <Center p="0" maxW="100vw" width="full">
        <Center top={{ base: '-1rem', md: '5rem' }} position={'fixed'}>
          <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
            <Center
              _before={{
                content: '""',
                zIndex: '10',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '25vw',
                height: height,
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
                height: height,
                background:
                  'linear-gradient(271deg, #000000 1%, rgb(0 0 0 / 0%) 50%)',
              }}
              width={{
                base: '140vw',
                sm: '130vw',
                md: '180vw',
                lg: '140vw',
                xl: '90vw',
              }}
              position={'relative'}
            >
              <Box
                display={'flex'}
                alignItems={'top'}
                overflow={'hidden'}
                objectFit="fill"
                pt="100rem"
                width={{
                  base: '140vw',
                  sm: '130vw',
                  md: '180vw',
                  lg: '140vw',
                  xl: '90vw',
                }}
                height={{
                  base: '40rem',
                  sm: '60rem',
                  md: '60rem',
                  lg: '140rem',
                }}
                position="absolute"
              >
                <Image
                  src={'/images/6.PNG'}
                  alt="hero background"
                  layout="responsive"
                  width={500}
                  height={800}
                />
              </Box>
              <BackgroundImageWrapper imgURL={'/images/4.PNG'} factor={0.1} />
              <BackgroundImageWrapper imgURL={'/images/3.PNG'} factor={0.15} />
              <BackgroundImageWrapper imgURL={'/images/2.PNG'} factor={0.0} />
              <BackgroundImageWrapper imgURL={'/images/1.PNG'} factor={0.25} />
            </Center>
            <VStack
              h={height}
              textAlign="center"
              mx="auto"
              maxW={'4xl'}
              alignItems={'center'}
              justify="center"
              gap={{ base: '0rem', md: '', lg: '2rem' }}
              px={{ base: '5rem', sm: '8rem', md: '8rem', lg: '2rem' }}
              pt={{ base: '6rem', md: '8vh' }}
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
                  lineHeight={{ base: '1.2', md: '' }}
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
          </MouseParallaxContainer>
        </Center>
      </Center>
      <DetailsSection height={height} />
    </Container>
  );
};

export default LandingPage;
