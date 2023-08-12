"use client";

import {
  Box,
  Card,
  CardHeader,
  Container,
  HStack,
  useDisclosure,
} from "@/utils/chakra";
import React, { useState } from "react";
import CustomStepper from "./components/CustomStepper";
import { Project } from "@cubik/database";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";
import { StepThree } from "./components/StepThree";
import axios from "axios";

type SubmitProjectProps = {
  onSubmit: (_project: Project) => void;
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

const CreateProjectPage = () => {
  const [step, setStep] = useState<number>(1);
  const [increasedSize, setIncreasedSize] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<string | null>(null);
  const [LoadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const goToNextStep = () => setStep(step + 1);

  const handleStepOneSubmit = async (event: any) => {
    // check if there was an error in submitting the form
    goToNextStep();
  };

  const goToPreviousStep = () => setStep(step - 1);

  const handleStepTwoSubmit = async () => {
    goToNextStep();
  };

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
    mode: "onChange",
    defaultValues: {
      twitter: "https://twitter.com/@username",
      projectLink: "https://example.com",
    },
    resolver: zodResolver(
      z.object({
        projectName: z
          .string()
          .nonempty({ message: "Project name can't be empty" })
          .min(1)
          .max(36, {
            message: "Must be at most 36 characters",
          }),

        tagline: z
          .string()
          .nonempty({ message: "Tagline can't be empty" })
          .max(120, {
            message: "Tagline can not be more than 120 characters",
          }),

        logo: z.custom<File>((v) => v instanceof File, {
          message: "Logo is required",
        }),

        email: z.string().nonempty({ message: "Email can't be empty" }),
        category: z
          .array(
            z.object({
              label: z.string().nonempty(),
              value: z.string().nonempty(),
              colorScheme: z.string().nonempty(),
            })
          )
          .max(3, { message: "Must be at most 3 categories" })
          .nonempty({ message: "Must select at least one category" }),

        twitter: z
          .string()
          .nonempty({ message: "Twitter handle can't be empty" }),

        projectLink: z
          .string()
          .nonempty({ message: "Project link can't be empty" }),
        telegram: z.string(),
        discord: z.string(),
        description: z
          .string()
          .nonempty({ message: "Description can't be empty" })
          .max(30000, {
            message: "Description can not be more than 30000 characters",
          }),
      })
    ),
  });

  const handleStepThreeSubmit = async (editorData: string) => {
    try {
      const { data } = await axios.post("https://api.cubik.so/api/v1/upload", {
        data: getValues("logo"),
        key: "logos/" + getValues("projectName"),
        content_type: "image/png",
      });
      const imageUrl = data.url;
      //   const imageUrl = await uploadToCloudinary(getValues("logo")).catch(
      //     // replace this with upload to aws
      //     (error) => {
      //       throw new Error(
      //         `Error uploading image to Cloudinary: ${error.message}`
      //       );
      //     }
      //   );
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
            onSubmit={() => {}}
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
    </>
  );
};

export default CreateProjectPage;
