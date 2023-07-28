import { VStack } from '@chakra-ui/react';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import ExplorePageHeader from './header/ExplorePageHeader';
import { ProjectExploreBanner, ProjectExplorerType } from '@cubik/common-types';
import ProjectsList from './body/ProjectsList';
type PropsType = {
  banner: ProjectExploreBanner[];
  projects: ProjectExplorerType[];
};

const ProjectsExplorer = ({ projects, banner }: PropsType) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        alignItems={'start'}
        justifyContent="start"
        gap={{ base: '28px', md: '40px' }}
      >
        <ExplorePageHeader banner={banner} />
        <ProjectsList explorerProjects={projects} />
        {/* <ProjectListWithFilter projects={projects} /> */}
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default ProjectsExplorer;
