'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { NFTProfile, NftResponseCarousel } from '@/types/NFTProfile';
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@/utils/chakra';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';

// import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
// import { BsImage } from "react-icons/bs";
import { assestsByOwner } from './assestsByOwner';
// import { useUserStore } from "~/store/userStore";
import Carousel from './Carousel';

type CarouselPropsType = {
  onClose: () => void;
  setPFP: (pfp: string) => void;
  PFP: string;
  setNFTProfile: Dispatch<SetStateAction<NFTProfile | undefined>>;
};

const FramerCarousel = ({ setPFP, PFP, setNFTProfile }: CarouselPropsType) => {
  const carousel = useRef<HTMLElement>();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [nftData, setNftData] = useState<NftResponseCarousel[]>([]);
  //   const { user } = useUserStore();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await assestsByOwner(publicKey?.toBase58() || '');
        if (data[0]) {
          setNftData(data[0]);
          setError(false);
        } else {
          setNftData([]);
          setError(true);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetch();
  }, [publicKey]);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth,
      );
    }
  }, [carouselWidth]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carousel.current) {
      const scrollAmount = carousel.current.offsetWidth;
      const newPosition =
        direction === 'left'
          ? carousel.current.scrollLeft - scrollAmount
          : carousel.current.scrollLeft + scrollAmount;

      carousel.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  if (isError) {
    // todo:- fix when we have assests implemented
    return <div>Error</div>;
  }

  return (
    <>
      <HStack pb="12px" w="full" justify={'space-between'}>
        <Text textAlign={'center'} fontSize={{ base: 'xs', md: 'sm' }}>
          Select NFT
        </Text>
        <Button
          fontSize={{ base: 'xs', md: 'sm' }}
          fontWeight="400"
          bg="white"
          color="black"
          rounded="full"
          variant="none"
          p="0.3rem 0.8rem"
          size="8px"
          onClick={() => {
            // if (user?.profilePicture) { // todo:- fix when we have use (@dhruv)
            //   // set this to the database
            //   onClose();
            // } else {
            //   onClose();
            // }
          }}
        >
          {!nftData ? (PFP ? 'Select' : 'Cancel') : 'Close'}
        </Button>
      </HStack>
      <HStack
        w="full"
        alignItems={'center'}
        position={'relative'}
        overflow="visible"
      >
        <IconButton
          display={nftData && nftData?.length > 0 ? 'block' : 'none'}
          position={'absolute'}
          variant="unstyled"
          rounded="full"
          background={'#ffffff80'}
          h={'26px !important'}
          w={'26px !important'}
          maxW="26px"
          minW={'26px'}
          zIndex={'2'}
          aria-label="go to left"
          // @todo:  icon={<BiChevronLeft size={24} />}
          icon={
            <Center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              >
                <path d="M15 18a30.616 30.616 0 0 1-5.817-5.49.803.803 0 0 1 0-1.02A30.617 30.617 0 0 1 15 6" />
              </svg>
            </Center>
          }
          onClick={() => scrollCarousel('left')}
        />
        <Box
          w="full"
          m="0 !important"
          // @ts-ignore
          ref={carousel}
          as={motion.div}
          overflowX="scroll"
          width="full"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {nftData && nftData?.length > 0 ? (
            <Carousel
              setNFTProfile={setNFTProfile}
              carouselWidth={carouselWidth}
              nftsData={nftData}
              PFP={PFP}
              setPFP={setPFP}
            />
          ) : (
            <VStack
              my="0.
              6rem"
              rounded="4px"
              border="1px solid #242424"
              bg="#141414"
              width="100%"
              height="7rem"
              align={'center'}
              gap="0"
              spacing="0"
              py="0.8rem"
            >
              <Center pb="0.5rem">{/* <CiImageOn size="26px" /> */}</Center>
              {isLoading ? (
                <Center h="full">
                  <Spinner />
                </Center>
              ) : (
                <VStack gap="4px" p="0">
                  {/* @todo: <BsImage size="22" /> */}
                  <Text fontSize="xs" maxW="12rem" textAlign={'center'}>
                    You do not have NFTs in your wallet to use as Profile
                    Picture.
                  </Text>
                </VStack>
              )}
            </VStack>
          )}
        </Box>
        <IconButton
          display={
            nftData && nftData?.length > 0 && !isLoading ? 'block' : 'none'
          }
          position={'absolute'}
          variant="unstyled"
          rounded="full"
          right="0px"
          background={'#ffffff80'}
          zIndex={'2'}
          h={'26px !important'}
          w={'26px !important'}
          maxW="26px"
          minW={'26px'}
          aria-label="go to left"
          // @todo:  icon={<BiChevronRight size={24} />}
          icon={
            <Center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              >
                <path d="M9 18a30.617 30.617 0 0 0 5.817-5.49.803.803 0 0 0 0-1.02A30.619 30.619 0 0 0 9 6" />
              </svg>
            </Center>
          }
          onClick={() => scrollCarousel('right')}
        />
      </HStack>
    </>
  );
};

export default FramerCarousel;
