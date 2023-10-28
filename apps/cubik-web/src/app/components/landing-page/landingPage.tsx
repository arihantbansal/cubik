'use client';

import Image from 'next/legacy/image';
import Link from 'next/link';
import { Box, Button, Center, Container, Flex, VStack } from '@/utils/chakra';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
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
        zIndex: '1',
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
        w={{ base: '50rem', md: '80rem' }}
        height={{ base: '37rem', md: '58rem' }}
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
          height={1170}
          objectFit="contain"
        />
      </Box>
    </MouseParallaxChild>
  );
};

const LandingPage = () => {
  const { setVisible } = useWalletModal();
  const wallet = useWallet();
  return (
    <Container mt="4.5rem" background="black" maxW="full" px="0">
      <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <Center bg="black" height={{ base: '37rem', md: '56rem' }} w="full">
          <Center overflow={'hidden'} background="black" position={'fixed'}>
            <Flex
              overflow={'hidden'}
              zIndex={'1'}
              h="60rem"
              w="80rem"
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
              <Box position={'relative'} h="56rem" w="100vw" overflow="hidden">
                <Box
                  w={'80rem'}
                  h="57rem"
                  overflow={'hidden'}
                  position={'absolute'}
                  top="50%"
                  left="50%"
                  transform={'translate(-50%,-50%)'}
                >
                  <Image
                    // background Image
                    src={'https://d1yweukyu067aq.cloudfront.net/images/6.png'}
                    alt="hero background"
                    layout="responsive"
                    width={1200}
                    height={600}
                    objectFit="contain"
                  />
                </Box>
              </Box>
              <BackgroundImageWrapper
                imgURL={'https://d1yweukyu067aq.cloudfront.net/images/4.png'}
                factor={0.1}
              />
              <BackgroundImageWrapper
                imgURL={'https://d1yweukyu067aq.cloudfront.net/images/3.png'}
                factor={0.15}
              />
              <BackgroundImageWrapper
                imgURL={'https://d1yweukyu067aq.cloudfront.net/images/2.PNG'}
                factor={0.0}
              />
              <BackgroundImageWrapper
                imgURL={'https://d1yweukyu067aq.cloudfront.net/images/1.PNG'}
                factor={0.25}
              />
            </Flex>
            <VStack
              mt={{ base: '4.8rem', md: '5rem' }}
              zIndex={'2'}
              h="1rem"
              position={'absolute'}
              textAlign="center"
              mx="auto"
              maxW={{ base: '100vw', md: '4xl' }}
              alignItems={'center'}
              justify="center"
              gap={{ base: '0rem', lg: '1.4rem' }}
              px={{ base: '1rem', md: '8rem', lg: '2rem' }}
              pt={'1rem'}
            >
              <Center
                maxW={{ base: '30rem', md: 'full' }}
                pt="1rem"
                w="full"
                flexDirection={'column'}
              >
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
                    base: 'overline3',
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
                    base: 'headline2',
                    md: 'display3',
                    lg: 'display1',
                  }}
                >
                  Fund Public Goods Through Community Voting On Solana
                </MotionBox>
              </Center>
              <MotionBox
                w="md"
                px={{ base: '1rem', md: '0' }}
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
                {!wallet.connected && (
                  <Button
                    onClick={() => setVisible(true)}
                    variant="cubikFilled"
                    size="cubikMedium"
                  >
                    Connect Wallet
                  </Button>
                )}
                <Link href="/projects">
                  <Button
                    variant="cubikOutlined"
                    size="cubikMedium"
                    maxW="18rem"
                  >
                    Explore Projects
                  </Button>
                </Link>
              </MotionBox>
              <Center
                transform={{
                  base: 'translateY(-1rem)',
                  md: 'translateY(0rem)',
                }}
                zIndex="0"
                minH={{ base: '280px', md: '500px' }}
              >
                <SplineAsset />
              </Center>
            </VStack>
          </Center>
        </Center>
      </MouseParallaxContainer>
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
