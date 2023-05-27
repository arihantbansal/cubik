import { Round } from '@prisma/client';
import { isPast } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { category } from '~/components/pages/create-project/projectCategories';
import { CategoryType } from '~/components/pages/projects/project-explorer/body/ProjectListWithFilter';
import { trpc } from '~/utils/trpc';
isPast;
export const useFilteredProjects = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();
  const [selectedRounds, setSelectedRounds] = useState<Round[] | null>();

  // trpc calls
  const { data: project, isLoading } =
    trpc.project.findManyVerifiedWithContributions.useQuery();
  const { data: roundsData, isLoading: roundsLoading } =
    trpc.round.findActive.useQuery();

  console.log('project, roundsData', project, roundsData);

  useEffect(() => {
    if (roundsData) {
      console.log('setting selectedRounds Data');
      setSelectedRounds(roundsData);
    }
  }, [roundsData]);

  const filteredProjects = useMemo(() => {
    let filteredProjects = project;

    if (selectedCategory) {
      console.log('category is selected');
      filteredProjects = filteredProjects?.filter((project) => {
        const projectIndustry = JSON.parse(project.industry);
        return projectIndustry.some(
          (industry: { value: string }) =>
            industry.value === selectedCategory.value
        );
      });
    }

    if (selectedRounds && selectedRounds.length > 0) {
      console.log(
        '1 - category and round both are selected - ',
        selectedRounds
      );
      const selectedRoundId = selectedRounds.map((round) => round.id);
      filteredProjects = filteredProjects?.filter((project) => {
        // return projects with checking the round data that if that project is in that round or not
        const isRoundSelected = project.ProjectJoinRound.some(
          (projectJoinRound) => {
            const projectRoundId = projectJoinRound.fundingRound.id;
            return selectedRoundId.includes(projectRoundId);
          }
        );
        if (isRoundSelected) {
          console.log('round is selected for project - ', project.name);
          // now return projects where isRoundSelected is true
          return true;
        }
        return false;
      });
    }
    console.log('filtered projects - ', filteredProjects);
    return filteredProjects;
  }, [project, selectedCategory, selectedRounds]);

  const shuffledProjects = useMemo(() => filteredProjects, [filteredProjects]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCategoryClick = (category?: CategoryType) => {
    if (category && isCategorySelected(category)) {
      setSelectedCategory(undefined);
      return;
    }
    setSelectedCategory(category);
  };

  const handleRoundClick = (round: Round) => {
    setSelectedRounds((prevRounds) => {
      let newRounds;
      // if prev round contains the round, remove it
      if (prevRounds?.includes(round)) {
        newRounds = prevRounds.filter((r) => r !== round);
      } else {
        newRounds = [...(prevRounds ?? []), round];
      }
      return newRounds;
    });
  };

  const isCategorySelected = (category: CategoryType) =>
    selectedCategory?.value === category.value;
  const isRoundSelected = (round: Round) => selectedRounds?.includes(round);

  const filteredCategories = category.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    isLoading,
    roundsData,
    roundsLoading,
    selectedCategory,
    setSelectedCategory,
    selectedRounds,
    setSelectedRounds,
    filteredProjects,
    filteredCategories,
    shuffledProjects,
    searchTerm,
    setSearchTerm,
    handleCategoryClick,
    handleRoundClick,
    isCategorySelected,
    isRoundSelected,
  };
};
