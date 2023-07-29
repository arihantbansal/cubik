import { VStack } from '@chakra-ui/layout';
import { ProjectSocials } from './ProjectSocials';
import { ProjectFundingData } from './ProjectFundingData';
import { ProjectOwner } from './ProjectOwner';
import { SimilarProject } from './SimilarProject';
import { ProjectsModel, Team, UserModel } from '@prisma/client';

interface Props {
  isLoading: boolean;
  preview?: boolean;
  funding: number;
  contributors: number;
  communityContributions: number;
  project: ProjectsModel;
  team: (Team & {
    user: UserModel;
  })[];
}
export const ProjectCreatorAndLinks = ({
  isLoading,
  preview = true,
  communityContributions,
  contributors,
  funding,
  project,
  team,
}: Props) => {
  return (
    <VStack
      gap={{ base: '24px', md: '64px' }}
      w="full"
      justify={'space-between'}
      direction={'column'}
      justifyContent={'start'}
      display={{ base: 'none', lg: 'flex' }}
    >
      <ProjectSocials isLoading={isLoading} projectDetails={project} />

      {!preview && (
        <ProjectFundingData
          isLoading={isLoading}
          contributors={contributors}
          communityContributions={communityContributions}
          funding={funding}
        />
      )}
      <ProjectOwner isLoading={isLoading} team={team} />
      <SimilarProject />
    </VStack>
  );
};
