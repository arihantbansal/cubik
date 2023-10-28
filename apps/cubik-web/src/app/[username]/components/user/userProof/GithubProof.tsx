'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SuccessToast } from '@/app/components/toasts/Toasts';
import { useUser } from '@/app/context/user';
import { env } from '@/env.mjs';
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
  useToast,
  VStack,
} from '@/utils/chakra';
import { supabase, useUserSupabase } from '@/utils/helpers/supabase';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

import type { Proof } from '@cubik/database';

import { createProof, getUser } from './createProof';

interface Props {
  username: string;
  proofs: Proof[];
}

export const GithubProof = ({ username, proofs }: Props) => {
  const MotionBox = motion(Box);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const playerRef = useRef<Player>(null);
  const router = useRouter();
  const { user: AuthUser, setUser } = useUser();
  const { user, loading } = useUserSupabase(supabase);
  const [isLoading, setIsLoading] = React.useState(false);
  const connetGithub = async () => {
    localStorage.setItem('authId', AuthUser?.id as string);
    localStorage.setItem('tempUser', JSON.stringify(AuthUser));
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: env.NEXT_PUBLIC_URL_BASE + pathName + '?github=true',
      },
    });
  };
  useEffect(() => {
    const checkGithub = async () => {
      console.log(
        searchParams?.get('github'),
        !isLoading,
        user?.data.user?.user_metadata.user_name,
        !loading,
        !isOpen,
      );
      if (
        searchParams?.get('github') &&
        !isLoading &&
        user?.data.user?.user_metadata.user_name &&
        !loading &&
        !isOpen
      ) {
        // onClose clear the query
        onOpen();
      }
    };
    checkGithub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get('github'), user?.data.user?.user_metadata.user_name]);
  const toast = useToast();
  const createGithubProof = async () => {
    setIsLoading(true);
    const res = await createProof({
      proofInfo: {
        username: user?.data.user?.user_metadata.user_name as string,
      },
      proofType: 'GITHUB',
      userId: localStorage.getItem('authId') as string,
    });
    if (res) {
      const tempUser = await getUser(localStorage.getItem('authId') as string);
      if (tempUser) {
        setUser({
          id: tempUser.id,
          mainWallet: tempUser.mainWallet,
          profilePicture: tempUser.profilePicture as string,
          username: tempUser.username as string,
        });
      }
      playerRef?.current?.play();
      onClose();
      SuccessToast({
        toast,
        message: 'Proof minted successfully',
      });

      // await supabase.auth.signOut();
      localStorage.removeItem('authId');
      localStorage.removeItem('tempUser');
      router.push('/' + username);
      setIsLoading(false);
      return res;
    } else {
      setIsLoading(false);
      return null;
    }
  };

  return (
    <>
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
            onClick={onOpen}
            p={{ base: '24px', md: '32px' }}
            gap="8px"
            align="start"
          >
            <Center width={'60px'} height={'60px'}>
              <Image
                src="https://res.cloudinary.com/demonicirfan/image/upload/v1686469723/google_proof_tlsuyi.png"
                alt="Twitter Logo"
                width={'300'}
                height={'300'}
              />
            </Center>
            <HStack spacing="8px">
              <Box
                as="p"
                textStyle={{ base: 'title4', md: 'title3' }}
                color={'neutral.11'}
              >
                Github
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
                {proofs.find((e) => e.proofType === 'GITHUB')
                  ? 'Claimed'
                  : 'Claim'}
              </Tag>
            </HStack>
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body5' }}
              color={'neutral.7'}
            >
              To claim this proof you have to connect your github account .
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
                    <Center
                      transform={'scale(2)'}
                      h="130px"
                      position="relative"
                    >
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
                      <Center width={'60px'} height={'60px'}>
                        <Image
                          src="https://res.cloudinary.com/demonicirfan/image/upload/v1686469723/google_proof_tlsuyi.png"
                          alt="Twitter Logo"
                          width={'300'}
                          height={'300'}
                        />
                      </Center>
                    </Center>
                    <Box
                      as="p"
                      textStyle={{ base: 'title3', md: 'title2' }}
                      color="neutral.11"
                    >
                      Github Proof
                    </Box>

                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title5' }}
                      color="neutral.11"
                    >
                      Claim your proof by connecting your github account.
                    </Box>
                  </VStack>
                  <Box
                    as="p"
                    textStyle={{ base: 'title6', md: 'title5' }}
                    color="neutral.11"
                  >
                    {user?.data.user?.email}
                  </Box>
                  {user?.data.user?.email ? (
                    <Button isLoading={isLoading} onClick={createGithubProof}>
                      Claim
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        proofs.find((e) => e.proofType === 'GITHUB')
                          ? true
                          : false
                      }
                      isDisabled={
                        proofs.find((e) => e.proofType === 'GITHUB')
                          ? true
                          : false
                      }
                      onClick={connetGithub}
                    >
                      {proofs.find((e) => e.proofType === 'GITHUB')
                        ? 'Claimed'
                        : 'Connect Github'}
                    </Button>
                  )}

                  {/* {minted ? (
                  <Button
                    isDisabled
                    variant={"cubikFilled"}
                    size={{ base: "cubikMini", md: "cubikSmall" }}
                    iconSpacing={{ base: "4px", md: "6px" }}
                    onClick={handleMint}
                    rightIcon={
                      minted ? (
                        <Box
                          as={BiCheck}
                          boxSize={{ base: "15px", md: "18px" }}
                        />
                      ) : undefined
                    }
                  >
                    Proof Collected
                  </Button>
                ) : (
                  <>
                    <VStack>
                      {user?.data.user?.user_metadata.user_name && (
                        <Text>{user?.data.user?.user_metadata.user_name}</Text>
                      )}
                      <Button
                        variant={"cubikFilled"}
                        size={{ base: "cubikMini", md: "cubikSmall" }}
                        iconSpacing={{ base: "4px", md: "6px" }}
                        onClick={handleMint}
                        rightIcon={
                          minted ? (
                            <Box
                              as={BiCheck}
                              boxSize={{ base: "15px", md: "18px" }}
                            />
                          ) : undefined
                        }
                      >
                        {user?.data.user?.user_metadata.user_name
                          ? "Claim"
                          : "Connect github"}
                      </Button>
                    </VStack>
                  </>
                )} */}
                </VStack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </MotionBox>
      </>
    </>
  );
};
