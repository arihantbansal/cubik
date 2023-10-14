import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, HStack, Stack, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import { useToast } from "@chakra-ui/toast";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ProjectsModel } from "@cubik/database";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { v4 as uuidV4 } from "uuid";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { formateDateInMonths } from "~/utils/formatDates";
import { formatNumberWithK } from "~/utils/formatWithK";
import { ProjectJoinRound, connection } from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";
import { drawerBodyViewEnum } from "../../ProjectHeader";
type FormData = {
  selectRoundId: string | null;
};

const ApplyForGrant: React.FC<{
  setDrawerBodyView: Dispatch<SetStateAction<drawerBodyViewEnum>>;
  project: ProjectsModel;
}> = ({ setDrawerBodyView, project }) => {
  const {
    data: roundData,
    isLoading,
    isError,
  } = trpc.round.findActive.useQuery();

  const { hasError, ErrorBoundaryWrapper } = useErrorBoundary();
  const [signTxnLoading, setSignTxnLoading] = useState(false);
  const [transactionSignError, setTransactionSignError] = useState<
    string | null
  >();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const joinRoundMutation = trpc.project.joinRound.useMutation();
  const { control, handleSubmit } = useForm<FormData>();
  const wallet = useAnchorWallet();
  const toast = useToast();
  const [selectRoundId, setSelectRoundId] = React.useState<string | null>(null);

  const sendTransaction = async (
    roundName: string,
    projectUserCount: number
  ) => {
    try {
      const tx = new anchor.web3.Transaction();
      const ix = await ProjectJoinRound(
        wallet as NodeWallet,
        roundName,
        projectUserCount
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet?.publicKey;
      tx.add(ix);
      const signTx = await wallet?.signTransaction(tx);
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // get round name of selected round id;
    const round = roundData?.find((round) => round.id === selectRoundId);
    if (!round) return;
    onOpen();
  };

  const onSignTransactionHandler = async () => {
    try {
      setSignTxnLoading(true);
      const round = roundData?.find((round) => round.id === selectRoundId);
      if (!round) return;

      const sig = await sendTransaction(
        round.roundName,
        project.projectUserCount
      );
      if (!sig) return;
      joinRoundMutation.mutate({
        roundId: selectRoundId as string,
        projectId: project.id,
        tx: sig,
        id: uuidV4(),
      });
      setSignTxnLoading(false);
      SuccessToast({ toast, message: "Submission Successful" });
      onClose();
    } catch (error) {
      setSignTxnLoading(false);
    }
  };

  if (hasError) {
    return (
      <Center w="full" h="4rem">
        There was some error
      </Center>
    );
  }
  interface TileType {
    tileIndex: string;
    roundName: string;
    startTime: Date;
    short_description: string;
    matchedPool: number;
  }
  const Tile: React.FC<TileType> = (props) => {
    const isSelected = selectRoundId === props.tileIndex;

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
        onClick={() => setSelectRoundId(props.tileIndex)}
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
            <HStack align="start">
              <Box
                color="neutral.11"
                as="p"
                textStyle={{ base: "title2", md: "title1" }}
              >
                {props.roundName}
              </Box>
              <HStack
                rounded="full"
                backgroundColor="#1D1F1E"
                p="8px 12px"
                spacing="8px"
                mx={1}
              >
                <AiTwotoneCalendar color="white" size={18} />
                <Box
                  as="p"
                  whiteSpace="pre"
                  color="neutral.11"
                  textStyle={{ base: "body6", md: "body5" }}
                >
                  Start - {formateDateInMonths(props.startTime)}
                </Box>
              </HStack>
            </HStack>
            <Box as="p" textStyle={"body4"} color="neutral.9">
              {props.short_description}
            </Box>
          </VStack>
          <HStack
            bg="#ffffff08"
            rounded="8px"
            shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
            outline="1px solid #ffffff16"
            p={{ base: "0.6rem 1.2rem", md: "0.8rem 1.5rem" }}
          >
            <Box
              color="#B4B0B2"
              textTransform={"uppercase"}
              as="p"
              textStyle={{ base: "body5", md: "overline3" }}
            >
              Matching Pool
            </Box>
            <Box as="p" textStyle={{ base: "body3", md: "title4" }}>
              : {formatNumberWithK(props.matchedPool)} USDC
            </Box>
          </HStack>
        </VStack>{" "}
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

  const TileSkeleton: React.FC = () => {
    return (
      <HStack
        border="2px solid"
        borderColor="#ffffff10"
        backgroundColor="#000000"
        p={{ base: "16px", md: "32px" }}
        w="full"
        gap="24px"
        rounded="16px"
        justify={"space-between"}
        align="center"
        direction={{ base: "column", md: "row" }}
      >
        <VStack align={"start"} width="full" spacing="24px">
          <VStack align="start" width="full" spacing="12px">
            <Skeleton height="2rem" width="10rem" />
            <SkeletonText noOfLines={2} skeletonHeight={2} width={"full"} />
          </VStack>
          <Skeleton py="24px" height="1rem" width="18rem" />
        </VStack>{" "}
        <SkeletonCircle
          rounded="full"
          border="3px solid"
          w="32px"
          h="32px"
          p="4px"
        />
      </HStack>
    );
  };

  const FilteredRoundTiles = () => {
    if (roundData?.length === 0) {
      // there is no round to be applied for then show there is no acitve round currently
      return (
        <Center
          maxW={"7xl"}
          mx="auto"
          w="full"
          py={{ base: "32px", sm: "54px" }}
          border="1px dashed"
          borderColor={"#1D1F1E"}
          rounded="12px"
        >
          <Box as="p" textStyle="body4" color="neutral.6">
            No Round to Apply
          </Box>
        </Center>
      );
    } // there is a round to be applied for then show the round tiles
    else {
      return (
        <VStack w="full" spacing="24px">
          {roundData?.map((round) => {
            return (
              <Tile
                tileIndex={round.id}
                matchedPool={round.matchedPool}
                roundName={round.roundName}
                short_description={round.short_description}
                key={round.id}
                startTime={round.startTime}
              />
            );
          })}
        </VStack>
      );
    }
  };
  return (
    <ErrorBoundaryWrapper>
      <VStack
        align="start"
        p={{ base: "24px", md: "40px" }}
        spacing={{ base: "18px", md: "32px" }}
        w="full"
      >
        <Box as="p" textStyle={{ base: "title2", md: "headline2" }}>
          Select a Grant
        </Box>
        <VStack
          maxH="50vh"
          overflow="scroll"
          w="full"
          align={"start"}
          spacing={{ base: "18px", md: "32px" }}
        >
          {isLoading ? (
            <VStack w="full" spacing={{ base: "24px", md: "32px" }}>
              <TileSkeleton />
              <TileSkeleton />
            </VStack>
          ) : (
            <FilteredRoundTiles />
          )}
        </VStack>
        <Center w="full">
          <Alert status="info" variant="cubik">
            <AlertIcon />
            <VStack w="full" align={"start"} spacing="8px">
              <AlertTitle>Important Information</AlertTitle>
              <AlertDescription
                fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
              >
                Once you`ve applied for participating in a grants round, please
                note that your project will undergo a thorough review by the
                grant provider. This process may take several days. Should your
                project be accepted into the grant round, you`ll be notified. In
                the event of rejection, detailed information will be sent to
                your email. Kindly be patient and check your inbox for updates.
              </AlertDescription>
            </VStack>
          </Alert>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="selectRoundId"
            control={control}
            defaultValue={selectRoundId}
            render={({ field }) => (
              <Checkbox
                display={"none"}
                isChecked={selectRoundId !== null}
                onChange={() => field.onChange(selectRoundId)}
                onBlur={field.onBlur}
                value={selectRoundId ?? undefined}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
          <HStack
            py={{ base: "24px", md: "32px" }}
            justify={"space-between"}
            align="center"
            w="full"
          >
            <Button
              variant={"cubikText"}
              size={"cubikSmall"}
              w="8rem"
              onClick={() =>
                setDrawerBodyView(drawerBodyViewEnum.PROJECT_DETAILS)
              }
              leftIcon={
                <Box
                  as={FiChevronLeft}
                  boxSize={{ base: "12px", md: "18px" }}
                />
              }
            >
              Back
            </Button>
            <Button
              variant={"cubikFilled"}
              size={"cubikSmall"}
              w="8rem"
              type="submit"
              isDisabled={isLoading || isError || selectRoundId === null}
            >
              Apply
            </Button>
          </HStack>
        </form>
      </VStack>
      <Modal variant={"cubik"} isOpen={isOpen} onClose={onClose}>
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
                    src={project.logo}
                    name={project.name}
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
                      {project.name}
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.8"
                    >
                      {project.short_description}
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
                    {
                      roundData?.find((round) => round.id === selectRoundId)
                        ?.roundName
                    }{" "}
                    Round
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
                      {transactionSignError}
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
              onClick={onSignTransactionHandler}
              loadingText="Verifying"
              isLoading={signTxnLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ErrorBoundaryWrapper>
  );
};

export default ApplyForGrant;
