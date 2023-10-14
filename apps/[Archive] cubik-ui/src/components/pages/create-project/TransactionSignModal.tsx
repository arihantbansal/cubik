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
  useToast,
  VStack,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import { FailureToast, SuccessToast } from "~/components/common/toasts/Toasts";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";
import { useUserStore } from "~/store/userStore";
import { connection, createProject } from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";
import { createVault, getVault } from "~/utils/vault";

type CreateProjectTransactionModalProps = {
  getValues: UseFormGetValues<FormData>;
  isTransactionModalOpen: boolean;
  onTransactionModalClose: () => void;
  imageUrl: string;
  editorData: string;
};

export type FormData = {
  projectName: string;
  tagline: string;
  category: { label: string; value: string; colorScheme: string }[];
  logo: FileList;
  twitter: string;
  github: string;
  projectLink: string;
  telegram: string;
  discord: string;
  description: string;
  email: string;
  team: {
    label: string;
    value: string;
  }[];
};

const CreateProjectTransactionModal: React.FC<
  CreateProjectTransactionModalProps
> = ({
  getValues,
  isTransactionModalOpen,
  onTransactionModalClose,
  imageUrl,
  editorData,
}) => {
  const toast = useToast();
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | undefined>();
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const { user } = useUserStore();
  const projectCount = trpc.project.count.useQuery({
    id: (user?.id as string) ?? "",
  });
  const anchorWallet = useAnchorWallet();

  const createProjectMutation = trpc.project.create.useMutation({
    onSuccess: async (data) => {
      // const a = await axios.post('/api/createNotion', {
      //   data: data,
      // });
      setProjectId(data.id);
      SuccessToast({ toast, message: "Project Submitted Succesfully" });
      setProjectSubmitted(true);
    },
    onError: (error) => {
      setTransactionError(
        "There was a error in creating the project please contact the team"
      );
      FailureToast({ toast, message: "Project Submitted Failed" });
    },
  });

  const HandleTransactionSign = async () => {
    setTransactionLoading(true);
    if (!user) return;
    const id = uuidV4();
    try {
      const {
        ix: valutIx,
        key,
        createKey,
      } = await createVault(
        user?.username as string,
        anchorWallet as NodeWallet,
        getValues().projectName,
        imageUrl as string
      );
      const vaultAuth = await getVault(anchorWallet as NodeWallet, key);
      const tx = new anchor.web3.Transaction();
      const ix = await createProject(
        anchorWallet as NodeWallet,
        (projectCount.data?._count.project as number) + 1,
        new anchor.web3.PublicKey(vaultAuth)
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(valutIx);
      tx.add(ix);
      const signTx = await anchorWallet?.signTransaction(tx);
      if (!signTx) return;
      const serialized_transaction = signTx.serialize();
      const sig = await connection.sendRawTransaction(serialized_transaction);
      if (!sig) return;
      createProjectMutation.mutate({
        id: id,
        name: getValues().projectName,
        sig: sig,
        short_description: getValues().tagline,
        logo: imageUrl as string,
        long_description: editorData as string,
        industry: JSON.stringify(getValues().category),
        github_link: getValues().github,
        twitter_handle: getValues().twitter,
        project_link: getValues().projectLink,
        discord_link: getValues().discord,
        telegram_link: getValues().telegram,
        projectUserCount: (projectCount.data?._count.project as number) + 1,
        team: getValues()?.team?.map((member) => member.value) ?? [],
        multiSigAddress: vaultAuth,
        createKey: createKey.toBase58(),
        email: getValues().email,
      });
      setProjectId(id);
    } catch (error: any) {
      setTransactionError(
        error.message || "There was an error while signing the transaction"
      );
      setTransactionLoading(false);
    }
  };

  return (
    <>
      <Modal
        variant={"cubik"}
        isOpen={isTransactionModalOpen}
        onClose={onTransactionModalClose}
      >
        <ModalOverlay />
        <ModalContent
          minW={{ base: "80vw", sm: "26rem", md: "36rem" }}
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
          {projectSubmitted ? (
            <>
              <ModalHeader
                display={"flex"}
                flexDirection="column"
                gap="24px"
                w="full"
              >
                <Center>
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.24">
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="url(#paint0_linear_849_10088)"
                      />
                      <path
                        d="M95.8925 48.836C95.4309 75.2863 73.6144 96.3542 47.164 95.8925C20.7137 95.4309 -0.354246 73.6144 0.107446 47.164C0.569138 20.7137 22.3856 -0.354246 48.836 0.107446C75.2863 0.569138 96.3542 22.3856 95.8925 48.836Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <g opacity="0.24">
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="url(#paint1_linear_849_10088)"
                      />
                      <path
                        d="M83.8942 48.6265C83.5482 68.4505 67.1972 84.2404 47.3733 83.8944C27.5493 83.5484 11.7594 67.1974 12.1054 47.3735C12.4514 27.5495 28.8024 11.7596 48.6264 12.1056C68.4503 12.4516 84.2403 28.8026 83.8942 48.6265Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      fill="url(#paint2_linear_849_10088)"
                    />
                    <g clipPath="url(#clip0_849_10088)">
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="#14665B"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="url(#paint3_linear_849_10088)"
                        fill-opacity="0.48"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="#14665B"
                        strokeWidth="0.710526"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="url(#paint4_linear_849_10088)"
                        strokeOpacity="0.48"
                        strokeWidth="0.710526"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#001F1B"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_849_10088"
                        x1="48"
                        y1="0"
                        x2="48"
                        y2="96"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_849_10088"
                        x1="47.9998"
                        y1="12"
                        x2="47.9998"
                        y2="84"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_849_10088"
                        x1="25.0001"
                        y1="25"
                        x2="71.0001"
                        y2="71"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#B3FFF5" />
                        <stop offset="1" stopColor="#5ACCBD" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <clipPath id="clip0_849_10088">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(37.0001 37)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Center>
                <VStack gap="6px">
                  <Box as="p" textStyle={{ base: "title3", md: "headline4" }}>
                    Project Submitted Successfully!
                  </Box>
                  <Box
                    maxW="22rem"
                    as="p"
                    textStyle={"body3"}
                    color="neutral.8"
                  >
                    Your project is under review and you will be notified soon.
                  </Box>
                </VStack>
                <Box mx="auto">
                  <Link href={`/${user?.username}/${projectId}`}>
                    <Button
                      variant="cubikFilled"
                      size={{ based: "cubikMini", md: "cubikSmall" }}
                      w="12rem"
                    >
                      View Project
                    </Button>
                  </Link>
                </Box>
              </ModalHeader>
            </>
          ) : (
            <>
              <ModalHeader>
                <VStack
                  w="full"
                  spacing="8px"
                  align={"center"}
                  justify="center"
                >
                  <Box
                    as="p"
                    textStyle={{ base: "title3", md: "title1" }}
                    color="neutral.11"
                  >
                    Almost there! Just one more step
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "body5", md: "body4" }}
                    color="neutral.9"
                  >
                    Review project details, sign the transaction, and submit for
                    review
                  </Box>
                </VStack>
              </ModalHeader>
              <ModalBody>
                <VStack textAlign={"start"} align={"start"} spacing="24px">
                  <VStack
                    align={"start"}
                    spacing={{ base: "14px", md: "16px" }}
                  >
                    <HStack align={"start"} gap={{ base: "14px", md: "16px" }}>
                      <Avatar
                        src={imageUrl as string}
                        name={getValues("projectName")}
                        borderRadius="8px"
                        width={{ base: "60px", md: "80px" }}
                        height={{ base: "60px", md: "80px" }}
                      />
                      <VStack
                        textAlign={"start"}
                        align={"start"}
                        spacing={"8px"}
                      >
                        <Box
                          as="p"
                          textStyle={{ base: "title4", md: "title2" }}
                          color="neutral.11"
                        >
                          {getValues("projectName")}
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title7", md: "title5" }}
                          color="neutral.8"
                        >
                          {getValues("tagline")}
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
                        {getValues("email")}
                      </Box>
                    </VStack>
                    <VStack align={"start"} textAlign="start" spacing="8px">
                      <Box
                        as="p"
                        textStyle={{ base: "title6", md: "title5" }}
                        color="neutral.6"
                        textTransform={"uppercase"}
                      >
                        Wallet Address
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title6", md: "title5" }}
                        color="neutral.11"
                      >
                        <WalletAddress
                          size="sm"
                          color="#fff"
                          walletAddress={user?.mainWallet as string}
                        />
                      </Box>
                    </VStack>
                  </Stack>
                  <VStack align={"start"} spacing="32px" w="full">
                    {transactionError ? (
                      <Alert status="error" variant="cubik">
                        <AlertIcon />
                        <AlertDescription
                          fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                          lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                        >
                          {transactionError}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert status="info" variant="cubik">
                        <AlertIcon />
                        <AlertDescription
                          fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                          lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                        >
                          By signing the transaction, you agree to our Terms of
                          Service and acknowledge that your project may be
                          subject to review and approval.
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
                  variant="cubikOutlined"
                  onClick={() => {
                    onTransactionModalClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  px="32px"
                  size={{ base: "cubikMini", md: "cubikSmall" }}
                  variant="cubikFilled"
                  onClick={() => HandleTransactionSign()}
                  loadingText="Confirming"
                  isLoading={transactionLoading}
                >
                  Sign Transaction
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectTransactionModal;
