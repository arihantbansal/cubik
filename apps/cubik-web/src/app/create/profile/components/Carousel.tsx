'use client';

import type { Dispatch, Key, SetStateAction } from 'react';
import { memo, useState } from 'react';
import type { NFTProfile, NftResponseCarousel } from '@/types/NFTProfile';
import { Box, Flex, Skeleton } from '@/utils/chakra';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';

// import { useUserStore } from "~/store/userStore";

const Carousel = memo(function Carousel({
  carouselWidth,
  nftsData,
  setPFP,
  setNFTProfile,
}: {
  carouselWidth: number;
  nftsData: NftResponseCarousel[];
  PFP: string;
  setNFTProfile: Dispatch<SetStateAction<NFTProfile | undefined>>;
  setPFP: (pfp: string) => void;
}) {
  //   const { user } = useUserStore();
  const [isDragging, setIsDragging] = useState(false);
  const { publicKey } = useWallet();
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // handler for when user stops dragging
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  if (!nftsData) {
    return <div>Error: No NFT data available</div>;
  }

  const NFTImg = ({ nft }: { nft: NftResponseCarousel }) => (
    <Box
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      rounded="6px"
      minW="5rem"
      minH="5rem"
      as={motion.div}
      _hover={{
        outline: '1px solid #fff',
      }}
      onClick={() => {
        if (!isDragging) {
          setPFP(nft.image);
          setNFTProfile({
            collection: nft.name,
            name: nft.metadataName,
            owner: publicKey?.toBase58() || '',
            token: nft.tokenMint,
          });
        }
      }}
      pointerEvents={isDragging ? 'none' : 'all'}
    >
      <Skeleton
        isLoaded={!isDragging}
        startColor="gray.900"
        endColor="gray.700"
        w="5rem"
        h="5rem"
        borderRadius="6px"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={nft.image}
          alt={nft.image}
          loading="lazy"
          style={{
            // outline:
            //   user?.profilePicture === nft.image ? "1px solid #fff" : "none",
            pointerEvents: 'none',
            borderRadius: '6px',
            width: '5rem',
            height: '5rem',
            objectFit: 'cover',
          }}
        />
      </Skeleton>
    </Box>
  );

  return (
    <Flex
      flexDir="row"
      gap="0.5rem"
      py="1rem"
      dragConstraints={{ right: 0, left: -carouselWidth }}
      drag="x"
      w="fit-content"
      cursor="grab"
      alignItems="center"
      justifyContent="flex-start"
      as={motion.div}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      px={'6px'}
    >
      {nftsData.map((nft: any, key: Key) => (
        <NFTImg nft={nft} key={key} />
      ))}
    </Flex>
  );
});

export default Carousel;
