import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
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
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findMany.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<categoryType>();

  const handleCategoryFilter = (
    category?: categoryType
  ): typeof projects | undefined => {
    if (!category || !projects) {
      return projects;
    }
    return projects.filter((project) =>
      JSON.parse(project.industry).includes(category)
    );
  };

  const filteredProjects = handleCategoryFilter(selectedCategory);
  return (
    <VStack
      w="full"
      alignItems={'start'}
      justifyContent="start"
      gap={{ base: '24rem', md: '40px' }}
    >
      <ExplorePageHeader />
      <ProjectsCategoryFilter handleCategoryFilter={handleCategoryFilter} />
      <VStack w="full" align={'start'} gap="16px">
        {/* <Box as="p" textStyle={'title2'} color="neutral.9" px="8px">
          Recently Visited
        </Box> */}
        {isLoading ? (
          <ProjectListLoadingSkeleton />
        ) : filteredProjects && filteredProjects.length > 0 ? (
          <ProjectsList allProjectsData={filteredProjects} />
        ) : (
          <EmptyProjectsState />
        )}
      </VStack>
    </VStack>
  );
};

export default ProjectsExplorer;
