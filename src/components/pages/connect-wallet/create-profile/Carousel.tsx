import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { memo, useState } from 'react';

const Carousel = memo(function Carousel({
  carouselWidth,
  nftsData,
  PFP,
  setPFP,
}: {
  carouselWidth: number;
  nftsData: any;
  PFP: string;
  setPFP: (pfp: string) => void;
}) {
  const { data: session } = useSession();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // handler for when user stops dragging
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Box
      display={'flex'}
      flexDir="row"
      gap="0.5rem"
      py="1rem"
      dragConstraints={{ right: 0, left: -carouselWidth }}
      drag="x"
      w="fit-content"
      cursor="grab"
      //border="1px solid red"
      //overflow="visible"
      alignItems="start"
      justifyContent="flex-start"
      as={motion.div}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {nftsData
        ? nftsData.map((nft: any) => (
            <Box
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              rounded="6px"
              minW="5rem"
              minH="5rem"
              as={motion.div}
              key={nft.image}
              _hover={{
                //cursor: 'pointer',
                outline: '1px solid #fff',
              }}
              onClick={() => {
                if (!isDragging) {
                  // todo: set user image as nft.image
                  setPFP(nft.image);
                }
              }}
              pointerEvents={isDragging ? 'none' : 'all'}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={nft.image}
                alt={nft.image}
                loading="lazy"
                style={{
                  outline:
                    session?.user.image === nft.image
                      ? '1px solid #fff'
                      : 'none',
                  pointerEvents: 'none',
                  // border: '1px solid red',
                  borderRadius: '6px',
                  width: '5rem',
                  height: '5rem',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))
        : 'no data'}
    </Box>
  );
});

export default Carousel;
