import { Button } from "@chakra-ui/button";
import { HStack, Center, VStack, Box } from "@chakra-ui/layout";
import { isDragActive } from "framer-motion";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import Image from "next/image";

const UploadImageInput = ({
  setValue,
  setError,
  getValues,
  errors,
}: {
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  getValues: UseFormGetValues<any>;
  errors: FieldErrors<any>;
}) => {
  const [fileName, setFileName] = useState<string | undefined>();
  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Only accept the first file from the dropped files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      // Check file size, should be less than or equal to 5MB
      // file.size is in bytes, so 5MB is 5 * 1024 * 1024 bytes
      if (file.size <= 5 * 1024 * 1024) {
        setValue("logo", file);
        setFileName(file.name);
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

  return (
    <VStack h="full" gap="1rem">
      {isDragActive ? (
        <Center
          maxW={"7xl"}
          h={{ base: "5rem", md: "6rem" }}
          mx="auto"
          w="full"
          rounded="8px"
          border="1px dashed"
          bg="neutral.2"
          borderColor={errors.logo ? " #E53E3E" : "neutral.5"}
          minW={{ base: "5rem", md: "6rem" }}
        >
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color={"neutral.6"}
          >
            Drop File Here...
          </Box>
        </Center>
      ) : (
        <>
          <Center
            w="full"
            border={"1px dashed"}
            rounded="8px"
            borderColor={errors.logo ? " #E53E3E" : "neutral.5"}
            minW={{ base: "5rem", md: "6rem" }}
            h={{ base: "5rem", md: "6rem" }}
            position={"relative"}
          >
            <HStack
              {...getRootProps()}
              w="full"
              justify={"start"}
              p="18px"
              spacing="18px"
              cursor="pointer"
            >
              {getValues("logo") ? (
                <Center
                  w={{ base: "2rem", md: "3.3rem" }}
                  h={{ base: "2rem", md: "3.3rem" }}
                >
                  <Center
                    position="absolute"
                    w={{ base: "2rem", md: "3.3rem" }}
                    h={{ base: "2rem", md: "3.3rem" }}
                    rounded={"full"}
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
                  </Center>{" "}
                </Center>
              ) : (
                <Center rounded="full" p="12px" bg="neutral.3">
                  <Box
                    as={BiImageAdd}
                    transform={"translate(2px, 1px)"}
                    boxSize={["20px", "24px", "32px"]}
                    color={"neutral.7"}
                  />
                </Center>
              )}
              <input {...getInputProps()} />
              <VStack align="start" spacing="8px">
                {getValues("logo") ? (
                  <>
                    <Box as="p" textStyle={"title5"} color={"neutral.7"}>
                      Image Uploaded!{" "}
                      <Box pl="0.2rem" as="span" color={"brand.teal5"}>
                        Select another image
                      </Box>
                    </Box>
                    <Box
                      maxW="40rem"
                      as="p"
                      textStyle={"body5"}
                      color={"neutral.7"}
                    >
                      Uploaded File: {fileName}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box as="p" textStyle={"title5"} color={"neutral.7"}>
                      Drop the image or{" "}
                      <Box pl="0.2rem" as="span" color={"brand.teal5"}>
                        Select from device
                      </Box>
                    </Box>
                    <Box as="p" textStyle={"body5"} color={"neutral.7"}>
                      Supports: JPEG, PNG of 1:1 aspect ration & size below 5MB
                    </Box>
                  </>
                )}
              </VStack>
            </HStack>
          </Center>
          {/* <VStack
            align={'start'}
            justify="space-between"
            gap="0.5rem"
            height={'full'}
          >
            <Center>
              {' '}
              <Button variant={'primary'} fontSize={{ base: 'xs', md: 'md' }}>
                {getValues('logo') ? 'Upload New Image' : 'Upload Image'}
              </Button>{' '}
            </Center>
            <Box
              textAlign={'start'}
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="neutral8"
            >
              Upload a 1:1 aspect ration Image of size at max 5MB.
            </Box>
          </VStack> */}
        </>
      )}
    </VStack>
  );
};

export default UploadImageInput;
