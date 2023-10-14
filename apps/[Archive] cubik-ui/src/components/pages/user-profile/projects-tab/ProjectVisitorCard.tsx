import { Card, CardHeader } from "@chakra-ui/card";
import { Skeleton } from "@chakra-ui/skeleton";
import { ProjectVerifyStatus, ProjectsModel } from "@cubik/database";

import ProjectHeaderVisitorView from "./ProjectHeaderVisitorView";
import ProjectBanner from "./ProjectStatusBanner";
import ProjectVisitorRoundsView from "./ProjectVisitorRoundsView";
import { ProjectProfileCard } from "~/types/projects";

const ProjectVisitorCard = ({
  userName,
  project,
  isLoading,
}: {
  userName: string;
  project: ProjectProfileCard;
  isLoading: boolean;
}) => {
  return (
    <Card
      px="0px"
      pt={{ base: "16px", sm: "20px", md: "24px" }}
      pb={{ base: "16px", sm: "20px", md: "24px" }}
      gap={{ base: "16px", sm: "20px", md: "24px" }}
      w="100%"
    >
      <ProjectBanner status={status} />
      <CardHeader gap="0" mb="0">
        <ProjectHeaderVisitorView
          projectOwnerName={userName}
          project={project}
          isLoading={isLoading}
        />
        <Skeleton
          w="full"
          fadeDuration={0.5}
          opacity={isLoading ? "0.5" : "1"}
          isLoaded={!isLoading}
        >
          {project.status === ProjectVerifyStatus.VERIFIED && ( // todo: check if this check is required
            <ProjectVisitorRoundsView project={project} isLoading={isLoading} />
          )}
        </Skeleton>
      </CardHeader>
    </Card>
  );
};

export default ProjectVisitorCard;
