import { VStack } from "@chakra-ui/layout";
import { ProjectJoinRoundStatus, ProjectsModel } from "@cubik/database";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";
import VisitorProjectRoundCard from "./VisitorProjectRoundCard";
import { ProjectProfileCard } from "~/types/projects";

const ProjectVisitorRoundsView = ({
  project,
  isLoading,
}: {
  project: ProjectProfileCard;
  isLoading: boolean;
}) => {
  const {
    data,
    isLoading: roundIsLoading,
    isError,
    error,
  } = trpc.project.projectVisitorsDetail.useQuery({
    id: project?.id,
  });

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <ComponentErrors error={error} />;
  }

  // filter data here for projectJoinRoundStatus === ProjectJoinRoundStatus.APPROVED
  const filteredData = data?.ProjectJoinRound.filter(
    (round) => round.status === ProjectJoinRoundStatus.APPROVED
  );

  return filteredData && filteredData?.length > 0 ? (
    <VStack
      border="none"
      p="16px"
      mt="12px"
      borderTop="1px solid"
      borderColor="neutral.3"
      w="full"
      spacing={{ base: "64px", sm: "72px", md: "24px" }}
      align="start"
    >
      {filteredData?.map((projectRound) => (
        <VisitorProjectRoundCard
          key={projectRound.id}
          round={projectRound}
          isLoading={roundIsLoading}
        />
      ))}
    </VStack>
  ) : (
    <></>
  );
};

export default ProjectVisitorRoundsView;
