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
import SuperteamDAO from "./SVGs/Superteam";

interface Props {
  isClaimAble: boolean;
  claimed: boolean;
}
const SuperteamProof = ({ isClaimAble, claimed }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addProof = trpc.user.addProof.useMutation();
  const playerRef = useRef<Player>(null);
  const router = useRouter();

  const utils = trpc.useContext();

  const authUser = useUserStore();
  const toast = useToast();
  const claimProof = () => {
    if (!isClaimAble) return;
    if (claimed) return;
    try {
      addProof.mutate({
        name: "SUPERTEAM",
        tx: "SUPERTEAM",
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
        username: authUser.user?.username,
      });
    } catch (error) {
      onClose();
    }
  };
  return (
    <>
      <VStack
        onClick={() => {
          if (!isClaimAble) {
            return;
          }
          onOpen();
        }}
        p={{ base: "24px", md: "32px" }}
        gap="8px"
        align="start"
      >
        <SuperteamDAO size={"60px"} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: "title4", md: "title3" }}
            color={"neutral.11"}
          >
            Superteam
          </Box>
          <Tag
            size={{ base: "xs", md: "sm" }}
            px="12px"
            py="4px"
            color={
              claimed
                ? "surface.green.2"
                : isClaimAble
                ? "surface.green.2"
                : "surface.red.2"
            }
            background={
              claimed
                ? "surface.green.3"
                : isClaimAble
                ? "surface.green.3"
                : "surface.red.3"
            }
            rounded="full"
            fontSize={{ base: "10px", sm: "12px", md: "14px" }}
          >
            {claimed ? "Claimed" : isClaimAble ? "Claim" : "Can’t Claim"}
          </Tag>
        </HStack>
        <Box as="p" textStyle={{ base: "", md: "body5" }} color={"neutral.7"}>
          {claimed
            ? "You have collected this proof which identifies you as a part of superteam"
            : isClaimAble
            ? "You are eligible to Mint this proof and add more weight to your vote"
            : "This wallet is not connected to any superteam NFT"}
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
              <VStack spacing="24px">
                <Center transform={"scale(2)"} h="130px">
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
                  <SuperteamDAO size={"60px"} />
                </Center>
                <VStack spacing="12px">
                  <Box
                    as="p"
                    textStyle={{ base: "title3", md: "title2" }}
                    color="neutral.11"
                  >
                    Superteam Proof
                  </Box>
                  <Box
                    as="p"
                    textStyle={"overline3"}
                    color="neutral.8"
                    textTransform={"uppercase"}
                  >
                    Part Of SuperteamDAO
                  </Box>
                </VStack>
                <Box
                  as="p"
                  textStyle={{ base: "body5", md: "body5" }}
                  color={"neutral.7"}
                >
                  Claim this badge by verifying you’re a part of SuperteamDAO
                </Box>
              </VStack>
              {!claimed ? (
                <Button
                  isDisabled={!isClaimAble}
                  onClick={claimProof}
                  variant={"cubikFilled"}
                  w="12rem"
                >
                  Mint
                </Button>
              ) : (
                <Button
                  variant={"cubikFilled"}
                  size={{ base: "cubikMini", md: "cubikSmall" }}
                  iconSpacing={{ base: "4px", md: "6px" }}
                  w="12rem"
                  isDisabled={claimed}
                  rightIcon={
                    claimed ? (
                      <Box
                        as={BiCheck}
                        boxSize={{ base: "15px", md: "18px" }}
                      />
                    ) : undefined
                  }
                >
                  Proof Collected
                </Button>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuperteamProof;
