import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import { TruncatedAddr } from "~/components/common/wallet/WalletAdd";

import GetFormattedLink from "~/components/HOC/GetLink";
import {
  connection,
  markProjectFailed,
  markProjectVerified,
} from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";

type ActionType = "accept" | "reject";

interface CurrentAction {
  type: ActionType;
  id: string;
  username: string;
  count: number;
  owner: string;
}
interface SelectedProject {
  name: string;
  logo: string;
  publickey: string;
  short_description: string;
  username: string;
}
const ReviewProjectsTab = ({ setProjectsNumberByStatus }: any) => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findManyReview.useQuery();
  const anchorWallet = useAnchorWallet();
  const toast = useToast();
  const [selectedProject, setSelectedProject] =
    useState<SelectedProject | null>(null);
  const projectUpdateMutation = trpc.project.updateProjectStatus.useMutation({
    onSuccess: () => {
      SuccessToast({ toast, message: "Project Updated" });
    },
  });
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<CurrentAction | null>(
    null
  );

  const [transactionSignError, setTransactionSignError] = useState<
    string | null
  >();

  useEffect(() => {
    if (projects) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        review: projects.length,
      }));
    }
  }, [projects, setProjectsNumberByStatus]);

  const ApproveProject = async (
    id: string,
    username: string,
    count: number,
    owner: string
  ) => {
    try {
      setTransactionLoading(true);
      const ix = await markProjectVerified(
        anchorWallet as NodeWallet,
        username,
        count,
        owner
      );
      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new anchor.web3.Transaction();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signedTx = await anchorWallet?.signTransaction(tx);
      if (!signedTx) throw new Error("Error signing transaction");
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      projectUpdateMutation.mutate({
        id: id,
        status: "VERIFIED",
      });
      setIsActionModalOpen(false);
    } catch (error: any) {
      setTransactionSignError(error.message || "An error occurred");
    } finally {
      setTransactionLoading(false);
    }
  };

  const RejectProject = async (
    id: string,
    username: string,
    count: number,
    owner: string
  ) => {
    try {
      setTransactionLoading(true);
      const ix = await markProjectFailed(
        anchorWallet as NodeWallet,
        username,
        count,
        owner
      );
      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new anchor.web3.Transaction();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signedTx = await anchorWallet?.signTransaction(tx);
      if (!signedTx) throw new Error("Error signing transaction");
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      projectUpdateMutation.mutate({
        id: id,
        status: "REVIEW",
      });
      setIsActionModalOpen(false);
    } catch (error: any) {
      setTransactionSignError(error.message || "An error occurred");
    } finally {
      setTransactionLoading(false);
    }
  };

  const onActionModalOpen = () => setIsActionModalOpen(true);
  const onActionModalClose = () => setIsActionModalOpen(false);

  const handleAction = async (
    actionType: ActionType,
    id: string,
    username: string,
    count: number,
    owner: string
  ) => {
    const project = projects?.find((project) => project.id === id);

    if (!project) return null;

    setSelectedProject({
      name: project.name,
      logo: project.logo,
      publickey: project.owner_publickey as string,
      short_description: project.short_description,
      username: project.owner.username as string,
    });
    setCurrentAction({ type: actionType, id, username, count, owner });
    onActionModalOpen();
  };

  const handleSignTransaction = async () => {
    if (!currentAction) return;

    try {
      setTransactionLoading(true);
      if (currentAction.type === "accept") {
        await ApproveProject(
          currentAction.id,
          currentAction.username,
          currentAction.count,
          currentAction.owner
        );
      } else if (currentAction.type === "reject") {
        await RejectProject(
          currentAction.id,
          currentAction.username,
          currentAction.count,
          currentAction.owner
        );
      }
      setTransactionSignError(null);
    } catch (error: any) {
      setTransactionSignError(error.message || "An error occurred");
    } finally {
      setTransactionLoading(false);
      onActionModalClose();
    }
  };

  if (isLoading)
    <Center w="full" h="10rem">
      <Spinner />
    </Center>;

  if (isError)
    <Center w="full" h="10rem">
      There was an Error
    </Center>;
  return (
    <VStack spacing={4} w="full">
      {projects?.map((project) => (
        <>
          <Card
            key={project.id}
            border="none"
            px="24px"
            pt={{ base: "16px", sm: "20px", md: "24px" }}
            pb={{ base: "16px", sm: "20px", md: "24px" }}
            gap={{ base: "16px", sm: "20px", md: "24px" }}
            w="100%"
          >
            <CardBody>
              <Stack
                direction={{ base: "column", sm: "row" }}
                px={""}
                gap={"12px"}
                w="full"
              >
                <Stack
                  w="full"
                  direction="row"
                  gap={{ base: "8px", sm: "12px", md: "16px" }}
                >
                  <Center>
                    <Avatar
                      src={project.logo}
                      name={project.name}
                      width={{ base: "36px", sm: "48px", md: "52px" }}
                      height={{ base: "36px", sm: "48px", md: "52px" }}
                    />
                  </Center>
                  <VStack
                    alignItems={"start"}
                    align={"center"}
                    justify="center"
                    spacing={{ base: "2px", sm: "4px", md: "6px" }}
                  >
                    <Box
                      as="p"
                      textStyle={{
                        base: "title4",
                        sm: "title3",
                        md: "title2",
                      }}
                      noOfLines={1}
                      textAlign="left"
                      color="white"
                    >
                      {project.name}
                    </Box>
                    <GetFormattedLink link={project.project_link} />
                  </VStack>
                </Stack>
                <HStack justifyContent={"end"}>
                  <Button
                    size={{ base: "cubikSmall", md: "cubikMedium" }}
                    variant={"cubikDanger"}
                    h={{ base: "2.6rem", md: "full" }}
                    minH={"3rem"}
                    w={{ base: "full", sm: "7rem", md: "9rem" }}
                    onClick={() =>
                      handleAction(
                        "reject",
                        project.id,
                        project.owner.username,
                        project.projectUserCount,
                        project.owner_publickey
                      )
                    }
                  >
                    Reject
                  </Button>
                  <Button
                    size={{ base: "cubikSmall", md: "cubikMedium" }}
                    variant={"cubikFilled"}
                    h={{ base: "2.6rem", md: "full" }}
                    minH={"3rem"}
                    w={{ base: "full", sm: "7rem", md: "9rem" }}
                    onClick={() =>
                      handleAction(
                        "accept",
                        project.id,
                        project.owner.username,
                        project.projectUserCount,
                        project.owner_publickey
                      )
                    }
                  >
                    Accept
                  </Button>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        </>
      ))}

      <Modal
        variant={"cubik"}
        isOpen={isActionModalOpen}
        onClose={onActionModalClose}
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
            background: "linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)",
            borderRadius: "8px 8px 0px 0px",
            zIndex: "-1",
          }}
        >
          <ModalHeader>
            <VStack w="full" spacing="8px" align={"center"} justify="center">
              <Box as="p" textStyle="title1" color="neutral.11">
                {currentAction &&
                  (currentAction.type === "accept"
                    ? "Accept Project"
                    : "Reject Project")}
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
                    Email Address
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.11"
                  >
                    hashtag.irfan@gmail.com
                  </Box>
                </VStack>
                <VStack align={"start"} textAlign="start" spacing="8px">
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.6"
                    textTransform={"uppercase"}
                  >
                    Creator
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "title6", md: "title5" }}
                    color="neutral.11"
                  >
                    @{selectedProject?.username}{" "}
                    <Box px="0.5rem" as="span" color="neutral.6">
                      {TruncatedAddr({
                        walletAddress:
                          (selectedProject?.publickey as string) ?? "",
                      })}
                    </Box>
                  </Box>
                </VStack>
              </Stack>
              <VStack align={"start"} spacing="32px">
                {transactionSignError ? (
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
                      {transactionSignError}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert
                    status={currentAction?.type === "accept" ? "info" : "error"}
                    variant="cubik"
                  >
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
                      {currentAction &&
                        (currentAction.type === "accept"
                          ? "By signing the transaction, the project will be approved and verified to be listed on cubik. The project will be able to apply for grants and visible to all users"
                          : "By signing the transaction, the project will be rejected which means that there was something wrong with the project and it did not get verified")}
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
              size={{ base: "cubikMini", md: "cubikSmall" }}
              variant={"cubikOutlined"}
              onClick={() => {
                onActionModalClose();
                setTransactionSignError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              px="32px"
              size={{ base: "cubikMini", md: "cubikSmall" }}
              variant={"cubikFilled"}
              loadingText="Confirming"
              onClick={handleSignTransaction}
              isLoading={transactionLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ReviewProjectsTab;
