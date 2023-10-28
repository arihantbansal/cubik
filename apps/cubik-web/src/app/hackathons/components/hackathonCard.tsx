import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Center, HStack, LinkBox, VStack } from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatWithK';

interface Props {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  prizePool: number;
  background: string;
}

export const HackathonCard = (props: Props) => {
  return (
    <>
      <Link
        key={props.id}
        style={{
          width: '100%',
        }}
        href={'/hackathons/' + props.slug}
      >
        <LinkBox
          display={'flex'}
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          justifyContent="space-between"
          key={props.id}
          border={'1px solid'}
          borderColor="#ffffff10"
          transition="all 0.3s ease-in-out"
          _hover={{
            borderColor: '#ffffff10',
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            shadow: '2xl',
          }}
          backgroundColor="#080808"
          p={'0'}
          w="full"
          rounded="20px"
          position="relative"
          overflow={'hidden'}
          textAlign={'start'}
        >
          <HStack
            position={'relative'}
            align="start"
            w="full"
            spacing={{ base: '32px', md: '24px' }}
          >
            {/* hackathon image */}
            <Center
              position={'absolute'}
              w="40rem"
              top="0%"
              h="full"
              right="0%"
              //  transform="translate(-50%, 0%)"
            >
              <Center
                zIndex={'0'}
                alignItems={'end'}
                w="40rem"
                h={'14rem'}
                position={'relative'}
                overflow={'hidden'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '14rem',
                  w: '40rem',
                  background:
                    'linear-gradient(90deg, #080808 0%, #08080800 100%)',
                  zIndex: 1,
                }}
              >
                <Image
                  src={props.background}
                  alt={'hackathon'}
                  layout="fill"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Center>
            </Center>
            <HStack
              w="full"
              gap={{ base: '14px', md: '18px' }}
              align={'start'}
              zIndex={'1'}
              p="28px"
            >
              {/* hackathon avatar */}
              {/* <SkeletonCircle
                                isLoaded={!upcomingHackathonsIsLoading}
                                fadeDuration={2}
                                opacity={
                                  upcomingHackathonsIsLoading ? '0.6' : '1'
                                }
                                width={{ base: '5.5rem', md: '7rem' }}
                                height={{ base: '5.5rem', md: '7rem' }}
                              >
                                <Avatar
                                  borderRadius="12px"
                                  backgroundColor={'#1C1C1C'}
                                  src={hackathon.logo}
                                  width={{ base: '5.5rem', md: '7rem' }}
                                  height={{ base: '5.5rem', md: '7rem' }}
                                />
                              </SkeletonCircle> */}
              {/* hackathon content */}
              <VStack
                zIndex="3"
                align="start"
                w="full"
                spacing={{ base: '32px', md: '32px' }}
              >
                <VStack
                  align="start"
                  w="full"
                  spacing={{ base: '12px', md: '12px' }}
                >
                  <HStack
                    w="full"
                    gap="8px"
                    align={'flex-end'}
                    justify={'start'}
                  >
                    <Box
                      color="neutral.11"
                      as="p"
                      noOfLines={1}
                      textStyle={{ base: 'title3', md: 'title1' }}
                      textTransform={'capitalize'}
                    >
                      {props.name}
                    </Box>
                    {/* <HackathonStatus
                      show={true}
                      timeline={}
                    /> */}
                  </HStack>
                  <Box
                    as="p"
                    noOfLines={2}
                    maxW="38rem"
                    textStyle={{ base: 'body5', md: 'body4' }}
                    color="neutral.9"
                  >
                    {props.shortDescription}
                  </Box>
                </VStack>
                <HStack
                  bg="#ffffff08"
                  rounded="full"
                  shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                  outline="1px solid #ffffff16"
                  p={{
                    base: '0.6rem 1.2rem',
                    md: '0.8rem 1.5rem',
                  }}
                >
                  <Box
                    color="#B4B0B2"
                    textTransform={'uppercase'}
                    as="p"
                    textStyle={{
                      base: 'body6',
                      md: 'overline3',
                    }}
                  >
                    Prize Pool
                  </Box>
                  <Box
                    as="p"
                    textTransform="uppercase"
                    color="neutral.11"
                    textStyle={{ base: 'body5', md: 'title4' }}
                  >
                    {formatNumberWithK(props.prizePool)} USDC
                  </Box>
                </HStack>
              </VStack>
            </HStack>
          </HStack>
        </LinkBox>
      </Link>
    </>
  );
};
