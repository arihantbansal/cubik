import { Box, Center, VStack } from "@chakra-ui/react";
import { FaRegComments } from "react-icons/fa";

const NoInformation = () => {
  return (
    <VStack
      align="center"
      spacing="16px"
      py="80px"
      w="full"
      textAlign={"center"}
      border="1px dashed"
      borderColor={"#1D1F1E"}
      rounded="12px"
    >
      <Center>
        <svg
          width="56"
          height="57"
          viewBox="0 0 56 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="28.5" r="28" fill="#A8F0E6" />
          <path
            d="M28 23.6667V29M28 34.3333H28.0133M40 29C40 35.6274 34.6274 41 28 41C21.3726 41 16 35.6274 16 29C16 22.3726 21.3726 17 28 17C34.6274 17 40 22.3726 40 29Z"
            stroke="#14665B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Center>
      <Box
        as="p"
        textStyle={{ base: "body3", md: "title2" }}
        color="neutral.11"
      >
        No Information
      </Box>
      <Box as="p" textStyle={{ base: "body5", md: "body4" }} color="neutral.8">
        There is no information to show here at this time.
      </Box>
    </VStack>
  );
};
export const NoComments = () => {
  return (
    <VStack
      align="center"
      spacing="16px"
      py="80px"
      w="full"
      textAlign={"center"}
      border="1px dashed"
      borderColor={"#1D1F1E"}
      rounded="12px"
    >
      <Center bg="#A8F0E6" p={{ base: "12px", md: "16px" }} rounded="full">
        <Box
          as={FaRegComments}
          boxSize={{ base: "20px", md: "32px" }}
          color={"#001F1B"}
        />
      </Center>
      <Box
        as="p"
        textStyle={{ base: "body3", md: "title2" }}
        color="neutral.11"
      >
        No Comments yet
      </Box>
      <Box as="p" textStyle={{ base: "body5", md: "body4" }} color="neutral.8">
        Start a conversation by adding the first comment.
      </Box>
    </VStack>
  );
};

export default NoInformation;
