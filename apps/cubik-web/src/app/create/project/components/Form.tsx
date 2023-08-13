"use client";

import { Card, useDisclosure } from "@/utils/chakra";
import React, { useState } from "react";
import { Cardheader } from "./CardHeader";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";
import { CreateProjectTransactionModal } from "./CreateProjectTransactionModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepOne } from "./StepOne";
// import { useUploadThing } from "@/utils/helpers/uploadthing";

export type FormData = {
  projectName: string;
  tagline: string;
  category: { label: string; value: string; colorScheme: string }[];
  logo: File[];
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

const Form = () => {
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

        logo: z.string().nonempty({ message: "Logo can't be empty" }),

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

  // const { startUpload } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => {
  //     if (res) {
  //       console.log(res, "success");
  //       setImageUrl(res[0]?.url as string);
  //     } else {
  //       setError("logo", {
  //         message: "uploading error. Please try again",
  //       });
  //     }
  //   },

  //   onUploadError: () => {
  //     alert("error occurred while uploading");
  //   },
  // });

  const handleStepThreeSubmit = async (editorData: string) => {
    try {
      // startUpload(watch("logo"));
      //   setImageUrl(watch("logo"));
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
      <Card
        maxW={{
          base: increasedSize ? "98%" : "28rem",
          md: increasedSize ? "90%" : "32rem",
        }}
        mx="auto"
        padding={{ base: "24px", md: "40px" }}
      >
        {!(step === 4) && <Cardheader step={step} />}
        <form
          onSubmit={handleSubmit(() => {})}
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

export default Form;
