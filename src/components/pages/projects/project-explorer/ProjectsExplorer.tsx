import { VStack } from '@chakra-ui/react';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { ProjectListWithFilter } from './body/ProjectListWithFilter';
import ExplorePageHeader from './header/ExplorePageHeader';

const ProjectsExplorer = () => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        alignItems={'start'}
        justifyContent="start"
        gap={{ base: '28px', md: '40px' }}
      >
        <ExplorePageHeader />
        <ProjectListWithFilter />
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default ProjectsExplorer;
