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
} from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

import type { Proof } from '@cubik/database';

import { checkCubikProject } from './checkCubikProject';
import { createProofCubikGrantee } from './createProof';
import GranteeLogo from './SVG/CubikVerifiedProject';

interface Props {
  proofs: Proof[];
  username: string;
}
export const CubikVerifiedProject = ({ proofs }: Props) => {
  const MotionBox = motion(Box);
  const playerRef = useRef<Player>(null);
  const { user } = useUser();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClaimAble, setIsClaimAble] = useState<boolean>(true);
  const router = useRouter();

  const handleClaim = async () => {
    try {
      setIsLoading(true);
      const ress = await checkCubikProject(user?.mainWallet as string);
      if (ress !== 0) {
        await createProofCubikGrantee({
          proofInfo: {},
          proofType: 'CUBIK_PARTICIPANT',
          userId: user?.id as string,
        });
        setIsClaimAble(true);
        playerRef?.current?.play();
        setIsLoading(false);
        onClose();
        router.refresh();
      } else {
        setIsLoading(false);
        setIsClaimAble(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };
  return (
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
        onClick={() => {
          onOpen();
        }}
        p={{ base: '24px', md: '32px' }}
        gap="8px"
        align="start"
      >
        <GranteeLogo size={'60px'} />
        <HStack spacing="8px" w="max">
          <Box
            as="p"
            textStyle={{ base: 'title4', md: 'title3' }}
            color={'neutral.11'}
          >
            Cubik Grantee
          </Box>
          <Tag
            size={{ base: 'xs', md: 'sm' }}
            px="12px"
            py="4px"
            color="surface.green.2"
            background={'surface.green.3'}
            rounded="full"
            fontSize={{ base: '10px', sm: '12px', md: '14px' }}
          >
            {proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
              ? 'Claimed'
              : 'Claim'}
          </Tag>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body5' }}
          color={'neutral.7'}
        >
          To claim this proof you need a project that have taken part in a grant
          .
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
              <VStack spacing={{ base: '12px', md: '24px' }}>
                <Center transform={'scale(2)'} h="130px" position="relative">
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
                  <GranteeLogo size={'60px'} />
                </Center>
                <VStack spacing="12px">
                  <Box
                    as="p"
                    textStyle={{ base: 'title3', md: 'title2' }}
                    color="neutral.11"
                  >
                    Cubik Verified Project
                  </Box>
                  <Box
                    as="p"
                    textStyle={'overline3'}
                    color="neutral.8"
                    textTransform={'uppercase'}
                  >
                    Owner of a Cubik Verified Project
                  </Box>
                </VStack>

                {isClaimAble &&
                !proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT') ? (
                  <Button
                    isLoading={isLoading}
                    onClick={
                      !proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
                        ? handleClaim
                        : () => {}
                    }
                    disabled={
                      proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
                        ? true
                        : false
                    }
                    isDisabled={
                      proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
                        ? true
                        : false
                    }
                  >
                    {proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
                      ? 'Claimed'
                      : 'Claim'}
                  </Button>
                ) : (
                  <Button isDisabled disabled>
                    {proofs.find((e) => e.proofType === 'CUBIK_PARTICIPANT')
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
  );
};
