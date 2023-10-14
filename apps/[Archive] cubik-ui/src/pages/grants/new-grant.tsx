import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Card, CardFooter } from "@chakra-ui/card";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { addDays } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormGetValues, useForm } from "react-hook-form";
import { BiChevronLeft } from "react-icons/bi";
import * as yup from "yup";
import GrantStepOne from "~/components/pages/grants/create-grant/GrantStepOne";
import GrantStepTwo from "~/components/pages/grants/create-grant/GrantStepTwo";
import GrantStepZero from "~/components/pages/grants/create-grant/GrantStepZero";
import { useUserStore } from "~/store/userStore";
import { connection, createRoundIx } from "~/utils/program/contract";
import { trpc } from "~/utils/trpc";

registerLocale("en-gb", enGB);

function isValidDate(date: any) {
  return date instanceof Date && !isNaN(date.getTime());
}

export type NewGrantsApplicationFormData = {
  name: string;
  team: string[];
  registrationStartDate: Date;
  registrationEndDate: Date;
  startDate: Date;
  endDate: Date;
  amount: number;
  pool: string;
  projects: string;
  colorScheme: string;
  short_description: string;
  contact_email: string;
  detailed_description: string;
  round_managers: [string];
  requirements?: string;
  sponsors?: [{ name: string; logo: string }];
};

const CardFooterData = ({ step }: { step: number }) => {
  return (
    <>
      <Box
        display={step === 0 ? "block" : "none"}
        px={{ base: "24px", md: "32px", lg: "56px" }}
        pb={{ base: "0px", sm: "12px", md: "24px" }}
        textStyle={{ base: "body5", md: "body3" }}
        color={"neutral.9"}
      >
        For more detailed instructions on how to deploy a Grant Round,{" "}
        <Link style={{ color: "#8FFFF0" }} href="/about/grant">
          click here.
        </Link>
      </Box>
      <CardFooter
        display={step === 0 ? "block" : "none"}
        px={{ base: "24px", md: "32px", lg: "56px" }}
        py={{ base: "18px", md: "32px" }}
        borderBottomRadius="16px"
        backgroundColor={"#141414"}
      >
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body3" }}
          color="neutral.9"
        >
          <b>Note:</b> Multiple grant managers can be added to facilitate round
          management. By initiating a grant round, you do more than support
          projects - you cultivate an innovative community, contributing
          significantly to the future of Web3.
        </Box>
      </CardFooter>
    </>
  );
};

const CreateGrantRound = () => {
  const { user } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tomorrow = addDays(new Date(), 1);
  const [increasedSize, setIncreasedSize] = useState(false);
  const anchorWallet = useAnchorWallet();
  const [step, setStep] = useState(0);
  const [editorData, setEditorData] = useState();
  const [success, setSuccess] = useState<boolean>(false);
  const [grantId, setGrantId] = useState<string>("");
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [signTransactionLoading, setSignTransactionLoading] = useState(false);

  const createRoundMutation = trpc.round.create.useMutation({
    onSuccess: (data) => {
      setGrantId(data.id);
      setSuccess(true);
    },
  });

  const schema = yup.object().shape({
    name: yup.string().required("Name is required for Round"),
    team: yup.array().of(
      yup.object().shape({
        username: yup.string(),
        id: yup.string(),
      })
    ),
    registrationStartDate: yup
      .date()
      .required("Registration Start Date is required")
      .test(
        "is-date",
        "Registration Start Date must be a valid date",
        (value) => !!Date.parse(value as any)
      ),
    registrationEndDate: yup
      .date()
      .required("Registration End Date is required")
      .test(
        "is-date",
        "Registration End Date must be a valid date",
        (value) => !!Date.parse(value as any)
      )
      .when("registrationStartDate", (registrationStartDate: any, yup: any) =>
        yup.test(
          "is-greater",
          "Registration End Date should be after Registration Start Date",
          (value: string) =>
            Date.parse(value) > Date.parse(registrationStartDate)
        )
      ),
    startDate: yup
      .date()
      .required("Round Start Date is required")
      .min(new Date(), "Round Start Date cannot be in the past")
      .when("registrationEndDate", (registrationEndDate: any, yup: any) =>
        yup.test(
          "is-greater",
          "Round Start Date should be after Registration End Date",
          (value: string) => Date.parse(value) > Date.parse(registrationEndDate)
        )
      ),
    endDate: yup
      .date()
      .required("Round End Date is required")
      .min(new Date(), "Round End Date cannot be in the past")
      .when(
        "startDate",
        (startDate: any, yup: any) =>
          startDate &&
          yup.test(
            "is-greater",
            "Round End Date should be after Round Start Date",
            (value: string) => Date.parse(value) > Date.parse(startDate)
          )
      ),
    // amount: yup.number().required('Amount is required'),
    pool: yup.string().required("Matching Pool for Round is Required"),
    projects: yup
      .string()
      .required("Maximum No of participating projects is required"),
    colorScheme: yup.string(),
    short_description: yup.string().required("Short Description is required"),
    detailed_description: yup.string(),
    round_managers: yup.array().of(yup.string()),
    requirements: yup.string(),
    sponsors: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        logo: yup.string(),
      })
    ),
  });

  const {
    handleSubmit,
    control,
    getValues,
    register,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<NewGrantsApplicationFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      // validate before submitting
      trigger();
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      onOpen();
    }
  };

  const createRound = async (
    anchorWallet: any, // Add the specific type here
    name: string,
    pool: string,
    project: string,
    colorScheme: string,
    description: string,
    short_description: string,
    start: Date | null,
    end: Date | null,
    onClose: () => void,
    setTransactionError: (error: string | null) => void
  ) => {
    try {
      const ix = await createRoundIx(
        anchorWallet as NodeWallet,
        name,
        parseInt(pool),
        parseInt(project)
      );
      const { blockhash } = await connection.getLatestBlockhash();
      const tx = new anchor.web3.Transaction();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix as anchor.web3.TransactionInstruction);
      const signed = await anchorWallet?.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signed!.serialize());
      if (!txid) {
        throw new Error("txid is null");
      }
      createRoundMutation.mutate({
        matchingPool: parseInt(pool),
        name: name,
        notionPage: "https://www.notion.so/round1",
        projectCount: parseInt(project),
        tx: txid,
        colorScheme: colorScheme,
        short_description: short_description,
        startTime: start?.toISOString() as string,
        endTime: end?.toISOString() as string,
        description: description,
        manager: (user?.username as string) ?? "",
        registrationEndDate: getValues("registrationEndDate"),
        registrationStartDate: getValues("registrationStartDate"),
      });
      onClose();
    } catch (error: any) {
      setTransactionError(error.message || "Error while signing transaction");
    }
  };

  const onSignTransaction = async (
    description: string | undefined,
    getValues: UseFormGetValues<NewGrantsApplicationFormData>,
    setSignTransactionLoading: (_loading: boolean) => void,
    setTransactionError: (_error: string | null) => void,
    anchorWallet: any, // Add the specific type here
    onClose: () => void
  ) => {
    setSignTransactionLoading(true);
    try {
      const formValues = getValues(); // get the form values here
      const startMoment = new Date(getValues("startDate"));
      const endMoment = new Date(getValues("endDate"));
      createRound(
        anchorWallet,
        formValues.name,
        formValues.pool,
        formValues.projects,
        formValues.colorScheme,
        (description as string) ?? "",
        formValues.short_description,
        startMoment,
        endMoment,
        onClose,
        setTransactionError
      );
    } catch (error: any) {
      setTransactionError(error.message || "there was an error");
    } finally {
      setSignTransactionLoading(false);
    }
  };
  return (
    <Container
      transition="all .25s ease"
      maxW="full"
      px={"16px"}
      py={{ base: "1.5rem", md: "3rem" }}
    >
      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card
          maxW="7xl"
          align="start"
          mx="auto"
          w={"full"}
          gap={{
            base: "12px",
            lg: "12px",
          }}
          padding={{
            base: step === 1 ? "24px" : "0px",
            md: step === 1 ? "40px" : "0px",
          }}
        >
          <Center
            w="full"
            gap={{
              base: "12px",
              md: "18px",
              lg: "40px",
            }}
          >
            {step === 0 ? (
              <GrantStepZero />
            ) : step === 1 ? (
              <GrantStepOne
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            ) : step === 2 ? (
              <GrantStepTwo
                setIncreasedSize={setIncreasedSize}
                editorData={editorData}
                setEditorData={setEditorData}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                register={register}
              />
            ) : (
              <></>
            )}
          </Center>
          <HStack
            w="full"
            justify={"space-between"}
            pt={{
              base: step === 1 ? "24px" : "0px",
              md: step === 1 ? "24px" : "0px",
            }}
            px={{
              base: step === 1 ? "0px" : "24px",
              md: step === 1 ? "0px" : "32px",
              lg: step === 1 ? "0px" : "54px",
            }}
            pb={{
              base: step === 2 ? "12px" : "auto",
              md: step === 2 ? "54px" : "auto",
            }}
          >
            {step > 0 && (
              <Button
                type="button" // make it explicit this doesn't submit
                variant={"cubikText"}
                leftIcon={
                  <Box
                    as={BiChevronLeft}
                    boxSize={{ base: "14px", md: "18px" }}
                  />
                }
                size={{ base: "cubikMini", md: "cubikSmall" }}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <Button
              width={{ base: step === 0 ? "full" : "auto", md: "auto" }}
              type={"button"} // this will trigger form submission only at the last step
              variant="cubikFilled"
              size={{
                base: "cubikMini",
                md: step === 0 ? "cubikMedium" : "cubikSmall",
              }}
              onClick={onSubmit} // onClick handler is needed for step 0 and 1
            >
              {step === 0 ? "Get Started" : step === 1 ? "Next Step" : "Submit"}
            </Button>
          </HStack>
          <CardFooterData step={step} />
        </Card>
      </form>
      <Modal variant={"cubik"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {success ? (
          <ModalContent>
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
                  Grant Successfully Created
                </Box>
                <Box
                  maxW="22rem"
                  textAlign={"center"}
                  as="p"
                  textStyle={"body3"}
                  color="neutral.8"
                >
                  Your Grant is Live now and you can start accepting
                  applications
                </Box>
              </VStack>
              <Button
                as={Link}
                href={`/grant/${grantId}`}
                mx="auto"
                variant="cubikFilled"
                size={{ based: "cubikMini", md: "cubikSmall" }}
                w="12rem"
              >
                View Grant
              </Button>
            </ModalHeader>
          </ModalContent>
        ) : (
          <>
            <ModalContent>
              <ModalHeader>
                <HStack>
                  <Box
                    as="p"
                    textStyle={{ base: "title3", md: "title2" }}
                    color="neutral.11"
                  >
                    Sign Transaction
                  </Box>
                </HStack>
              </ModalHeader>
              <ModalBody>
                <VStack pt="12px" align={"start"} gap="16px">
                  <Box
                    as="p"
                    textStyle={{ base: "body5", md: "body4" }}
                    color="neutral.9"
                  >
                    Signing a transaction will create the Grants round and you
                    can fund the round pool from the grants dashboard.
                  </Box>
                  {transactionError && (
                    <Alert status="error" variant="cubik">
                      <AlertIcon />
                      <AlertDescription
                        fontSize={{ base: "10px", md: "11px", xl: "12px" }}
                        lineHeight={{ base: "14px", md: "14px", xl: "16px" }}
                      >
                        {transactionError}
                      </AlertDescription>
                    </Alert>
                  )}
                </VStack>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="space-between">
                <Button
                  w="8rem"
                  variant="close_modal"
                  onClick={() => {
                    onClose();
                    setTransactionError(null);
                    setSignTransactionLoading(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  px="32px"
                  variant="apply_for_grant"
                  onClick={() =>
                    onSignTransaction(
                      editorData,
                      getValues,
                      setSignTransactionLoading,
                      setTransactionError,
                      anchorWallet,
                      onClose
                    )
                  }
                  isLoading={signTransactionLoading}
                  loadingText="Confirming"
                >
                  Sign Transaction
                </Button>
              </ModalFooter>
            </ModalContent>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CreateGrantRound;
