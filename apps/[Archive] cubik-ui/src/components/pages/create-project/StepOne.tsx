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
} from "@chakra-ui/react";
import { GroupBase, OptionsOrGroups, Select } from "chakra-react-select";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Control,
  Controller,
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
import useTeamSearch from "~/hooks/useTeamSearch";
import { FormData } from "~/pages/submit-project";
import { category } from "./projectCategories";

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
  const [currentTeammateName, setCurrentTeammateName] = useState<
    string | undefined
  >(undefined);
  const {
    data: teamSearch,
    isLoading: teamSearchLoading,
    error: teamSearchError,
  } = useTeamSearch(currentTeammateName);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Only accept the first file from the dropped files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Check file size, should be less than or equal to 5MB
      // file.size is in bytes, so 5MB is 5 * 1024 * 1024 bytes
      if (file.size <= 5 * 1024 * 1024) {
        setValue("logo", file);
      } else {
        setError("logo", {
          message: "File size should be less than or equal to 5MB",
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    accept: "image/*",
    multiple: false, // prevent multiple file selection
    onDrop,
  });

  const teamWithNames =
    teamSearch?.map((item) => {
      return {
        value: item.id,
        label: item.username,
        icon: item.profilePicture,
      };
    }) || [];

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
      colorScheme: colors[Math.floor(Math.random() * colors.length)],
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
        <Controller
          control={control}
          name="category"
          rules={{ required: "Please enter at least 1 Tag." }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl
              isRequired
              isInvalid={Boolean(errors.category)}
              id="category"
            >
              <HStack w="full" pb="0.5rem" justify={"space-between"}>
                <FormLabel
                  fontSize={{ base: "12px", md: "14px" }}
                  pb="0.5rem"
                  htmlFor="category"
                >
                  Choose Categories
                </FormLabel>
                <Box
                  as="p"
                  fontSize={{ base: "10px", md: "12px" }}
                  color={
                    watch("category")?.length > 3
                      ? "surface.red.2"
                      : watch("category")?.length > 0
                      ? "surface.green.2"
                      : "neutral.7"
                  }
                  fontWeight={"600"}
                >
                  {watch("category") ? watch("category").length + "/3" : "0/3"}
                </Box>
              </HStack>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={categoryWithColors}
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
                    boxShadow: errors.category ? "0 0 0 2px #E53E3E" : "0",
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
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="team"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={Boolean(errors.team)} id="team">
              <FormLabel
                fontSize={{ base: "12px", md: "14px" }}
                pb="0.5rem"
                htmlFor="team"
              >
                Add Team
              </FormLabel>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value as any}
                options={
                  teamWithNames as unknown as OptionsOrGroups<
                    string,
                    GroupBase<string>
                  >
                }
                formatOptionLabel={({ label, icon }) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0px",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon}
                      alt={label}
                      style={{
                        marginRight: "10px",
                        borderRadius: "100%",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    {label}
                  </div>
                )}
                menuIsOpen={
                  !!currentTeammateName && currentTeammateName.length > 0
                }
                placeholder="Search @username"
                closeMenuOnSelect={true}
                selectedOptionStyle="check"
                variant="unstyled"
                focusBorderColor="transparent"
                onInputChange={(inputValue) => {
                  setCurrentTeammateName(inputValue);
                }}
                chakraStyles={{
                  container: (provided, state) => ({
                    ...provided,
                    border: "none",
                    background: "surface.input_field",
                    outline: "0px !important",
                    borderRadius: "8px",
                    height: "40px",
                    boxShadow: errors.team ? "0 0 0 2px #E53E3E" : "0",
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
                  }),
                  inputContainer: (provided, state) => ({
                    ...provided,
                    ps: "8px",
                    fontSize: { base: "12px", md: "14px" },
                    backgroundColor: "transparent",
                    border: "none",
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
                    fontSize: { base: "12px", md: "14px" },
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
                    px: "1rem",
                    fontSize: { base: "12px", md: "14px" },
                    color: "#3B3D3D",
                  }),
                }}
              />
              <FormErrorMessage pt="1rem">
                {errors.team && errors.team.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
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
                          URL.createObjectURL(getValues("logo"))
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
                    <input {...getInputProps()} />{" "}
                    <Button
                      variant={"primary"}
                      fontSize={{ base: "xs", md: "md" }}
                    >
                      {getValues("logo") ? "Upload New Image" : "Upload Image"}
                    </Button>{" "}
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
