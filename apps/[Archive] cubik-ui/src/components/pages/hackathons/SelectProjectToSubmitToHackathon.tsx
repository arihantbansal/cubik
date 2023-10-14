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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Tag,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { ProjectJoinRoundStatus, ProjectVerifyStatus } from "@cubik/database";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SuccessToast } from "~/components/common/toasts/Toasts";
import { connection, projectJoinHackathon } from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";
import { Select } from "chakra-react-select";
import { useUserStore } from "~/store/userStore";
import { HackathonTracks } from "~/types/hackathon";
import EmptyStateHOC from "~/components/HOC/EmptyState";

type FormData = {
  mainTrack: string;
  selectedProjectId: string | null;
  tracks: {
    value: string;
    label: string;
  }[];
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hackathonId: string;
  hackathonLogo: string;
  hackathonDescription: string;
  hackathonTracks?: HackathonTracks[];
  hackathonName: string;
}
// todo make upcoming live grants separate
const SelectProjectToSubmitToHackathon = ({
  isOpen,
  onClose,
  hackathonId,
  hackathonLogo,
  hackathonDescription,
  hackathonTracks,
  hackathonName,
}: Props) => {
  const { user } = useUserStore();
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
    setValue,
    getValues,
    setError,
    getFieldState,
  } = useForm<FormData>({
    defaultValues: {
      mainTrack: "fully_on_chain_game",
    },
  });
  const [step, setStep] = useState(0);
  const [signTransactionLoading, setsignTransactionLoading] = useState(false);
  const [transactionSignError, setTransactionSignError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const joinHackathonMutation = trpc.hackathon.projectJoinHackathon.useMutation(
    {
      onSuccess: () => {
        setsignTransactionLoading(false);
        onClose();
        setStep(0);
        SuccessToast({ toast, message: "Submission Successful" });
      },
    }
  );

  const userProjects = trpc.project.projectsHackathonSubmit.useQuery(
    undefined,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const sendTransaction = async (projectUserCount: number) => {
    try {
      const tx = new anchor.web3.Transaction();
      const ix = await projectJoinHackathon(
        anchorWallet as NodeWallet,
        projectUserCount,
        1,
        "AhFfjBPCoNRDExEDFYuNK2NXCWNa1gi2VUbdA7cF19CD"
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
      if (!hackathonId) return;

      const sig = await sendTransaction(
        userProjects.data?.find((e) => e.id === selectedProject)
          ?.projectUserCount as number
      );
      if (!sig) return;
      joinHackathonMutation.mutate({
        hackathonId: hackathonId as string,
        projectId: selectedProject as string,
        tx: sig,
        tracks: getValues("tracks") || [],
        mainTracks: getValues("mainTrack") || "fully_on_chain_game",
      });
    } catch (error) {
      error;
      setsignTransactionLoading(false);
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    const project = userProjects?.data?.find(
      (project) => project.id === selectedProjectId
    );
    if (!project) return;

    setSelectedProject(project.id);
    setStep(1); // proceed to the second step instead of opening the modal
  };

  const Tile: React.FC<{
    isSelectAble: boolean;
    tileIndex: string;
    joinRoundStatus?: ProjectJoinRoundStatus | undefined;
    isHackathon: boolean | undefined;
    name: string;
    logo: string;
    status: ProjectVerifyStatus;
  }> = ({
    tileIndex,
    logo,
    joinRoundStatus,
    isHackathon = false,
    name,
    isSelectAble = true,
  }) => {
    const isSelected = selectedProjectId === tileIndex;

    return (
      <HStack
        border={isSelectAble && isSelected ? "2px solid" : "2px dashed"}
        borderColor={isSelectAble && isSelected ? "#14665B" : "#ffffff10"}
        backgroundColor={isSelectAble && isSelected ? "#010F0D" : "transparent"}
        p={{ base: "16px", md: "18px" }}
        w="full"
        gap="24px"
        rounded="16px"
        justify={"space-between"}
        align="center"
        direction={{ base: "column", md: "row" }}
        onClick={() => {
          if (isHackathon && isSelectAble) {
            setSelectedProjectId(tileIndex);
            return;
          }
          if (status === "VERIFIED" || !joinRoundStatus) {
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
          backgroundColor: isSelectAble && isSelected ? "#14665B" : "#ffffff10",
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
                src={logo}
                name={name}
                borderRadius={"8px"}
                width={{ base: "36px", sm: "48px" }}
                height={{ base: "36px", sm: "48px" }}
              />
              <HStack gap="8px">
                <Box
                  as="p"
                  textStyle={{ base: "title4", sm: "title3", md: "title2" }}
                  noOfLines={1}
                  textAlign="left"
                  color="white"
                >
                  {name}
                </Box>
                {!isSelectAble && <Tag>Submitted</Tag>}
              </HStack>
            </Stack>
          </VStack>
        </VStack>
        {isSelectAble && (
          <Center
            rounded="full"
            border="2px solid"
            w="22px"
            h="22px"
            borderColor={isSelectAble && isSelected ? "#14665B" : "#ADB8B6"}
            p="4px"
          >
            <Center
              rounded="full"
              w="full"
              h="full"
              backgroundColor={isSelectAble && isSelected ? "#14665B" : ""}
            />
          </Center>
        )}
      </HStack>
    );
  };
  const selectedArray = trpc.project.projectIsValid.useQuery(undefined, {
    staleTime: 1000,
  });
  return (
    <>
      <Modal
        variant={"cubik"}
        isOpen={isOpen}
        onClose={() => {
          reset(undefined, { keepValues: false });
          setSelectedProjectId(null);
          setStep(0);
          onClose();
        }}
      >
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
                {step === 0 ? "Submit Project" : "Sign Transaction"}
              </Box>
              <Box as="p" textStyle="body4" color="neutral.9">
                {step === 0
                  ? "Select Project and tracks for the hackathon"
                  : "Confirm and Sign transaction to submit project"}
              </Box>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <ModalBody>
              {step === 0 ? (
                <VStack pb="4rem" align={"start"} spacing="24px" w="full">
                  {userProjects.isLoading ? (
                    <Center w="full" height="10rem">
                      <Spinner />
                    </Center>
                  ) : userProjects.data && userProjects.data.length > 0 ? (
                    <VStack align={"start"} w="full" gap={"24px"}>
                      <>
                        {" "}
                        <Box
                          as="p"
                          fontSize={{ base: "12px", md: "14px" }}
                          pb="0.5rem"
                          color="neutral.11"
                        >
                          Projects
                        </Box>
                        {userProjects.data?.map((project, index) => (
                          <Tile
                            isSelectAble={
                              selectedArray.data?.find(
                                (e) => e.projectsModel.id === project.id
                              )
                                ? false
                                : true
                            }
                            key={project.id}
                            tileIndex={project.id}
                            logo={project.logo}
                            name={project.name}
                            status={project.status}
                            isHackathon={true}
                            joinRoundStatus={"APPROVED"}
                          />
                        ))}
                      </>
                      <Controller
                        control={control}
                        name={"mainTrack"}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { error },
                          formState,
                        }) => (
                          <FormControl isRequired w="full">
                            <VStack align="start" w="full">
                              <FormLabel
                                fontSize={{ base: "12px", md: "14px" }}
                                pb="0.5rem"
                                htmlFor="tracks"
                                color="neutral.11"
                              >
                                Main Tracks
                              </FormLabel>
                              <ChakraSelect
                                defaultValue={1}
                                rounded="8px"
                                h={{ base: "2.2rem", md: "2.5rem" }}
                                textStyle={{ base: "body5", md: "body4" }}
                                color="neutral.11"
                                outline="none"
                                w="full"
                                border={"none"}
                                boxShadow="none"
                                onChange={onChange}
                                onBlur={onBlur}
                                _hover={{
                                  boxShadow: "none !important",
                                  borderColor: "#ffffff10 !important",
                                  outline: "#ffffff10 !important",
                                }}
                                _focus={{
                                  boxShadow: "none !important",
                                  borderColor: "#ffffff10 !important",
                                  outline: "#ffffff10 !important",
                                }}
                                _focusVisible={{
                                  boxShadow: "none !important",
                                  borderColor: "none !important",
                                  outline: "none !important",
                                }}
                                _active={{
                                  boxShadow: "none !important",
                                  borderColor: "none !important",
                                  outline: "none !important",
                                }}
                                _placeholder={{
                                  textAlign: "start",
                                  fontSize: { base: "12px", md: "14px" },
                                  color: "#3B3D3D",
                                  px: "1rem",
                                }}
                              >
                                <option value="fully_on_chain_game">
                                  Fully On Chain Game
                                </option>
                                <option value="solana_integrated_game">
                                  Solana Integrated Game
                                </option>
                              </ChakraSelect>
                            </VStack>
                          </FormControl>
                        )}
                      />
                      <Controller
                        control={control}
                        name="tracks"
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { error },
                        }) => (
                          <FormControl
                            isInvalid={Boolean(errors.tracks)}
                            id="tracks"
                          >
                            <HStack
                              w="full"
                              pb="0.5rem"
                              justify={"space-between"}
                            >
                              <FormLabel
                                fontSize={{ base: "12px", md: "14px" }}
                                pb="0.5rem"
                                htmlFor="tracks"
                                color="neutral.11"
                              >
                                Sponsored Tracks
                              </FormLabel>
                              <Box
                                as="p"
                                fontSize={{ base: "10px", md: "12px" }}
                                color={"neutral.7"}
                                fontWeight={"600"}
                              >
                                {watch("tracks") ? watch("tracks").length : ""}
                              </Box>
                            </HStack>
                            <Select
                              isMulti
                              name={name}
                              ref={ref}
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              //@ts-ignore
                              options={
                                hackathonTracks?.map((track) => ({
                                  value: track.id,
                                  label: track.name,
                                })) || []
                              }
                              placeholder="Search Categories..."
                              closeMenuOnSelect={false}
                              selectedOptionStyle="check"
                              variant="unstyled"
                              focusBorderColor="transparent"
                              chakraStyles={{
                                container: (provided, state) => ({
                                  ...provided,
                                  border: "none",
                                  background: "surface.input_field",
                                  outline: "0px !important",
                                  borderRadius: "8px",
                                  height: "40px",
                                  boxShadow: errors.tracks
                                    ? "0 0 0 2px #E53E3E"
                                    : "0",
                                  ps: "0rem",
                                  w: "full",
                                  ":focus": {
                                    outline: "none",
                                    boxShadow: "0",
                                    border: "none",
                                  },
                                  ":hover": {
                                    outline: "none",
                                    boxShadow: "0 !important",
                                    border: "none !important",
                                  },
                                  ":active": {
                                    outline: "none",
                                    boxShadow: "0",
                                    border: "none",
                                  },
                                  ":selected": {
                                    outline: "none",
                                    boxShadow: "0",
                                    border: "none",
                                  },
                                  ":invalid": {
                                    boxShadow: "0 0 0 2px #E53E3E",
                                  },
                                }),
                                inputContainer: (provided, state) => ({
                                  ...provided,
                                  ps: "8px",
                                  fontSize: { base: "12px", md: "14px" },
                                  backgroundColor: "transparent",
                                  //  border: 'none',
                                  boxShadow: "none",
                                  outline: "none",
                                }),
                                valueContainer: (provided, state) => ({
                                  ...provided,
                                  ps: "8px",
                                  border: "none",
                                  backgroundColor: "transparent",
                                  boxShadow: "none",
                                  outline: "none",
                                }),

                                clearIndicator: (provided, state) => ({
                                  ...provided,
                                  display: "none",
                                }),
                                dropdownIndicator: (provided, state) => ({
                                  ...provided,
                                  background: "",
                                  borderColor: "transparent !important",
                                  outline: "0px !important",
                                  boxShadow: "0",
                                  p: 0,
                                  w: "60px",
                                }),
                                indicatorSeparator: (provided, state) => ({
                                  ...provided,
                                  display: "none",
                                }),
                                menu: (provided, state) => ({
                                  ...provided,
                                  //border: 'none',
                                  transform: "translateY(-10px)",
                                  backgroundColor: "#0F0F0F",
                                }),
                                menuList: (provided, state) => ({
                                  ...provided,
                                  backgroundColor: "#0F0F0F",
                                  border: "1px solid #141414",
                                  borderTop: "none",
                                  borderTopRadius: "none",
                                  boxShadow: "none",
                                  padding: "0px",
                                }),
                                option: (provided, state) => ({
                                  ...provided,
                                  color: "neutral.11",
                                  fontSize: { base: "12px", md: "14px" },
                                  fontWeight: "400",
                                  backgroundColor: state.isSelected
                                    ? "#010F0D"
                                    : state.isFocused
                                    ? "#010F0D"
                                    : "#0F0F0F",
                                  _hover: {
                                    backgroundColor: "#010F0D",
                                  },
                                  ":active": {
                                    backgroundColor: "#0F0F0F",
                                  },
                                }),
                                control: (provided, state) => ({
                                  ...provided,
                                  border: "none",
                                  backgroundColor: "#0F0F0F",
                                  boxShadow: "none",
                                  outline: "none",
                                  ":hover": {
                                    border: "none",
                                    backgroundColor: "#0F0F0F",
                                  },
                                }),
                                placeholder: (provided, state) => ({
                                  ...provided,
                                  textAlign: "start",
                                  fontSize: { base: "12px", md: "14px" },
                                  color: "#3B3D3D",
                                  px: "1rem",
                                }),
                              }}
                            />
                            <FormErrorMessage>
                              {errors.tracks && errors.tracks.message}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      />
                    </VStack>
                  ) : (
                    <VStack
                      border="1px dashed"
                      borderColor="neutral.4"
                      rounded="8px"
                      w="full"
                      pb="3rem"
                      justify={"center"}
                    >
                      <EmptyStateHOC
                        heading={"No Project Found"}
                        subHeading={
                          "To submit a project in a hackathon you have to create a project first"
                        }
                        margin={"1rem"}
                      />
                      <Link href="/submit-project">
                        <Button variant="cubikFilled" size={"cubikSmall"}>
                          Create Project
                        </Button>
                      </Link>
                    </VStack>
                  )}
                </VStack>
              ) : (
                <VStack textAlign={"start"} align={"start"} gap={"24px"}>
                  <VStack align={"start"} spacing="16px">
                    <Box
                      as="p"
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.6"
                      textTransform={"uppercase"}
                    >
                      Project
                    </Box>
                    <HStack align={"start"} gap="16px">
                      <Avatar
                        src={
                          userProjects.data?.find(
                            (e) => e.id === selectedProject
                          )?.logo
                        }
                        name={
                          userProjects.data?.find(
                            (e) => e.id === selectedProject
                          )?.name
                        }
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
                          {
                            userProjects.data?.find(
                              (e) => e.id === selectedProject
                            )?.name
                          }
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.8"
                        >
                          {
                            userProjects.data?.find(
                              (e) => e.id === selectedProject
                            )?.short_description
                          }
                        </Box>
                      </VStack>
                    </HStack>
                  </VStack>
                  <Stack
                    pb="3rem"
                    justify={"start"}
                    gap="32px"
                    direction={{ base: "column", md: "column" }}
                  >
                    <VStack align={"start"} textAlign="start" spacing="8px">
                      <Box
                        as="p"
                        textStyle={{ base: "title6", md: "title5" }}
                        color="neutral.6"
                        textTransform={"uppercase"}
                      >
                        Tracks
                      </Box>
                      {getValues("tracks") ? (
                        <HStack>
                          {getValues("tracks").map((track) => {
                            return <Tag key={track.value}>{track.label}</Tag>;
                          })}
                        </HStack>
                      ) : (
                        <Box
                          as="p"
                          textStyle={{ base: "title6", md: "title5" }}
                          color="neutral.11"
                        >
                          No Track Selected
                        </Box>
                      )}
                    </VStack>
                    <VStack align={"start"} textAlign="start" spacing="8px">
                      <Box
                        as="p"
                        textStyle={{ base: "title6", md: "title5" }}
                        color="neutral.6"
                        textTransform={"uppercase"}
                      >
                        Submitting to
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: "title6", md: "title5" }}
                        color="neutral.11"
                      >
                        {hackathonName}
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
              )}{" "}
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
                onClick={() => {
                  reset(undefined, { keepValues: false });
                  setStep(0);
                  setsignTransactionLoading(false);
                  setSelectedProjectId(null);
                  onClose();
                }}
              >
                Cancel
              </Button>
              {step === 1 ? (
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
              ) : (
                <Button
                  w="8rem"
                  ms={"auto"}
                  variant="cubikFilled"
                  type="submit"
                  isDisabled={selectedProjectId === null}
                >
                  Next
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectProjectToSubmitToHackathon;
