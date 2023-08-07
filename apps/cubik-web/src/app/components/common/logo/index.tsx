import { Box, Button, Center, HStack, Tag, Text } from "@chakra-ui/react";
import Link from "next/link";

const Logo = () => {
  const beta = false;
  return (
    <HStack
      spacing={{ base: "2px", md: "8px" }}
      alignItems={"center"}
      justify="space-between"
    >
      <Link href="/">
        <Box
          display="flex"
          flexDir={"row"}
          gap="12px"
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Center
            width={{ base: "1.5rem", sm: "1.6rem" }}
            height={{ base: "1.5rem", sm: "1.6rem" }}
          >
            <svg
              width="101"
              height="120"
              viewBox="0 0 101 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M97 52.3137V31.451L50.5 4L4 31.451V87.451M97 52.3137L50.5 24.8627L23.0227 40.2353V55.6078L35.7045 48.006L50.5 39.1373L85.0368 60M97 52.3137L85.0368 60M95.9432 87.451V66.5882L85.0368 60M95.9432 87.451L50.5 61.098L4 87.451M95.9432 87.451L50.5 116L4 87.451"
                stroke="white"
                strokeWidth="8"
                strokeLinejoin="round"
              />
            </svg>
          </Center>
          <Text
            letterSpacing={"0.12em"}
            fontWeight={"800"}
            fontSize={{ base: "18px", sm: "20px" }}
            color="white"
            display={{ base: "block", sm: "block", lg: "block" }}
          >
            CUBIK
          </Text>
        </Box>
      </Link>
      {beta ? (
        <Tag
          rounded="full"
          variant="colorful"
          backgroundColor="#FFD83D18"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.2)"
          fontSize="xs"
          p={{ base: "8px 12px", md: "8px 12px" }}
          mx={1}
        >
          <Box
            as="p"
            whiteSpace="pre"
            color="#FFE747"
            textStyle={{ base: "body6", md: "body5" }}
            fontWeight="700 !important"
            letterSpacing="1.2px"
          >
            DEVNET
          </Box>
        </Tag>
      ) : (
        <></>
      )}
    </HStack>
  );
};

export default Logo;
