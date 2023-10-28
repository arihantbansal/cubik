'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/user';
import {
  Box,
  Button,
  Card,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  useDisclosure,
  VStack,
} from '@/utils/chakra';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

import type { Proof } from '@cubik/database';

import { checkSuperteam } from './checkSuperteam';
import { createProofSuperteam } from './createProof';
import SuperteamDAO from './SVG/SuperteamDAO';

interface Props {
  username: string;
  proofs: Proof[];
}
export const SuperteamProof = ({ proofs }: Props) => {
  const MotionBox = motion(Box);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const playerRef = useRef<Player>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClaimAble, setIsClaimAble] = useState<boolean>(true);
  const router = useRouter();

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      const res = await checkSuperteam(user?.mainWallet as string);
      if (res === 0) {
        setIsClaimAble(false);
      } else {
        const ress = await createProofSuperteam({
          proofInfo: {},
          proofType: 'SUPERTEAM',
          userId: user?.id as string,
        });
        if (ress) {
          setIsClaimAble(true);
          playerRef?.current?.play();
          onClose();
          router.refresh();
        }
      }
      setIsLoading(false);
      return res === 0 ? false : true;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };
  return (
    <>
      <MotionBox
        as={Card}
        cursor="pointer"
        w={{ base: 'full', sm: 'full', md: '17.8rem' }}
        height="fit-content"
        h="full"
        whileHover={{ y: -8, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VStack
          onClick={() => onOpen()}
          p={{ base: '24px', md: '32px' }}
          gap="8px"
          align="start"
        >
          <SuperteamDAO size={'60px'} />
          <HStack spacing="8px">
            <Box
              as="p"
              textStyle={{ base: 'title4', md: 'title3' }}
              color={'neutral.11'}
            >
              Superteam
            </Box>
            <Tag
              size={{ base: 'xs', md: 'sm' }}
              px="12px"
              py="4px"
              rounded="full"
              color="surface.green.2"
              background={'surface.green.3'}
              fontSize={{ base: '10px', sm: '12px', md: '14px' }}
            >
              {proofs.find((e) => e.proofType === 'SUPERTEAM')
                ? 'Claimed'
                : 'Claim'}
            </Tag>
          </HStack>
          <Box as="p" textStyle={{ base: '', md: 'body5' }} color={'neutral.7'}>
            {isClaimAble
              ? 'You have collected this proof which identifies you as a part of superteam'
              : 'This wallet is not connected to any superteam NFT'}
          </Box>
        </VStack>
        <Modal
          size="sm"
          motionPreset="scale"
          variant={'cubik'}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent
            position={'relative'}
            overflow={'hidden'}
            _before={{
              content: '""',
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              rounded: '50%',
              filter: 'blur(80px)',
              width: '6rem',
              height: '6rem',
              background: 'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
              borderRadius: '8px 8px 0px 0px',
              zIndex: '-1',
            }}
          >
            <ModalBody>
              <VStack
                py={{ base: '24px', md: '32px' }}
                gap={{ base: '18px', md: '32px' }}
                textAlign={'center'}
                maxW="16rem"
                mx="auto"
              >
                <VStack spacing="24px">
                  <Center transform={'scale(2)'} h="130px">
                    <Center
                      h="0"
                      overflow="visible"
                      top="0px"
                      position="absolute"
                    >
                      <Player
                        ref={playerRef}
                        autoplay={false}
                        controls={true}
                        speed={0.7}
                        src={
                          'https://assets4.lottiefiles.com/packages/lf20_obhph3sh.json'
                        }
                        style={{ height: `300px`, width: `300px` }}
                      />
                    </Center>
                    <SuperteamDAO size={'60px'} />
                  </Center>
                  <VStack spacing="12px">
                    <Box
                      as="p"
                      textStyle={{ base: 'title3', md: 'title2' }}
                      color="neutral.11"
                    >
                      Superteam Proof
                    </Box>
                    <Box
                      as="p"
                      textStyle={'overline3'}
                      color="neutral.8"
                      textTransform={'uppercase'}
                    >
                      Part Of SuperteamDAO
                    </Box>
                  </VStack>
                  <Box
                    as="p"
                    textStyle={{ base: 'body5', md: 'body5' }}
                    color={'neutral.7'}
                  >
                    Claim this badge by verifying you’re a part of SuperteamDAO
                  </Box>
                  {isClaimAble &&
                  !proofs.find((e) => e.proofType === 'SUPERTEAM') ? (
                    <Button
                      isLoading={isLoading}
                      onClick={
                        !proofs.find((e) => e.proofType === 'SUPERTEAM')
                          ? handleClaim
                          : () => {}
                      }
                      disabled={
                        proofs.find((e) => e.proofType === 'SUPERTEAM')
                          ? true
                          : false
                      }
                      isDisabled={
                        proofs.find((e) => e.proofType === 'SUPERTEAM')
                          ? true
                          : false
                      }
                    >
                      {proofs.find((e) => e.proofType === 'SUPERTEAM')
                        ? 'Claimed'
                        : 'Claim'}
                    </Button>
                  ) : (
                    <Button isDisabled disabled>
                      {proofs.find((e) => e.proofType === 'SUPERTEAM')
                        ? 'Claimed'
                        : "Can't Claim"}
                    </Button>
                  )}
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </MotionBox>
    </>
  );
};
