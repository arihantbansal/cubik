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
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";
import { useRef, useState } from "react";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import { useUserStore } from "~/store/userStore";
import { trpc } from "~/utils/trpc";
import DripHauz from "./SVGs/DripHauz";

interface Props {
  claimed: boolean;
}
const DripProof = ({ claimed }: Props) => {
  const { user } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canClaim, setCanClaimed] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const playerRef = useRef<Player>(null);
  const toast = useToast();
  const utils = trpc.useContext();
  const handleDripProof = trpc.user.dripProof.useMutation({
    onSuccess: () => {
      playerRef?.current?.play();
      utils.user.findOne.invalidate({
        username: user?.username,
      });
      setTimeout(() => {
        onClose();
        SuccessToast({
          toast,
          message: "Proof minted successfully",
        });
      }, 2000);
    },
  });

  const handleClaim = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/info/nft", {
        address: user?.mainWallet,
        collection: "F8FdDYD3PWndYoae9TrBcucXDWFwDvm6bZU2LQT1PwyB",
      });
      if (res.data.data > 0) {
        setCanClaimed(true);
        handleDripProof.mutate();
      } else {
        setError("You don't have any drip s1 NFTs");
        setCanClaimed(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setCanClaimed(false);
      setError("Something went wrong, please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <VStack onClick={onOpen} p="32px" gap="8px" align="start">
        <DripHauz size={"60px"} />
        <HStack spacing="8px">
          <Box
            as="p"
            textStyle={{ base: "", md: "title3" }}
            color={"neutral.11"}
          >
            Drip Hauz
          </Box>
          <Tag
            size={{ base: "xs", md: "sm" }}
            px="12px"
            py="4px"
            color="surface.green.2"
            background={"surface.green.3"}
            rounded="full"
          >
            {claimed ? "Claimed" : "claim"}
          </Tag>
        </HStack>
        <Box as="p" textStyle={{ base: "", md: "body5" }} color={"neutral.7"}>
          If Drip S1 NFTs were airdropped to you can collect this proof
        </Box>
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
                    <DripHauz size={"60px"} />
                  </Center>
                  <VStack spacing="12px">
                    <Box as="p" textStyle={"title2"} color="neutral.11">
                      Drip Haus Proof
                    </Box>
                    <Box
                      as="p"
                      textStyle={"overline3"}
                      color="neutral.8"
                      textTransform={"uppercase"}
                    >
                      Drip S1 NFTs Holder
                    </Box>
                  </VStack>
                  <Box as="p" textStyle={"title5"} color="neutral.11">
                    Claim your drip proof by verifying your wallet that holds
                    drip s1 NFTs.
                  </Box>
                </VStack>

                {claimed ? (
                  <>
                    <Button isDisabled variant={"connect_wallet"} w="12rem">
                      Proof Collected
                    </Button>
                  </>
                ) : canClaim ? (
                  <>
                    <Button
                      onClick={handleClaim}
                      variant={"connect_wallet"}
                      w="12rem"
                      isLoading={loading}
                    >
                      Claim
                    </Button>
                  </>
                ) : (
                  <>
                    {!error && handleDripProof.error && (
                      <Text>{handleDripProof.error.message}</Text>
                    )}
                    {error && (
                      <>
                        <Text>{error}</Text>
                      </>
                    )}
                  </>
                )}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
};

export default DripProof;
