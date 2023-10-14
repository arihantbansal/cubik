import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import LamportDAoSVG from "./SVGs/LamportDAO";
import TwitterLogo from "./SVGs/Twitter";

const TwitterProof = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        onClick={onOpen}
        p={{ base: "24px", md: "32px" }}
        gap="8px"
        align="start"
      >
        <TwitterLogo size={"60px"} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color={"neutral.11"}
          >
            Twitter
          </Box>
          <Tag
            size={{ base: "xs", md: "sm" }}
            px="12px"
            py="4px"
            color="surface.yellow.1"
            background={"surface.yellow.3"}
            rounded="full"
            fontSize={{ base: "10px", sm: "12px", md: "14px" }}
          >
            Claim
          </Tag>
        </HStack>
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body5" }}
          color={"neutral.7"}
        >
          Connect your Twitter account to your Cubik profile to mint this proof.
        </Box>
      </VStack>
      <Modal
        size="sm"
        motionPreset="scale"
        variant={"cubik"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          position={"relative"}
          overflow={"hidden"}
          _before={{
            content: '""',
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            rounded: "50%",
            filter: "blur(80px)",
            width: "6rem",
            height: "6rem",
            background: "linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)",
            borderRadius: "8px 8px 0px 0px",
            zIndex: "-1",
          }}
        >
          <ModalBody>
            <VStack
              py="32px"
              gap="32px"
              textAlign={"center"}
              maxW="16rem"
              mx="auto"
            >
              <VStack spacing="24px">
                <Center transform={"scale(2)"} h="130px">
                  <TwitterLogo size={"60px"} />
                </Center>
                <Box as="p" textStyle={"title2"} color="neutral.11">
                  Twitter Proof
                </Box>
                <Box as="p" textStyle={"title5"} color="neutral.11">
                  CClaim your first proof by connecting your Twitter account.
                </Box>
              </VStack>{" "}
              <Button variant={"connect_wallet"} w="12rem">
                Connect Twitter
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TwitterProof;
