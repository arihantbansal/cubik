import { Box, Center, Container, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  return (
    <Container maxW="full">
      <Center gap="16px" flexDir={"column"} maxW="4xl" mx="auto" py="14rem">
        <Heading fontSize="9xl">404</Heading>
        <Box as="p" textStyle={"title1"}>
          Page Not Found{" "}
        </Box>
        <Box textAlign={"center"} maxW="22rem" as="p" textStyle={"body2"}>
          The page you are looking for does not exist. Go back{" "}
          <Text
            as="span"
            color="brand.teal5"
            textDecoration={"underline"}
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            home
          </Text>
        </Box>
      </Center>
    </Container>
  );
};

export default Error;
