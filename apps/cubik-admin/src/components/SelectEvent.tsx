"use client";
import {
  Box,
  Center,
  HStack,
  VStack,
  Avatar,
  useDisclosure,
  Button,
} from "@/utils/chakra";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal, Skeleton, Tag } from "@chakra-ui/react";
const MotionBox = motion(Box);
import Image from "next/image";

const SelectQuadraticEvent = () => {
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
    <Center ref={myDiv} cursor={"pointer"} position={"relative"}>
      <HStack
        zIndex={isOpen ? 2 : 0}
        onClick={handleClick}
        gap={{ base: "2px", md: "4px" }}
        w="fit-content"
      >
        <Box
          color="neutral.11"
          as="p"
          fontWeight="800"
          textStyle={{ base: "title2", sm: "title1", md: "display5" }}
          h="2rem"
        >
          OPOS Hackathon
        </Box>
        <Center
          pt={["0px", "2px", "10px"]}
          width={["20px", "24px", "26px"]}
          height={["20px", "24px", "26px"]}
          position="relative"
          right="auto"
          bottom="auto"
        >
          <Image
            src="/icons/chevron/down.svg"
            alt="Solana"
            width={"100"}
            height={"100"}
          />
        </Center>
      </HStack>
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
              transition={{ duration: 0.3, ease: "easeOut" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            >
              <MotionBox
                transition={{ duration: 0.2, ease: "easeOut" }}
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
                mt="2.4rem"
                left={modalPosition.left}
                bg="#141414"
                border="1px solid"
                borderColor="neutral.4"
                boxShadow="xl"
                width="14rem"
                height="20rem"
                rounded="18px"
                p={4}
              ></MotionBox>
            </MotionBox>
          </Portal>
        )}
      </AnimatePresence>
    </Center>
  );
};

export default SelectQuadraticEvent;
