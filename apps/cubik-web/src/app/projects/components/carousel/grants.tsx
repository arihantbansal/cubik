'use client';

import React, { useEffect, useState } from 'react';
import { Box, HStack } from '@/utils/chakra';
import { AnimatePresence, motion } from 'framer-motion';

const MotionBox = motion(Box);

const animations = {
  hidden: { opacity: 0, x: -200 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

interface GrantsCarouselProps {
  children: React.ReactElement | React.ReactElement[];
}

export function GrantsCarousel({ children }: GrantsCarouselProps) {
  const [index, setIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    if (childrenArray.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 6000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, childrenArray.length]);

  return (
    <Box
      gap="16px"
      position={'relative'}
      width={'full'}
      height="fit-content"
      overflow={'hidden'}
    >
      <AnimatePresence mode={'wait'} initial={false}>
        <MotionBox
          w="full"
          key={index}
          variants={animations}
          initial="hidden"
          animate="show"
          exit="exit"
          position="relative"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          transition={{ duration: 0.8 }}
        >
          {childrenArray[index]}
        </MotionBox>
      </AnimatePresence>
      {/* Dots Indicator */}
      {childrenArray.length > 1 && (
        <HStack mx="auto" py="16px" w="fit-content" spacing="3">
          {childrenArray.map((_, i) => (
            <Box
              rounded="8px"
              width={'14px'}
              height="4px"
              key={i}
              bg={i === index ? 'neutral.8' : 'neutral.5'}
              cursor="pointer"
              onClick={() => setIndex(i)}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
}
