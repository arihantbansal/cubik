import {
  Box,
  Button,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
} from "react-hook-form";
import {
  FaDiscord,
  FaGithub,
  FaLink,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FormData } from "~/pages/submit-project";

type StepTwoProps = {
  trigger: UseFormTrigger<FormData>;
  onSubmit: () => void;
  onPrevious: () => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<StepTwoFormValues>;
  setError: UseFormSetError<FormData>;
};

type StepTwoFormValues = {
  github: string;
  twitter: string;
  projectLink: string;
  telegram: string;
  discord: string;
};
const StepTwo: React.FC<StepTwoProps> = ({
  trigger,
  onSubmit,
  register,
  onPrevious,
  errors,
  setError,
}: StepTwoProps) => {
  const handleSubmit = async () => {
    trigger(["projectLink", "twitter"]).then((isValid) => {
      if (isValid) {
        onSubmit;
      }
    });
  };

  return (
    <>
      <CardBody>
        <FormControl
          isRequired
          isInvalid={Boolean(errors.projectLink)}
          id="projectLink"
        >
          <FormLabel pb="0.5rem">
            <Box as="span" textStyle="title5" color="neutral.11">
              Project Link
            </Box>
          </FormLabel>
          <Input
            placeholder="https://example.com"
            type="url"
            {...register("projectLink", {
              required: true,
            })}
          />
          {errors.projectLink ? (
            <FormErrorMessage>{errors.projectLink.message}</FormErrorMessage>
          ) : (
            <FormHelperText></FormHelperText>
          )}
        </FormControl>
        <VStack align={"start"} gap="16px">
          <Box as="p" textStyle="title5" color="neutral.11">
            Socials
          </Box>
          <FormControl
            isRequired
            id="twitter"
            isInvalid={Boolean(errors.twitter)}
          >
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaTwitter size={"16"} />
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="400">
                  Twitter
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://twitter.com.com/twitter"
                type="twitter"
                {...register("twitter", {
                  required: true,
                })}
              />
            </InputGroup>
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              {errors.twitter && errors.twitter.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="github">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaGithub size={"16"} />
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="400">
                  Github
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://github.com/example"
                type="url"
                {...register("github")}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.telegram)} id="telegram">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaTelegramPlane color="gray.300" />
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="400">
                  Telegram
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://telegram.com"
                type="url"
                {...register("telegram")}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.discord)} id="discord">
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaDiscord color="gray.300" />
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="400">
                  Discord
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://discord.gg"
                type="url"
                {...register("discord")}
              />
            </InputGroup>
          </FormControl>
          <FormControl
            variant="withAddOn"
            isInvalid={Boolean(errors.discord)}
            id="discord"
          >
            <InputGroup>
              <InputLeftAddon pointerEvents="none">
                <FaLink color="gray.300" />
                <Text pl="8px" color="#ADB8B6" fontSize="14px" fontWeight="400">
                  Custom
                </Text>
              </InputLeftAddon>
              <Input
                placeholder="https://example.com"
                type="url"
                {...register("discord")}
              />
            </InputGroup>
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          variant={"cubikText"}
          size={{ base: "cubikSmall", md: "cubikMedium" }}
          leftIcon={
            <Box boxSize={{ base: "14px", md: "18px" }} as={FiChevronLeft} />
          }
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          variant={"cubikText"}
          size={{ base: "cubikSmall", md: "cubikMedium" }}
          rightIcon={
            <Box boxSize={{ base: "14px", md: "18px" }} as={FiChevronRight} />
          }
          onClick={async () => {
            const isValid = await trigger(["projectLink", "twitter"]);
            if (isValid) {
              //@ts-ignore
              onSubmit();
            }
          }}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export { StepTwo };
