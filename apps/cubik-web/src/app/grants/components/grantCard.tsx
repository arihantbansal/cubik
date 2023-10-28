import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RoundStatus } from '@/app/components/common/dates/roundStatus';
import { Box, Center, HStack, LinkBox, Stack, VStack } from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatWithK';

interface Props {
  matchedPool: number;
  id: string;
  roundName: string;
  short_description: string;
  startTime: Date;
  endTime: Date;
  event: 'hackathon' | 'round';
}

export const GrantCard = (props: Props) => {
  return (
    <>
      <Link
        style={{
          width: '100%',
        }}
        href={'/grants/' + props.id}
      >
        <LinkBox
          display={'flex'}
          flexDirection={{ base: 'row', md: 'row' }}
          alignItems={{ base: 'center', md: 'center' }}
          justifyContent="space-between"
          border={'1px solid'}
          borderColor="#ffffff10"
          transition="all 0.3s ease-in-out"
          _hover={{
            borderColor: '#ffffff10',
            transform: 'translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
            shadow: '2xl',
          }}
          backgroundColor="#000000"
          p={{ base: '22px 18px', md: '32px 48px' }}
          w="full"
          rounded="20px"
          overflow={'hidden'}
          textAlign={'start'}
          position="relative"
          _after={{
            content: '""',
            zIndex: '1',
            position: 'absolute',
            bottom: '-100%',
            left: '80%',
            transform: 'translate(0%, -50%)',
            width: '12rem',
            height: '12rem',
            backgroundColor: '#31F579',
            filter: 'blur(180px)',
            WebkitFilter: 'blur(180px)',
            borderRadius: 'full',
            // on hover
            _hover: {
              transform: 'translate(0%, -50%) scale(1.5)',
              transition: 'transform 0.5s ease-in-out',
            },
          }}
        >
          <VStack
            zIndex="3"
            align="start"
            spacing={{ base: '32px', md: '32px' }}
          >
            <VStack
              align="start"
              w="full"
              spacing={{ base: '12px', md: '12px' }}
            >
              <Stack
                direction="row"
                alignItems="flex-end"
                gap={{ base: '8px', md: '16px' }}
              >
                <Box
                  color="neutral.11"
                  as="p"
                  noOfLines={1}
                  textStyle={{ base: 'title3', md: 'title1' }}
                  textTransform={'capitalize'}
                >
                  {props.roundName}
                </Box>
                <RoundStatus
                  show={true}
                  startDate={props.startTime}
                  endDate={props.endTime}
                />
              </Stack>
              <Box
                as="p"
                noOfLines={2}
                maxW="38rem"
                textStyle={{ base: 'body5', md: 'body4' }}
                color="neutral.9"
              >
                {props.short_description}
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
                textStyle={{ base: 'body6', md: 'overline3' }}
              >
                {props.event === 'hackathon' ? 'Prize Pool' : 'Matching Pool'}
              </Box>
              <Box
                as="p"
                textTransform="uppercase"
                color="neutral.11"
                textStyle={{ base: 'body5', md: 'title4' }}
              >
                {formatNumberWithK(props.matchedPool)} USDC
              </Box>
            </HStack>
          </VStack>
          <Center
            width={{ base: '100px', md: '112px' }}
            height={{ base: '100px', md: '112px' }}
            position={{ base: 'absolute', md: 'relative' }}
            right={{ base: '-5%', md: 'auto' }}
            bottom={{ base: '-5%', md: 'auto' }}
            // zIndex={'1'}
          >
            <Box
              width={{ base: '100px', md: '112px' }}
              height={{ base: '100px', md: '112px' }}
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              zIndex="1"
              mixBlendMode={'hue'}
              bg="#071A0F"
            />
            <Image
              src="https://res.cloudinary.com/demonicirfan/image/upload/v1689923669/Mask_group_4_xmxqdg.png"
              alt="Twitter Logo"
              width={'300'}
              height={'300'}
            />
          </Center>
        </LinkBox>
      </Link>
    </>
  );
};
