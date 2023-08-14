"use client";
import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@/utils/chakra";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  Control,
  FieldErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import { FiChevronRight } from "react-icons/fi";
import { VscCloudUpload } from "react-icons/vsc";
import { category } from "./categories";
import { FormData } from "./Form";
import { CategorySelect, TeamSelect } from "./ChakraReactSelect";

type StepOneProps = {
  onSubmit: (data: any) => void;
  trigger: UseFormTrigger<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setError: UseFormSetError<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  watch: UseFormWatch<FormData>;
  control: Control<FormData>;
  getFieldState: UseFormGetFieldState<FormData>;
};

const StepOne: React.FC<StepOneProps> = ({
  trigger,
  onSubmit,
  register,
  errors,
  setError,
  setValue,
  getValues,
  control,
  watch,
  getFieldState,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setValue("logo", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //@ts-ignore
    accept: "image/*",
    multiple: false, // prevent multiple file selection
    onDrop,
  });

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
    "gray",
  ];

  const categoryWithColors = category.map((item, index) => {
    return {
      ...item,
      colorScheme: "#010F0D",
    };
  });
  return (
    <>
      <CardBody>
        <FormControl
          isRequired
          w="full"
          isInvalid={Boolean(errors.projectName)}
        >
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="projectName"
          >
            Project Name
          </FormLabel>
          <Input
            id="projectName"
            fontSize={{ base: "12px", md: "14px" }}
            placeholder="Enter your project name"
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("projectName", {
              required: true,
              maxLength: { value: 36, message: "Max length is 36" },
            })}
          />
          {errors.projectName && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              {errors.projectName.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.tagline)}>
          <HStack w="full" pb="0.5rem" justify={"space-between"}>
            <FormLabel
              fontSize={{ base: "12px", md: "14px" }}
              htmlFor="tagline"
            >
              Tagline
            </FormLabel>
            <Box
              as="p"
              fontSize={{ base: "10px", md: "12px" }}
              color={
                watch("tagline")?.length === 0
                  ? "neutral.7"
                  : watch("tagline")?.length > 120
                  ? "surface.red.2"
                  : "surface.green.2"
              }
              fontWeight={"600"}
            >
              {watch("tagline") ? watch("tagline").length + "/120" : "0/120"}
            </Box>
          </HStack>
          <Textarea
            height={"100px"}
            resize="none"
            id="tagline"
            fontSize={{ base: "12px", md: "14px" }}
            placeholder="A one sentence description of the project"
            _invalid={{
              boxShadow: "0 0 0 2px #E53E3E",
            }}
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("tagline", {
              required: true,
              maxLength: { value: 240, message: "Max length is 240" },
            })}
          />
          {errors.tagline ? (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              {errors.tagline.message}
            </FormErrorMessage>
          ) : (
            getFieldState("tagline")?.isDirty && (
              <FormHelperText
                fontSize={{ base: "12px", md: "14px" }}
                color="neutral.6"
              >
                Keep the tagline concise, engaging, and descriptive. It should
                encapsulate the essence of your project in one sentence.
              </FormHelperText>
            )
          )}
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.email)} w="full">
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="email"
          >
            Email
          </FormLabel>
          <Input
            id="email"
            placeholder="Enter your email address"
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("email", {
              required: true,
            })}
          />
          <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
            {errors.email && errors.email.message}
          </FormErrorMessage>
          {getFieldState("email")?.isDirty && (
            <FormHelperText
              fontSize={{ base: "12px", md: "14px" }}
              color="neutral.6"
            >
              This email will be used to share important information about your
              project.
            </FormHelperText>
          )}
        </FormControl>
        <CategorySelect control={control} errors={errors} watch={watch} />
        <TeamSelect control={control} errors={errors} watch={watch} />
        <FormControl isRequired isInvalid={Boolean(errors.logo)} id="logo">
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="logo"
          >
            Project Logo
          </FormLabel>
          <HStack h="full" gap="1rem">
            {isDragActive ? (
              <Center
                maxW={"7xl"}
                mx="auto"
                w="full"
                py={{ base: "16px", sm: "24px" }}
                border="1px dashed"
                borderColor={"#1D1F1E"}
                rounded="12px"
              >
                <Box
                  as="p"
                  textStyle={{ base: "body4", md: "body3" }}
                  color={"neutral.7"}
                >
                  Drop File Here...
                </Box>
              </Center>
            ) : (
              <>
                <Center
                  border={"2px dashed"}
                  rounded="20px"
                  borderColor={errors.logo ? " #E53E3E" : "brand.teal6"}
                  minW={{ base: "5rem", md: "6rem" }}
                  h={{ base: "5rem", md: "6rem" }}
                  position={"relative"}
                >
                  {getValues("logo") ? (
                    <Center
                      position="absolute"
                      w={{ base: "3rem", md: "5rem" }}
                      h={{ base: "3rem", md: "5rem" }}
                      rounded={"18px"}
                      overflow="hidden"
                    >
                      <Image
                        src={
                          getValues("logo") &&
                          // @ts-ignore
                          URL.createObjectURL(watch("logo")[0])
                        }
                        alt="project logo"
                        fill={true}
                        style={{ objectFit: "cover" }}
                      />
                    </Center>
                  ) : (
                    <VscCloudUpload size={34} color={"#A8F0E6"} />
                  )}
                </Center>
                <VStack
                  align={"start"}
                  justify="space-between"
                  gap="0.5rem"
                  height={"full"}
                >
                  <Center {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button
                      variant={"primary"}
                      fontSize={{ base: "xs", md: "md" }}
                    >
                      {getValues("logo") ? "Upload New Image" : "Upload Image"}
                    </Button>
                  </Center>
                  <Box
                    textAlign={"start"}
                    as="p"
                    textStyle={{ base: "body5", md: "body4" }}
                    color="neutral8"
                  >
                    Upload a 1:1 aspect ration Image of size at max 5MB.
                  </Box>
                </VStack>
              </>
            )}
          </HStack>
          <FormErrorMessage pt="1rem">
            {errors.logo && errors.logo.message}
          </FormErrorMessage>
        </FormControl>
      </CardBody>
      <CardFooter>
        <CardFooter>
          <Button
            variant={"cubikText"}
            size={{ base: "cubikSmall", md: "cubikMedium" }}
            rightIcon={
              <Box boxSize={{ base: "14px", md: "18px" }} as={FiChevronRight} />
            }
            ml="auto"
            onClick={async () => {
              setIsSubmitting(true);
              const isValid = await trigger([
                "projectName",
                "tagline",
                "category",
                "team",
                "email",
                "logo",
              ]);

              if (isValid) {
                //@ts-ignore
                onSubmit();
              } else {
                setIsSubmitting(false);
              }
            }}
          >
            Next
          </Button>
        </CardFooter>
      </CardFooter>
    </>
  );
};

export { StepOne };
