import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import GetFormattedLink from "~/components/HOC/GetLink";
import { projectWithFundingRoundType } from "~/types/project";
import { ProjectStatus } from "~/utils/getProjectStatus";
import { trpc } from "~/utils/trpc";
import ProjectStatusBanner from "../../user-profile/projects-tab/ProjectStatusBanner";

const RejectedProjectsTab = ({ setProjectsNumberByStatus }: any) => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findManyRejected.useQuery();

  useEffect(() => {
    if (projects) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        rejected: projects.length,
      }));
    }
  }, [projects, setProjectsNumberByStatus]);
  return (
    <VStack spacing={4} w="full">
      {projects?.map((project) => (
        <Card
          key={project.id}
          px="0px"
          pb={{ base: "16px", sm: "20px", md: "24px" }}
          gap={{ base: "16px", sm: "20px", md: "24px" }}
          w="100%"
          border={"none"}
        >
          <ProjectStatusBanner
            status={
              ProjectStatus({
                projectData: project as projectWithFundingRoundType,
              })?.status as string
            }
            roundName={
              ProjectStatus({
                projectData: project as projectWithFundingRoundType,
              })?.round
                ? ProjectStatus({
                    projectData: project as projectWithFundingRoundType,
                  })?.round?.fundingRound.roundName
                : undefined
            }
          />
          <CardHeader>
            <Stack
              direction={{ base: "column", sm: "row" }}
              px={{
                base: "16px",
                sm: "20px",
                md: "24px",
              }}
              gap={"12px"}
              w="full"
            >
              <Stack
                w="full"
                direction="row"
                gap={{ base: "8px", sm: "12px", md: "16px" }}
              >
                <Center>
                  <Avatar
                    src={project.logo}
                    name={project.name}
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
                    {project.name}
                  </Box>
                  <GetFormattedLink link={project.project_link} />
                </VStack>
              </Stack>
              <HStack justifyContent={"end"}>
                <Button
                  variant={"unstyled"}
                  px="2rem"
                  h="full"
                  w="full"
                  minH={"2.4rem"}
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
          </CardHeader>
        </Card>
      ))}
    </VStack>
  );
};

export default RejectedProjectsTab;
