import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import GetFormattedLink from "~/components/HOC/GetLink";
import { trpc } from "~/utils/trpc";

const ParticipatingProjectsTab = ({ setProjectsNumberByStatus }: any) => {
  const {
    data: projectJoinRound,
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();

  useEffect(() => {
    if (projectJoinRound) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        participating: projectJoinRound.length,
      }));
    }
  }, [projectJoinRound, setProjectsNumberByStatus]);
  return (
    <VStack spacing={4} w="full">
      {projectJoinRound?.map((projectjoinround) => (
        <Card
          key={projectjoinround.project.id}
          border="none"
          gap="0"
          p="0"
          w="100%"
          h="full"
        >
          <CardBody h="full" justifyContent={"space-between"} gap="12px" p="0">
            <Center
              w="full"
              bg={`surface.${projectjoinround.fundingRound.colorScheme}.3`}
              borderTopRadius={"16px"}
            >
              <HStack
                w="full"
                gap="8px"
                borderColor="red"
                borderBottom={"red"}
                padding={"12px 24px"}
                borderTopRadius={"16px"}
                justifyContent="space-between"
              >
                <Box
                  w="full"
                  as="p"
                  noOfLines={1}
                  whiteSpace={"nowrap"}
                  color="#ADB8B6"
                  textStyle={"overline4"}
                  textTransform="uppercase"
                  letterSpacing={"0.2em"}
                  fontSize={{ base: "8px", md: "10px" }}
                >
                  Participating In
                </Box>
                <Box
                  as="p"
                  w="fit-content"
                  whiteSpace={"nowrap"}
                  textStyle={"title5"}
                  color={`surface.${projectjoinround.fundingRound.colorScheme}.1`}
                >
                  {projectjoinround.fundingRound.roundName}
                </Box>
              </HStack>
            </Center>
            <Stack
              p={{ base: "16px", sm: "20px", md: "24px" }}
              pt="0"
              direction={{ base: "column", sm: "row" }}
              w="full"
              gap="12px"
            >
              <Stack
                w="full"
                direction="row"
                gap={{ base: "8px", sm: "12px", md: "16px" }}
              >
                <Center>
                  <Avatar
                    src={projectjoinround.project.logo}
                    name={projectjoinround.project.name}
                    width={{ base: "36px", sm: "48px", md: "52px" }}
                    height={{ base: "36px", sm: "48px", md: "52px" }}
                  />
                </Center>
                <VStack
                  alignItems={"start"}
                  align={"center"}
                  justify="center"
                  spacing={{ base: "2px", sm: "4px", md: "6px" }}
                >
                  <Box
                    as="p"
                    textStyle={{
                      base: "title4",
                      sm: "title3",
                      md: "title2",
                    }}
                    noOfLines={1}
                    textAlign="left"
                    color="white"
                  >
                    {projectjoinround.project.name}
                  </Box>
                  <GetFormattedLink
                    link={projectjoinround.project.project_link}
                  />
                </VStack>
              </Stack>
              <HStack justifyContent={"end"}>
                <Button
                  variant={"unstyled"}
                  px="2rem"
                  minH={{ base: "2.2rem" }}
                  h="full"
                  w="full"
                  backgroundColor="brand.teal2"
                  color="brand.teal5"
                  border="1px solid"
                  borderColor={"brand.teal2"}
                  rounded="8px"
                  _hover={{
                    border: "1px solid",
                    borderColor: "brand.teal5",
                  }}
                  maxW={{ base: "full", sm: "8rem", md: "20rem" }}
                  onClick={() => {}}
                >
                  View Details
                </Button>
              </HStack>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default ParticipatingProjectsTab;
