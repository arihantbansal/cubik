import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
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
import { ProjectsModel } from "@cubik/database";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { FailureToast, SuccessToast } from "~/components/common/toasts/Toasts";
import ComponentErrors from "~/components/errors/ComponentErrors";
import GetFormattedLink from "~/components/HOC/GetLink";
import {
  connection,
  updateProjectRoundVerified,
} from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";
import { ProjectEmptyState } from "../../../../user-profile/empty-states/ProjectEmptyState";
import ProjectsLoadingState from "../../loadingState/ProjectsLoadingState";
import ProjectRoundManagerCardPendingStatus from "../../ProjectCard";

const GrantUnderReviewProjects = ({
  roundId,
  setProjectsNumberByStatus,
}: {
  roundId: string;
  setProjectsNumberByStatus: React.Dispatch<
    React.SetStateAction<{
      review: number;
      accepted: number;
      rejected: number;
    }>
  >;
}) => {
  const {
    data: roundData,
    isLoading,
    isError,
    error,
  } = trpc.round.findInReview.useQuery({ id: roundId });
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const [projectToBeAccepted, setProjectToBeAccepted] =
    useState<ProjectsModel | null>(null);
  const [projectToBeRejected, setProjectToBeRejected] =
    useState<ProjectsModel | null>(null);

  const updateRound = trpc.round.updateStatus.useMutation({
    onSuccess: () => {
      SuccessToast({ toast, message: "Project Accepted in Round" });
    },
    onError: (error) => {
      FailureToast({ toast, message: "Something went wrong!" });
    },
  });
  const [transactionLoading, setTransactionLoading] = useState(false);
  const {
    isOpen: isRejectModalOpen,
    onOpen: onRejectModelOpen,
    onClose: onRejectModelClose,
  } = useDisclosure();
  const {
    isOpen: isAcceptModalOpen,
    onOpen: onAcceptModalOpen,
    onClose: onAcceptModelClose,
  } = useDisclosure();
  const [transactionSignError, setTransactionSignError] = useState<
    string | null
  >();

  useEffect(() => {
    if (roundData?.ProjectJoinRound) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        review: roundData.ProjectJoinRound.length,
      }));
    }
  }, [roundData?.ProjectJoinRound, setProjectsNumberByStatus]);

  const markVerified = async (
    projectJoinRoundId: string,
    walletAddress: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      roundData?.roundName as string,
      projectCount,
      walletAddress
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    if (!txid) return;
    updateRound.mutate({
      roundId: roundId,
      projectJoinRoundId: projectJoinRoundId,
      status: "ACCEPTED",
    });
    onAcceptModelClose();
  };

  const markUnverified = async (
    projectJoinRoundId: string,
    walletAddress: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      roundData?.roundName as string,
      projectCount,
      walletAddress
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());

    if (!txid) {
      throw new Error("txid is null");
    }
    updateRound.mutate({
      roundId,
      projectJoinRoundId,
      status: "REJECTED",
    });
  };

  return (
    <VStack spacing={4} w="full">
      {isLoading ? (
        <ProjectsLoadingState isLoading={isLoading} />
      ) : isError ? (
        <Center
          w="full"
          py={{ base: "16px", sm: "24px" }}
          border="1px dashed"
          borderColor={"#1D1F1E"}
          rounded="12px"
        >
          <ComponentErrors />
        </Center>
      ) : roundData?.ProjectJoinRound.length === 0 ? (
        <ProjectEmptyState />
      ) : (
        <>
          {roundData?.ProjectJoinRound.map((projectJoinRound) => (
            <>
              <ProjectRoundManagerCardPendingStatus
                projectJoinRound={projectJoinRound}
                setProjectToBeAccepted={setProjectToBeAccepted}
                setProjectToBeRejected={setProjectToBeRejected}
                onRejectModelClose={onRejectModelClose}
                onRejectModelOpen={onRejectModelOpen}
                onAcceptModalOpen={onAcceptModalOpen}
                onAcceptModelClose={onAcceptModelClose}
              />
            </>
          ))}
          {/* Accept Model */}
          {projectToBeAccepted && (
            <Modal
              key={"accept" + projectToBeAccepted?.id}
              variant={"cubik"}
              isOpen={isAcceptModalOpen}
              onClose={() => {
                onAcceptModalOpen();
                setTransactionLoading(false);
                setTransactionSignError(null);
              }}
            >
              <ModalOverlay opacity={"1%"} />
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
                  background:
                    "linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)",
                  borderRadius: "8px 8px 0px 0px",
                  zIndex: "-1",
                }}
              >
                <ModalHeader>
                  <VStack
                    w="full"
                    spacing="8px"
                    align={"center"}
                    justify="center"
                  >
                    <Box as="p" textStyle="title1" color="neutral.11">
                      Accept Project
                    </Box>
                    <Box as="p" textStyle="body4" color="neutral.9">
                      Sign transaction to Perform the action
                    </Box>
                  </VStack>
                </ModalHeader>
                <ModalBody>
                  <VStack textAlign={"start"} align={"start"} spacing="24px">
                    <VStack align={"start"} spacing="16px">
                      <HStack align={"start"} gap="16px">
                        <Avatar
                          src={projectToBeAccepted?.logo}
                          name={projectToBeAccepted?.name}
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
                            {projectToBeAccepted?.name}
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: "title6", md: "title5" }}
                            color="neutral.8"
                          >
                            {projectToBeAccepted?.short_description}
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
                          Email Address
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.11"
                        >
                          {projectToBeAccepted?.email}
                        </Box>
                      </VStack>
                      <VStack align={"start"} textAlign="start" spacing="8px">
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.6"
                          textTransform={"uppercase"}
                        >
                          Twitter
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.11"
                        >
                          {GetFormattedLink({
                            link: projectToBeRejected?.twitter_handle as string,
                          })}
                        </Box>
                      </VStack>
                    </Stack>
                    <VStack w="full" align={"start"} spacing="32px">
                      {transactionSignError ? (
                        <Alert w="full" status="error" variant="cubik">
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
                            {transactionSignError}
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert status={"info"} variant="cubik">
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
                            By signing the transaction, the project will be
                            approved and verified to for participating in this
                            grant round
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
                    w={{ base: "full", md: "8rem" }}
                    variant="cubikOutlined"
                    size={{ bae: "cubikMini", md: "cubikSmall" }}
                    onClick={() => {
                      onAcceptModelClose();
                      setTransactionLoading(false);
                      setTransactionSignError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    px="32px"
                    variant="cubikFilled"
                    loadingText="Signing"
                    size={{ bae: "cubikMini", md: "cubikSmall" }}
                    onClick={() =>
                      markVerified(
                        roundData?.ProjectJoinRound.find(
                          (e) => e.projectId === projectToBeAccepted.id
                        )?.id ?? "",
                        projectToBeAccepted?.owner_publickey,
                        projectToBeAccepted?.projectUserCount
                      )
                    }
                    isLoading={transactionLoading}
                  >
                    Sign Transaction
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          {/* Reject Model */}
          {projectToBeRejected && (
            <Modal
              key={"reject" + projectToBeRejected?.id}
              variant={"cubik"}
              isOpen={isRejectModalOpen}
              onClose={() => {
                onRejectModelClose();
                setTransactionLoading(false);
                setTransactionSignError(null);
              }}
            >
              <ModalOverlay opacity={"1%"} />
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
                  background:
                    "linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)",
                  borderRadius: "8px 8px 0px 0px",
                  zIndex: "-1",
                }}
              >
                <ModalHeader>
                  <VStack
                    w="full"
                    spacing="8px"
                    align={"center"}
                    justify="center"
                  >
                    <Box as="p" textStyle="title1" color="neutral.11">
                      Reject Project
                    </Box>
                    <Box as="p" textStyle="body4" color="neutral.9">
                      Sign transaction to Perform the action
                    </Box>
                  </VStack>
                </ModalHeader>
                <ModalBody>
                  <VStack textAlign={"start"} align={"start"} spacing="24px">
                    <VStack align={"start"} spacing="16px">
                      <HStack align={"start"} gap="16px">
                        <Avatar
                          src={projectToBeRejected?.logo}
                          name={projectToBeRejected?.name}
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
                            {projectToBeRejected?.name}
                          </Box>
                          <Box
                            as="p"
                            textStyle={{ base: "title6", md: "title5" }}
                            color="neutral.8"
                          >
                            {projectToBeRejected?.short_description}
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
                          Email Address
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.11"
                        >
                          {projectToBeRejected?.email}
                        </Box>
                      </VStack>
                      <VStack align={"start"} textAlign="start" spacing="8px">
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.6"
                          textTransform={"uppercase"}
                        >
                          Twitter
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.11"
                        >
                          {GetFormattedLink({
                            link: projectToBeRejected?.twitter_handle as string,
                          })}
                        </Box>
                      </VStack>
                    </Stack>
                    <VStack w="full" align={"start"} spacing="32px">
                      {transactionSignError ? (
                        <Alert w="full" status="error" variant="cubik">
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
                            {transactionSignError}
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert status={"error"} variant="cubik">
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
                            By signing the transaction, the project will be
                            rejected from this round.
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
                    size={"cubikSmall"}
                    onClick={() => {
                      onRejectModelClose();
                      setTransactionLoading(false);
                      setTransactionSignError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    px="32px"
                    variant="cubikFilled"
                    loadingText="Signing"
                    size={"cubikSmall"}
                    onClick={() =>
                      markUnverified(
                        roundData?.ProjectJoinRound.find(
                          (e) => e.projectId === projectToBeRejected.id
                        )?.id ?? "",
                        projectToBeRejected?.owner_publickey,
                        projectToBeRejected?.projectUserCount
                      )
                    }
                    isLoading={transactionLoading}
                  >
                    Sign Transaction
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </VStack>
  );
};

export default GrantUnderReviewProjects;
