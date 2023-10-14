import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import useGetUserAssets from "~/hooks/useGetUserAssets";
import { useUserStore } from "~/store/userStore";
import Carousel from "./Carousel";

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
  const { user } = useUserStore();
  const { publicKey } = useWallet();

  const {
    data: nftsData,
    isLoading,
    error,
  } = useGetUserAssets(publicKey?.toBase58() ?? "");

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      );
    }
  }, [carouselWidth]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carousel.current) {
      const scrollAmount = carousel.current.offsetWidth;
      const newPosition =
        direction === "left"
          ? carousel.current.scrollLeft - scrollAmount
          : carousel.current.scrollLeft + scrollAmount;

      carousel.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <HStack pb="12px" w="full" justify={"space-between"}>
        <Text textAlign={"center"} fontSize={{ base: "xs", md: "sm" }}>
          Select NFT
        </Text>
        <Button
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="400"
          bg="white"
          color="black"
          rounded="full"
          variant="none"
          p="0.3rem 0.8rem"
          size="8px"
          onClick={() => {
            if (user?.profilePicture) {
              // set this to the database
              onClose();
            } else {
              onClose();
            }
          }}
        >
          {!nftsData ? (PFP ? "Select" : "Cancel") : "Close"}
        </Button>
      </HStack>
      <HStack
        w="full"
        alignItems={"center"}
        position={"relative"}
        overflow="visible"
      >
        <IconButton
          display={
            nftsData && nftsData?.length > 0 && !isLoading ? "block" : "none"
          }
          position={"absolute"}
          variant="unstyled"
          rounded="full"
          background={"#ffffff80"}
          h={"26px !important"}
          w={"26px !important"}
          maxW="26px"
          minW={"26px"}
          zIndex={"2"}
          aria-label="go to left"
          icon={<BiChevronLeft size={24} />}
          onClick={() => scrollCarousel("left")}
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
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
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
              align={"center"}
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
                  <BsImage size="22" />
                  <Text fontSize="xs" maxW="12rem" textAlign={"center"}>
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
            nftsData && nftsData?.length > 0 && !isLoading ? "block" : "none"
          }
          position={"absolute"}
          variant="unstyled"
          rounded="full"
          right="0px"
          background={"#ffffff80"}
          zIndex={"2"}
          h={"26px !important"}
          w={"26px !important"}
          maxW="26px"
          minW={"26px"}
          aria-label="go to left"
          icon={<BiChevronRight size={24} />}
          onClick={() => scrollCarousel("right")}
        />
      </HStack>
    </>
  );
});

export default FramerCarousel;
