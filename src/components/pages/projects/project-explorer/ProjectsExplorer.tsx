import { Center, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useErrorBoundary } from '~/hooks/useErrorBoundary';
import { shuffle } from '~/utils/shuffle';
import { trpc } from '~/utils/trpc';
import ProjectListLoadingSkeleton from '../skeletons/ProjectListLoadingSkeleton';
import { ProjectsCategoryFilter } from './body/categories/ProjectsCategoryFilter';
import EmptyProjectsState from './body/empty-state/ProjectsEmptyState';
import ProjectsList from './body/ProjectsList';
import ExplorePageHeader from './header/ExplorePageHeader';

export type categoryType = {
  label: string;
  value: string;
};

const ProjectsExplorer = () => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<
    categoryType | undefined
  >();

  const handleCategoryFilter = (
    category?: categoryType
  ): typeof projects | undefined => {
    console.log('category filter called - ', category);
    if (!category || !projects) {
      return projects;
    }
    const filteredProjects = projects.filter((project) =>
      JSON.parse(project.industry).includes(category)
    );
    console.log(filteredProjects);
    return filteredProjects;
  };
  if (isError) {
    return (
      <Center height="10rem" w="full">
        {error.message}
      </Center>
    );
  }

  const filteredProjects = handleCategoryFilter(selectedCategory);
  const shuffledProjects = shuffle(filteredProjects);

  return (
    <ErrorBoundaryWrapper>
      <VStack
        w="full"
        alignItems={'start'}
        justifyContent="start"
        gap={{ base: '28px', md: '40px' }}
      >
        <ExplorePageHeader />
        <ProjectsCategoryFilter handleCategoryFilter={handleCategoryFilter} />
        <VStack w="full" align={'start'} gap="16px">
          {isLoading ? (
            <ProjectListLoadingSkeleton />
          ) : shuffledProjects && shuffledProjects.length > 0 ? (
            <ProjectsList allProjectsData={shuffledProjects} />
          ) : (
            <EmptyProjectsState />
          )}
        </VStack>
      </VStack>
    </ErrorBoundaryWrapper>
  );
};

export default ProjectsExplorer;
