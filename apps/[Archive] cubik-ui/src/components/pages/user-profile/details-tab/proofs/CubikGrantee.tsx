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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BiCheck } from "react-icons/bi";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import { useUserStore } from "~/store/userStore";
import { trpc } from "~/utils/trpc";
import GranteeLogo from "./SVGs/Grantee";

interface Props {
  minted: boolean;
  isLoading: boolean;
  canMint: boolean;
}
const CubikGrantee = ({ minted, canMint, isLoading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const playerRef = useRef<Player>(null);
  const { resetUser } = useUserStore();
  const proofMutation = trpc.user.addProof.useMutation();
  const utils = trpc.useContext();
  const router = useRouter();
  const handleMint = async () => {
    if (minted) return;
    proofMutation.mutate({
      name: "CUBIKGRANTEE",
      tx: "0x1234567890", // need to change this
    });
    playerRef?.current?.play();
    setTimeout(() => {
      onClose();
      SuccessToast({
        toast,
        message: "Proof minted successfully",
      });
    }, 2000);
    utils.user.findOne.invalidate({
      username: router.query.username as string,
    });
  };

  return (
    <>
      <VStack
        onClick={() => {
          if (!canMint) {
            return;
          }
          onOpen();
        }}
        p={{ base: "24px", md: "32px" }}
        gap="8px"
        align="start"
      >
        <GranteeLogo size={"60px"} />
        <HStack spacing="8px" w="max">
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color={"neutral.11"}
          >
            Cubik Grantee
          </Box>
          {canMint ? (
            <Tag
              size={{ base: "xs", md: "sm" }}
              px="12px"
              py="4px"
              color={
                minted
                  ? "surface.green.2"
                  : canMint
                  ? "surface.green.2"
                  : "surface.red.2"
              }
              background={
                minted
                  ? "surface.green.3"
                  : canMint
                  ? "surface.green.3"
                  : "surface.red.3"
              }
              rounded="full"
              fontSize={{ base: "10px", sm: "12px", md: "14px" }}
            >
              {minted ? "Claimed" : "Claim"}
            </Tag>
          ) : (
            <Tag
              size={{ base: "xs", md: "sm" }}
              px="12px"
              py="4px"
              color={
                minted
                  ? "surface.green.2"
                  : canMint
                  ? "surface.green.2"
                  : "surface.red.2"
              }
              background={
                minted
                  ? "surface.green.3"
                  : canMint
                  ? "surface.green.3"
                  : "surface.red.3"
              }
              rounded="full"
              fontSize={{ base: "10px", sm: "12px", md: "14px" }}
            >
              {"Can't Claim"}
            </Tag>
          )}
        </HStack>
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body5" }}
          color={"neutral.7"}
        >
          To claim this proof you need a project that have taken part in a grant
          .
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
              py={{ base: "24px", md: "32px" }}
              gap={{ base: "18px", md: "32px" }}
              textAlign={"center"}
              maxW="16rem"
              mx="auto"
            >
              <VStack spacing={{ base: "12px", md: "24px" }}>
                <Center transform={"scale(2)"} h="130px" position="relative">
                  <Center
                    h="0"
                    overflow="visible"
                    top="0px"
                    position="absolute"
                  >
                    <Player
                      ref={playerRef}
                      autoplay={false}
                      controls={true}
                      speed={0.7}
                      src={
                        "https://assets4.lottiefiles.com/packages/lf20_obhph3sh.json"
                      }
                      style={{ height: `300px`, width: `300px` }}
                    />
                  </Center>
                  <GranteeLogo size={"60px"} />
                </Center>
                <Box
                  as="p"
                  textStyle={{ base: "title3", md: "title2" }}
                  color="neutral.11"
                >
                  Cubik Grantee Proof
                </Box>

                <Box
                  as="p"
                  textStyle={{ base: "title6", md: "title5" }}
                  color="neutral.11"
                >
                  Claim your proof
                </Box>
              </VStack>
              {minted ? (
                <Button
                  variant={"cubikFilled"}
                  size={{ base: "cubikMini", md: "cubikSmall" }}
                  iconSpacing={{ base: "4px", md: "6px" }}
                  rightIcon={
                    minted ? (
                      <Box
                        as={BiCheck}
                        boxSize={{ base: "15px", md: "18px" }}
                      />
                    ) : undefined
                  }
                >
                  Proof Collected
                </Button>
              ) : (
                <Button
                  variant={"cubikFilled"}
                  size={{ base: "cubikMini", md: "cubikSmall" }}
                  iconSpacing={{ base: "4px", md: "6px" }}
                  onClick={handleMint}
                  rightIcon={
                    minted ? (
                      <Box
                        as={BiCheck}
                        boxSize={{ base: "15px", md: "18px" }}
                      />
                    ) : undefined
                  }
                >
                  Claim
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CubikGrantee;
