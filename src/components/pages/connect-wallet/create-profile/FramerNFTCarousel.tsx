import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { memo, useEffect, useRef, useState } from 'react';
import { useNftDataByOwner } from '~/hooks/getNFTsByOwner';
import Carousel from './Carousel';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
type CarouselPropsType = {
  onClose: () => void;
  setPFP: (pfp: string) => void;
  PFP: string;
};

const FramerCarousel = memo(function FramerCarousel({
  onClose,
  setPFP,
  PFP,
}: CarouselPropsType) {
  const carousel = useRef<HTMLElement>();
  const [carouselWidth, setCarouselWidth] = useState(0);

  const { data: session } = useSession();
  const { publicKey } = useWallet();

  const { data: nftsData, isLoading, error } = useNftDataByOwner(publicKey);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
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

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <HStack w="full" justify={'space-between'}>
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
            if (session?.user.image) {
              // set this to the database
              onClose();
            } else {
              onClose();
            }
          }}
        >
          {PFP ? 'Select' : 'Cancel'}
        </Button>
      </HStack>
      <HStack alignItems={'center'} position={'relative'} overflow="visible">
        <IconButton
          position={'absolute'}
          variant="unstyled"
          rounded="full"
          background={'#ffffff70'}
          h={'26px !important'}
          w={'26px !important'}
          maxW="26px"
          minW={'26px'}
          zIndex={'2'}
          aria-label="go to left"
          icon={<BiChevronLeft size={24} />}
          onClick={() => scrollCarousel('left')}
        />
        <Box
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
          {nftsData && nftsData?.length > 0 ? (
            <Carousel
              carouselWidth={carouselWidth}
              nftsData={nftsData}
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
              py="1.2rem"
            >
              <Center pb="0.5rem">{/* <CiImageOn size="26px" /> */}</Center>
              {isLoading ? (
                <Spinner />
              ) : (
                <Text fontSize="xs" maxW="8rem" textAlign={'center'}>
                  You do not have NFTs in your wallet.
                </Text>
              )}
            </VStack>
          )}
        </Box>
        <IconButton
          position={'absolute'}
          variant="unstyled"
          rounded="full"
          right="-6px"
          background={'#ffffff70'}
          zIndex={'2'}
          h={'26px !important'}
          w={'26px !important'}
          maxW="26px"
          minW={'26px'}
          aria-label="go to left"
          icon={<BiChevronRight size={24} />}
          onClick={() => scrollCarousel('right')}
        />
      </HStack>
    </>
  );
});

export default FramerCarousel;
