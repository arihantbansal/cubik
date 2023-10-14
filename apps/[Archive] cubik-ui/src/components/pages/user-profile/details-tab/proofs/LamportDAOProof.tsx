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

const LamportDAOProof = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack onClick={onOpen} p="32px" gap="8px" align="start">
        <LamportDAoSVG size={"60px"} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: "", md: "title3" }}
            color={"neutral.11"}
          >
            Lamport DAO
          </Box>
          <Tag
            size={{ base: "xs", md: "sm" }}
            px="12px"
            py="4px"
            color="surface.green.2"
            background={"surface.green.3"}
            rounded="full"
          >
            Claim
          </Tag>
        </HStack>
        <Box as="p" textStyle={{ base: "", md: "body5" }} color={"neutral.7"}>
          Collect Proof of Lamport DAO by connecting your discord account.
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
                  <LamportDAoSVG size={"60px"} />
                </Center>
                <VStack spacing="12px">
                  <Box as="p" textStyle={"title2"} color="neutral.11">
                    LamportDAO Proof
                  </Box>
                  <Box
                    as="p"
                    textStyle={"overline3"}
                    color="neutral.8"
                    textTransform={"uppercase"}
                  >
                    Solana Developer
                  </Box>
                </VStack>
                <Box as="p" textStyle={"title5"} color="neutral.11">
                  Claim this badge by verifying you’re a part of LamportDAO
                </Box>
              </VStack>{" "}
              <Button variant={"connect_wallet"} w="12rem">
                Connect Discord
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LamportDAOProof;
