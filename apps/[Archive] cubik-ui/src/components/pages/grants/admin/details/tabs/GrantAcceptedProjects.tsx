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
import Link from "next/link";
import { useEffect } from "react";
import GetFormattedLink from "~/components/HOC/GetLink";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { trpc } from "~/utils/trpc";
import { ProjectEmptyState } from "../../../../user-profile/empty-states/ProjectEmptyState";
import ProjectsLoadingState from "../../loadingState/ProjectsLoadingState";

const GrantAcceptedProjects = ({
  roundId,
  setProjectsNumberByStatus,
}: {
  roundId: string;
  setProjectsNumberByStatus: React.Dispatch<
    React.SetStateAction<{
      review: number;
      accepted: number;
      rejected: number;
    }>
  >;
}) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const {
    data: roundData,
    isLoading,
    isError,
    error,
  } = trpc.round.findAcceptedGrants.useQuery({ id: roundId });

  useEffect(() => {
    if (!roundData) return;
    if (roundData?.ProjectJoinRound?.length > 0) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        accepted: roundData?.ProjectJoinRound.length,
      }));
    }
  }, [roundData, setProjectsNumberByStatus]);

  return (
    <ErrorBoundaryWrapper>
      <VStack spacing={4} w="full">
        {isLoading ? (
          <ProjectsLoadingState isLoading={isLoading} />
        ) : isError ? (
          <Center
            w="full"
            py={{ base: "16px", sm: "24px" }}
            border="1px dashed"
            borderColor={"#1D1F1E"}
            rounded="12px"
          >
            <ComponentErrors />
          </Center>
        ) : roundData?.ProjectJoinRound.length === 0 ? (
          <ProjectEmptyState />
        ) : (
          <>
            {roundData?.ProjectJoinRound.map((projectJoinRound) => (
              <Card
                key={projectJoinRound.project.id}
                border="none"
                gap="0"
                p="0"
                w="100%"
                h="full"
              >
                <CardBody
                  h="full"
                  justifyContent={"space-between"}
                  gap="12px"
                  p="0"
                >
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
                          src={projectJoinRound.project.logo}
                          name={projectJoinRound.project.name}
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
                          {projectJoinRound.project.name}
                        </Box>
                        <GetFormattedLink
                          link={projectJoinRound.project.project_link}
                        />
                      </VStack>
                    </Stack>
                    <HStack justifyContent={"end"}>
                      <Link
                        href={`/${projectJoinRound.project.owner.username}/${projectJoinRound.id}/${projectJoinRound.roundId}`}
                      >
                        <Button
                          variant={"cubikOutlined"}
                          size={{ base: "cubikMini", md: "CubikSmall" }}
                          w={{ base: "full", sm: "8rem", md: "10rem" }}
                          h="3rem"
                        >
                          View Details
                        </Button>
                      </Link>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </>
        )}
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default GrantAcceptedProjects;
