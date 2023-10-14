import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ProjectJoinRoundStatus, ProjectsModel } from "@cubik/database";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import { v4 as uuidV4 } from "uuid";
import NoInformation from "~/components/common/empty-state/NoInformation";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import EmptyStateHOC from "~/components/HOC/EmptyState";
import { useUserStore } from "~/store/userStore";
import { connection, ProjectJoinRound } from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";

type FormData = {
  selectedProjectId: string | null;
};
// todo make upcoming live grants separate
const SelectProjectToApplyForGrant = ({
  isOpen,
  onClose,
  selectedGrantRound,
}: any) => {
  const { user } = useUserStore();
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const { handleSubmit } = useForm<FormData>();

  const {
    data: userDataWithProjectsAndRoundDetails,
    isLoading: userProjectsLoading,
    error: userProjectsError,
    isError: userProjectsIsError,
  } = trpc.user.findOneWithProjectAndRoundDetails.useQuery({
    username: user?.username as string,
  });

  const [signTransactionLoading, setsignTransactionLoading] = useState(false);
  const [transactionSignError, setTransactionSignError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedProject, setSelectedProject] = useState<ProjectsModel | null>(
    null
  );
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const joinRoundMutation = trpc.project.joinRound.useMutation({
    onSuccess: () => {
      ("success");
    },
  });

  const sendTransaction = async (
    roundName: string,
    projectUserCount: number
  ) => {
    try {
      const tx = new anchor.web3.Transaction();
      const ix = await ProjectJoinRound(
        anchorWallet as NodeWallet,
        roundName,
        projectUserCount
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signTx = await anchorWallet?.signTransaction(tx);
      if (!signTx) throw new Error("Failed to sign transaction");
      const serialized_transaction = signTx.serialize();
      const sig = await connection.sendRawTransaction(serialized_transaction);
      if (!sig) throw new Error("Failed to send transaction");
      return sig;
    } catch (error: any) {
      setTransactionSignError(error.message || "There was some error");
      return null;
    }
  };

  const signTransactionHandler = async () => {
    try {
      setsignTransactionLoading(true);
      if (!selectedGrantRound) return;

      const sig = await sendTransaction(
        selectedGrantRound.roundName,
        selectedProject?.projectUserCount as number
      );
      if (!sig) return;
      joinRoundMutation.mutate({
        roundId: selectedGrantRound.id as string,
        projectId: selectedProject?.id as string,
        tx: sig,
        id: uuidV4(),
      });
      setsignTransactionLoading(false);
      onClose();
      SuccessToast({ toast, message: "Submission Successful" });
    } catch (error) {
      error;
      setsignTransactionLoading(false);
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    const project = userDataWithProjectsAndRoundDetails?.project?.find(
      (project) => project.id === selectedProjectId
    );
    if (!project) return;

    setSelectedProject(project);
    onModalOpen();
  };

  const Tile: React.FC<{
    tileIndex: string;
    project: ProjectsModel;
    joinRoundStatus: ProjectJoinRoundStatus | undefined;
  }> = ({ tileIndex, project, joinRoundStatus }) => {
    const isSelected = selectedProjectId === tileIndex;

    return (
      <HStack
        border={"2px solid"}
        borderColor={isSelected ? "#14665B" : "#ffffff10"}
        backgroundColor={isSelected ? "#010F0D" : "#000000"}
        p={{ base: "16px", md: "32px" }}
        w="full"
        gap="24px"
        rounded="20px"
        justify={"space-between"}
        align="center"
        direction={{ base: "column", md: "row" }}
        onClick={() => {
          if (project.status === "VERIFIED" || !joinRoundStatus) {
            setSelectedProjectId(tileIndex);
          } else {
            return;
          }
        }}
        position="relative"
        overflow={"hidden"}
        _after={{
          content: '""',
          zIndex: "1",
          position: "absolute",
          bottom: "50%",
          left: "0%",
          transform: "translate(0%, -50%)",
          width: "8rem",
          height: "8rem",
          backgroundColor: isSelected ? "#14665B" : "#ffffff10",
          filter: "blur(100px)",
          borderRadius: "full",
        }}
      >
        <VStack align={"start"} spacing="24px">
          <VStack align="start" w="full" spacing="12px">
            <Stack
              w="full"
              direction="row"
              gap={{ base: "8px", sm: "12px", md: "16px" }}
              align="center"
            >
              <Avatar
                src={project.logo}
                name={project.name}
                width={{ base: "36px", sm: "48px", md: "52px" }}
                height={{ base: "36px", sm: "48px", md: "52px" }}
              />
              <Box
                as="p"
                textStyle={{ base: "title4", sm: "title3", md: "title2" }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {project.name}
              </Box>
            </Stack>
          </VStack>
        </VStack>
        <Center
          rounded="full"
          border="3px solid"
          w="30px"
          h="30px"
          borderColor={isSelected ? "#14665B" : "#ADB8B6"}
          p="4px"
        >
          <Center
            rounded="full"
            w="full"
            h="full"
            backgroundColor={isSelected ? "#14665B" : ""}
          />
        </Center>
      </HStack>
    );
  };

  return (
    <>
      <Drawer size={"sm"} placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay color="rgba(0, 0, 0, 0.72)" backdropFilter="blur(8px)" />
        <DrawerContent
          borderColor={"#1D1F1E"}
          borderBottom={"none"}
          borderTopRadius={"24px"}
          background="#080808"
          maxW="50rem !important"
          mx="auto"
          p="0"
        >
          <DrawerCloseButton
            transform={"translateY(-3rem)"}
            rounded="full"
            backgroundColor="#141414"
          />

          <DrawerBody p="40px" minH={"20rem"}>
            {/* select project to apply for grant */}
            {userProjectsLoading ? (
              <>is loading</>
            ) : userDataWithProjectsAndRoundDetails &&
              userDataWithProjectsAndRoundDetails.project.length > 0 ? (
              <VStack gap="24px">
                {userDataWithProjectsAndRoundDetails?.project.filter(
                  (project) => {
                    return !project.ProjectJoinRound.some(
                      (projectJoinRound) =>
                        projectJoinRound?.roundId === selectedGrantRound?.id
                    );
                  }
                ).length > 0 ? (
                  userDataWithProjectsAndRoundDetails?.project
                    .filter((project) => {
                      return (
                        !project.ProjectJoinRound.some(
                          (projectJoinRound) =>
                            projectJoinRound?.roundId === selectedGrantRound?.id
                        ) && project.status === "VERIFIED"
                      );
                    })
                    .map((project, index) => (
                      <Tile
                        key={project.id}
                        tileIndex={project.id}
                        project={project}
                        joinRoundStatus={
                          project.ProjectJoinRound.find(() =>
                            project.ProjectJoinRound.find(
                              (e) => e.roundId === selectedGrantRound?.id
                            )
                          )?.status
                        }
                      />
                    ))
                ) : (
                  <NoInformation />
                )}
              </VStack>
            ) : (
              <VStack py="4rem" justify={"center"}>
                <EmptyStateHOC
                  heading={"No Project Found"}
                  subHeading={
                    "You have not submitted any project and you can not apply for grant"
                  }
                  margin={"1rem"}
                />
                <Button
                  variant="cubikFilled"
                  size={"cubikSmall"}
                  as={Link}
                  href="/submit-project"
                  leftIcon={<BsPlus width={20} height={20} />}
                >
                  New Project
                </Button>
              </VStack>
            )}
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <VStack py="24px" w={"full"}>
                <Button
                  w="8rem"
                  ms={"auto"}
                  variant="cubikFilled"
                  type="submit"
                  isDisabled={selectedProjectId === null}
                >
                  Apply
                </Button>
              </VStack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal variant={"cubik"} isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent
          minW={{ base: "24rem", md: "36rem" }}
          overflow={"hidden"}
          position={"relative"}
          gap={{ base: "32px", md: "48px" }}
          textAlign={"center"}
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
          <ModalHeader>
            <VStack w="full" spacing="8px" align={"center"} justify="center">
              <Box as="p" textStyle="title1" color="neutral.11">
                Submit Grant Application
              </Box>
              <Box as="p" textStyle="body4" color="neutral.9">
                Sign transaction to Perform the action
              </Box>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack textAlign={"start"} align={"start"} spacing="24px">
              <VStack align={"start"} spacing="16px">
                <HStack align={"start"} gap="16px">
                  <Avatar
                    src={selectedProject?.logo}
                    name={selectedProject?.name}
                    borderRadius="8px"
                    width={{ base: "60px", md: "80px" }}
                    height={{ base: "60px", md: "80px" }}
                  />
                  <VStack textAlign={"start"} align={"start"} gap="8px">
                    <Box
                      as="p"
                      textStyle={{ base: "title3", md: "title2" }}
                      color="neutral.11"
                    >
                      {selectedProject?.name}
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.8"
                    >
                      {selectedProject?.short_description}
                    </Box>
                  </VStack>
                </HStack>
              </VStack>
              <Stack
                justify={"start"}
                gap="32px"
                direction={{ base: "column", md: "row" }}
              >
                <VStack align={"start"} textAlign="start" spacing="8px">
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.6"
                    textTransform={"uppercase"}
                  >
                    Applying For Grant Round
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.11"
                  >
                    {selectedGrantRound?.roundName}
                  </Box>
                </VStack>
              </Stack>
              <VStack align={"start"} spacing="32px">
                {transactionSignError && (
                  <Alert status="error" variant="cubik">
                    <AlertIcon />
                    <AlertDescription
                      fontSize={{
                        base: "10px",
                        md: "11px",
                        xl: "12px",
                      }}
                      lineHeight={{
                        base: "14px",
                        md: "14px",
                        xl: "16px",
                      }}
                    >
                      {}
                    </AlertDescription>
                  </Alert>
                )}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter
            display="flex"
            h={"fit-content"}
            justifyContent="space-between"
          >
            <Button
              w="8rem"
              variant="cubikOutlined"
              size="cubikSmall"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              px="32px"
              variant="cubikFilled"
              size="cubikSmall"
              onClick={signTransactionHandler}
              loadingText="Verifying"
              isLoading={signTransactionLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectProjectToApplyForGrant;
