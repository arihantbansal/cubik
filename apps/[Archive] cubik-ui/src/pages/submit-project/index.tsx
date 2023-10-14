import { Card, CardHeader } from "@chakra-ui/card";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, HStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ProjectsModel } from "@cubik/database";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { array, object, string } from "yup";
import withAuth from "~/components/HOC/WithAuth";
import SEO from "~/components/SEO";
import CustomStepper from "~/components/common/stepper/CustomStepper";
import { StepOne, StepThree, StepTwo } from "~/components/pages/create-project";
import CreateProjectTransactionModal from "~/components/pages/create-project/TransactionSignModal";
import { uploadToCloudinary } from "~/utils/upload";

type SubmitProjectProps = {
  onSubmit: (_project: Project) => void;
};
type Project = ProjectsModel;

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

const SubmitProject: React.FC<SubmitProjectProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<number>(1);
  const [increasedSize, setIncreasedSize] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<string | null>(null);
  const [LoadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const {
    isOpen: isTransactionModalOpen,
    onOpen: onTransactionModalOpen,
    onClose: onTransactionModalClose,
  } = useDisclosure();

  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
    getValues,
    setError,
    getFieldState,
  } = useForm<FormData>({
    resolver: yupResolver(
      object().shape({
        projectName: string()
          .required("Project name can't be empty")
          .max(36, "Must be at most 36 characters"),
        tagline: string()
          .required("Tagline can't be empty")
          .max(120, "Tagline can not be more than 120 characters"),
        logo: string().required("Logo can't be empty"),
        email: string()
          .required("Email can't be empty")
          .email("Email is not valid"),
        category: array()
          .of(
            object({
              label: string().required(),
              value: string().required(),
              colorScheme: string().required(),
            })
          )
          .max(3, "Must be at most 3 categories")
          .required("Must select at least one category"),
        twitter: string().required("Twitter handle can't be empty"),
        projectLink: string().required("Project Link can't be empty"),
        github: string(),
        telegram: string(),
        discord: string(),
        description: string()
          .required("Description can't be empty")
          .max(30000, "Must be at most 3000 characters"),
      })
    ),
    mode: "onChange",
    defaultValues: {
      twitter: "https://twitter.com/@username",
      projectLink: "https://example.com",
    },
  });

  const goToNextStep = () => setStep(step + 1);

  const handleStepOneSubmit = async (event: any) => {
    // check if there was an error in submitting the form
    goToNextStep();
  };

  const goToPreviousStep = () => setStep(step - 1);

  const handleStepTwoSubmit = async () => {
    goToNextStep();
  };

  const handleStepThreeSubmit = async (editorData: string) => {
    try {
      const imageUrl = await uploadToCloudinary(getValues("logo")).catch(
        (error) => {
          throw new Error(
            `Error uploading image to Cloudinary: ${error.message}`
          );
        }
      );
      setImageUrl(imageUrl);
      setEditorData(editorData);
      onTransactionModalOpen();
    } catch (e) {
      console.error("There was an error uploading the image", e);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <SEO
        title={`Submit Project - Cubik`}
        description={`Submit a new project and start receiving grants on cubik`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <Container
        transition="all .25s ease"
        maxW="7xl"
        p={{ base: "1rem", md: "0" }}
        my={{ base: "2rem", md: "5rem", lg: "6rem", xl: "8rem" }}
        outline="none"
      >
        <Card
          maxW={{
            base: increasedSize ? "98%" : "28rem",
            md: increasedSize ? "90%" : "32rem",
          }}
          mx="auto"
          padding={{ base: "24px", md: "40px" }}
        >
          {!(step === 4) && (
            <>
              <CardHeader maxW={{ base: "28rem", md: "36rem" }} mx="auto">
                <Box
                  as="h1"
                  color="neutral.11"
                  textStyle={{ base: "title2", md: "title1" }}
                >
                  Create New Project
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: "body5", md: "body4" }}
                  color="neutral.9"
                >
                  Bring your vision to life! Create a project, receive grants
                  through public donations, and make an impact.
                </Box>{" "}
                <HStack
                  pt="18px"
                  w="full"
                  spacing={{ base: "0px", md: "8px" }}
                  justify={{ base: "center", md: "space-between" }}
                >
                  <CustomStepper
                    steps={[
                      { index: 1, name: "Basic Information" },
                      { index: 2, name: "Project Links" },
                      { index: 3, name: "Detailed Info" },
                    ]}
                    currentStep={step}
                  />
                </HStack>
              </CardHeader>
            </>
          )}
          <form
            // @ts-ignore
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "2rem",
            }}
          >
            {step === 1 && (
              <StepOne
                trigger={trigger}
                onSubmit={handleStepOneSubmit}
                register={register}
                errors={errors}
                setError={setError}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                control={control}
                getFieldState={getFieldState}
              />
            )}
            {step === 2 && (
              <StepTwo
                trigger={trigger}
                onSubmit={handleStepTwoSubmit}
                register={register}
                onPrevious={goToPreviousStep}
                errors={errors}
                setError={setError}
              />
            )}
            {step === 3 && (
              <StepThree
                setIncreasedSize={setIncreasedSize}
                onPrevious={goToPreviousStep}
                onSubmit={handleStepThreeSubmit}
                setLoadingSubmit={setLoadingSubmit}
                LoadingSubmit={LoadingSubmit}
              />
            )}
            {step === 4 && <>done...</>}
          </form>
        </Card>
      </Container>
      <CreateProjectTransactionModal
        getValues={getValues}
        isTransactionModalOpen={isTransactionModalOpen}
        onTransactionModalClose={onTransactionModalClose}
        imageUrl={imageUrl as string}
        editorData={editorData as string}
      />
    </>
  );
};

export default withAuth(SubmitProject, { redirect: "/" });
