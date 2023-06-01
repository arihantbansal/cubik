import { Card, CardHeader, Skeleton } from '@chakra-ui/react';
import { ProjectVerifyStatus, ProjectsModel } from '@prisma/client';

import ProjectHeaderVisitorView from './ProjectHeaderVisitorView';
import ProjectBanner from './ProjectStatusBanner';
import ProjectVisitorRoundsView from './ProjectVisitorRoundsView';

const ProjectVisitorCard = ({
  project,
  isLoading,
}: {
  project: ProjectsModel;
  isLoading: boolean;
}) => {
  return (
    <Card
      px="0px"
      pt={{ base: '16px', sm: '20px', md: '24px' }}
      pb={{ base: '16px', sm: '20px', md: '24px' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="100%"
    >
      <ProjectBanner status={status} />
      <CardHeader gap="0" mb="0">
        <ProjectHeaderVisitorView project={project} isLoading={isLoading} />
        <Skeleton
          w="full"
          fadeDuration={0.4}
          opacity={isLoading ? '0.5' : '1'}
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
