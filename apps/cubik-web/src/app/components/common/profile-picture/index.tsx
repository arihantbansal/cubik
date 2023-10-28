'use client';

import React, { useRef, useState } from 'react';
//import { TbCurrencySolana } from "react-icons/tb";
import type { NFTProfile } from '@/types/NFTProfile';
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  useDisclosure,
  VStack,
} from '@/utils/chakra';
import { Portal, Skeleton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { TruncatedAddr } from '../wallet';

const MotionBox = motion(Box);

type profilePictureProps = {
  asNFT?: boolean;
  profilePicture?: string;
  username?: string;
  width: { base: string; sm: string; md: string; lg: string; xl: string };
  height: { base: string; sm: string; md: string; lg: string; xl: string };
  rounded?: string;
  NFTProfile: NFTProfile;
};

const ProfilePictureAvatar = (props: profilePictureProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const myDiv = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setTimeout(() => {
      onOpen();
    }, 0);
    // delay for few seconds

    if (myDiv.current) {
      const rect = myDiv.current.getBoundingClientRect();
      const top = rect.top;
      const left = rect.left;
      setModalPosition({ top, left });
    }
  };
  // whe mouse leave
  const handleMouseLeave = () => {
    onClose();
  };

  return (
    <Center
      ref={myDiv}
      cursor={props.asNFT ? 'pointer' : ''}
      position={'relative'}
    >
      <Avatar
        zIndex={isOpen ? 2 : 0}
        rounded={props.rounded || 'full'}
        borderRadius={props.rounded || 'full'}
        onMouseEnter={handleClick}
        ignoreFallback={true}
        loading="lazy"
        showBorder={true}
        backgroundColor="#FFFFFF30"
        border="2px solid #FFFFFF10"
        src={props.profilePicture}
        name={props.username}
        width={props.width}
        height={props.height}
      />
      {props.asNFT && (
        <AnimatePresence>
          {isOpen && (
            <Portal>
              <MotionBox
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0,0,0,0.4)"
                backdropFilter="blur(6px)"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
              >
                <MotionBox
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  initial={{ opacity: 1, scale: 0.95, originX: 0, originY: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onMouseLeave={handleMouseLeave}
                  position="absolute"
                  top={modalPosition.top + 12}
                  // transform={{
                  //   base: `translate(0px, ${props.width.base}) !important`,
                  //   sm: `translate(0px, ${props.width.sm}) !important`,
                  //   md: `translate(0px, ${props.width.md}) !important`,
                  //   lg: `translate(0px, ${props.width.lg}) !important`,
                  //   xl: `translate(0px, ${props.width.xl}) !important`,
                  // }}
                  mt={{
                    base: props.width.base,
                    sm: props.width.sm,
                    md: props.width.md,
                    lg: props.width.lg,
                    xl: props.width.xl,
                  }}
                  left={modalPosition.left}
                  bg="#141414"
                  border="1px solid"
                  borderColor="neutral.4"
                  boxShadow="xl"
                  width="fit-content"
                  rounded="18px"
                  p={4}
                >
                  <HStack position="relative" gap="18px">
                    <Avatar
                      ignoreFallback={true}
                      loading="lazy"
                      showBorder={true}
                      backgroundColor="#FFFFFF30"
                      //  border="2px solid #FFFFFF10"
                      src={props.profilePicture}
                      name={props.username}
                      // rounded={props.rounded || 'full'}
                      // borderRadius={props.rounded || 'full'}
                      // width={props.width}
                      // height={props.height}
                      rounded="12px"
                      borderRadius="12px"
                      width="14rem"
                      height="14rem"
                    />
                    <VStack
                      position={'absolute'}
                      bottom={0}
                      left={0}
                      p="12px 8px"
                      width="14rem"
                      align="start"
                      gap="8px"
                      bgGradient={
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, #141414 100%)'
                      }
                    >
                      {/* <HStack>
                        <Box as={TbCurrencySolana} boxSize={['12px', '12px', '16px']} />
                        <Box
                          as="p"
                          whiteSpace="pre"
                          color="#D7E0DF"
                          textStyle={{ base: 'body6', md: 'body5' }}
                        >
                          55.6
                        </Box>
                      </HStack> */}
                      <Skeleton
                        isLoaded={true}
                        opacity={0.3}
                        fadeDuration={0.2}
                      >
                        <Box
                          as="p"
                          color="neutral.11"
                          noOfLines={1}
                          textStyle={'title3'}
                        >
                          {props.NFTProfile?.name || 'NFT Name'}
                        </Box>
                      </Skeleton>
                    </VStack>
                  </HStack>
                  <VStack spacing="0px" py="4px">
                    <HStack w="full" p="4px 8px" justify="space-between">
                      <Box as="p" color="neutral.7" textStyle={'title4'}>
                        Collection
                      </Box>
                      <Skeleton
                        isLoaded={true}
                        opacity={0.5}
                        fadeDuration={0.2}
                      >
                        <Box as="p" color="neutral.10" textStyle={'title4'}>
                          {props.NFTProfile?.collection || 'Collection Name'}
                        </Box>
                      </Skeleton>
                    </HStack>
                    <HStack w="full" p="4px 8px" justify="space-between">
                      <Box as="p" color="neutral.7" textStyle={'title4'}>
                        Owner
                      </Box>
                      <Skeleton
                        isLoaded={true}
                        opacity={0.5}
                        fadeDuration={0.2}
                      >
                        <Box as="p" color="neutral.10" textStyle={'title4'}>
                          {TruncatedAddr({
                            walletAddress: props.NFTProfile?.owner || '',
                          })}
                        </Box>
                      </Skeleton>
                    </HStack>
                    <Button
                      mt="12px"
                      w="full"
                      px="12px"
                      py="8px"
                      gap="4px"
                      rounded="12px"
                      display="flex"
                      border="1px solid"
                      borderColor="neutral.5"
                      bg="neutral.3"
                      variant="unstyled"
                      _hover={{
                        bg: 'neutral.4',
                      }}
                    >
                      <Box
                        as="p"
                        color="neutral.7"
                        textStyle={'title4'}
                        onClick={onClose}
                        w="full"
                      >
                        View Community
                      </Box>
                    </Button>
                  </VStack>
                  {/* <Button
                    mt="12px"
                    w="full"
                    px="12px"
                    py="8px"
                    gap="4px"
                    rounded="12px"
                    display="flex"
                    border="1px solid"
                    borderColor="neutral.5"
                    bg="neutral.3"
                    variant="unstyled"
                    _hover={{
                      bg: 'neutral.4',
                    }}
                  >
                    <Box as="p" color="neutral.7" textStyle={'title4'} onClick={onClose} w="full">
                      View Community
                    </Box>
                  </Button> */}
                  {/* <VStack
                    mt="32px"
                    rounded="8px"
                    gap="0px"
                    border="1px solid"
                    borderColor="neutral.7"
                    align="start"
                  >
                    <Button variant="unstyled" display="flex" gap="4px" px="12px">
                      <Center p="4px" width="32px" height="32px">
                        <svg viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.95463 1L1.30078 6H3.41617L4.6854 4.63636V9.63636L5.95463 11V1Z"
                            fill="#626665"
                          />
                          <path
                            d="M8.91617 9.63636L7.64694 11V1L12.3008 6H10.1854L8.91617 4.63636V9.63636Z"
                            fill="#626665"
                          />
                          <path
                            d="M5.95463 1L1.30078 6H3.41617L4.6854 4.63636V9.63636L5.95463 11V1Z"
                            stroke="#626665"
                            stroke-width="0.5"
                          />
                          <path
                            d="M8.91617 9.63636L7.64694 11V1L12.3008 6H10.1854L8.91617 4.63636V9.63636Z"
                            stroke="#626665"
                            stroke-width="0.5"
                          />
                        </svg>
                      </Center>
                      <Box as="p" color="neutral.7" textStyle={'title4'} onClick={onClose} w="full">
                        View NFT on Tensor
                      </Box>
                    </Button>
                    <Box h="1px" bg="neutral.7" w="full" />
                    <Button variant="unstyled" display="flex" gap="4px" px="12px">
                      <Center p="4px" width="32px" height="32px">
                        <svg viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.24763 7.94685C8.57275 8.27197 9.10667 8.27517 9.37341 7.90066C9.92599 7.12482 10.249 6.20199 10.2951 5.23906C10.3545 3.99708 9.94907 2.7775 9.15784 1.81832C8.36662 0.859146 7.2464 0.22919 6.01577 0.0513853C4.78515 -0.126419 3.53242 0.160686 2.50206 0.856675C1.47169 1.55266 0.737617 2.6076 0.443083 3.81561C0.148549 5.02363 0.314689 6.29805 0.909081 7.39018C1.50347 8.48231 2.48347 9.31379 3.65783 9.72236C4.56833 10.0391 5.54502 10.0841 6.47107 9.86113C6.91809 9.75351 7.11447 9.25701 6.93425 8.83401V8.83401C6.75404 8.41102 6.26384 8.22583 5.80943 8.29595C5.27477 8.37845 4.72375 8.33028 4.20494 8.14978C3.42165 7.87727 2.768 7.32268 2.37155 6.59423C1.97509 5.86579 1.86428 5.01576 2.06073 4.21002C2.25718 3.40428 2.74681 2.70065 3.43405 2.23643C4.1213 1.77221 4.95686 1.58071 5.77767 1.69931C6.59849 1.8179 7.34567 2.23808 7.87341 2.87784C8.40115 3.51761 8.67158 4.33106 8.63193 5.15945C8.60567 5.70813 8.44462 6.23729 8.16846 6.70248C7.93375 7.09785 7.92252 7.62174 8.24763 7.94685V7.94685Z"
                            fill="#626665"
                          />
                          <circle cx="5.30094" cy="5" r="1.66667" fill="#626665" />
                        </svg>
                      </Center>
                      <Box as="p" color="neutral.7" textStyle={'title4'} onClick={onClose} w="full">
                        View NFT on Solscan
                      </Box>
                    </Button>
                  </VStack> */}
                </MotionBox>
              </MotionBox>
            </Portal>
          )}
        </AnimatePresence>
      )}
    </Center>
  );
};

export default ProfilePictureAvatar;
