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
  base: '44rem',
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

const HeroBackground = () => {
  return (
    //<Center
    // height="100vh"
    //border="1px solid green"
    // alignSelf={'center'}
    // border="1px solid red"
    // position={'absolute'}
    // w="100rem"
    // height={'100vh'}
    // alignItems={'bottom'}
    // w="100vw"
    // minH={{ base: '100rem', md: '130rem', lg: '190rem', xl: '160vh' }}
    // border={{
    //   base: '1px solid blue',
    //   md: '1px solid red',
    //   lg: '1px solid green',
    // }}
    // minW="90rem"
    // maxW="130rem"
    // overflow="hidden"
    // _before={{
    //   content: '""',
    //   zIndex: '10',
    //   position: 'relative',
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   width: '25vw',
    //   background: 'linear-gradient(90deg, #000000 1%, rgb(0 0 0 / 0%) 50%)',
    // }}
    // _after={{
    //   content: '""',
    //   zIndex: '10',
    //   position: 'absolute',
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    //   width: '25vw',
    //   background: 'linear-gradient(271deg, #000000 1%, rgb(0 0 0 / 0%) 50%)',
    // }}
    //>
    {
      /* <Center
        position={'relative'}
        mb="100%"
        top="0"
        left="0"
        background="red"
        width={{ base: '200vw', sm: '150vw', md: '100vw', xl: '100vw' }}
        border={'1px solid yellow'}
        height="fit-content"
      >
          <Image
            src="/images/5.PNG"
            alt="hero background"
            width={2000}
            height={1000}
          />
        </MouseParallaxChild>
      </Center>
      <Center
        position={'absolute'}
        width={{ base: '200vw', sm: '150vw', md: '200vw', xl: '200vw' }}
        transform={'translateY(100%)'}
        background="green"
        height="fit-content"
        bgImage={'/images/5.PNG'}
      >  
     <MouseParallaxChild factorX={0.1} factorY={0.06} >
          <Image
            src="/images/4.PNG"
            alt="hero background"
            width={1000}
            height={300}
          />
         {/* </MouseParallaxChild> 
     </Center>  <Center
        alignItems={'end'}
        objectPosition="center"
        position="absolute"
        height={'100%'}
      >
        <MouseParallaxChild
          style={{ height: 'full', objectPosition: 'center' }}
          factorX={0.15}
          factorY={0.07}
        >
          <Image
            src="/images/3.PNG"
            style={{
              objectPosition: 'center',
              objectFit: 'contain',
            }}
            alt="hero background"
            width={5000}
            height={5000}
          />
        </MouseParallaxChild>{' '}
      </Center>
      <Center alignItems={'end'} w="100%" height={'100%'}>
        <MouseParallaxChild
          style={{
            height: 'full',
            position: 'absolute',
          }}
          factorX={0.1}
          factorY={0.08}
        >
          <Image
            src="/images/2.PNG"
            alt="hero background"
            style={{
              objectPosition: 'center',
              objectFit: 'contain',
            }}
            width={5000}
            height={5000}
          />
        </MouseParallaxChild>{' '}
      </Center>
      <Center
        alignItems={'end'}
        objectPosition="center"
        position="absolute"
        height={'100%'}
      >
        <MouseParallaxChild
          style={{ height: 'full', objectPosition: 'center' }}
          factorX={0.25}
          factorY={0.09}
        >
          <Image
            src="/images/1.PNG"
            style={{
              objectPosition: 'center',
              objectFit: 'contain',
            }}
            alt="hero background"
            width={2000}
            height={3000}
          />
        </MouseParallaxChild>
      </Center> */
    }
    // </Center>
  );
};

const LandingPage = () => {
  const router = useRouter();

  return (
    <Container background="black" maxW="full" px="0">
      <Center p="0" maxW="100vw" width="full">
        <Center top="0" position={'fixed'}>
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
