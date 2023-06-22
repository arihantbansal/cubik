import { Round } from '@prisma/client';
import { isPast } from 'date-fns';
import { useEffect, useState } from 'react';
import { category } from '~/components/pages/create-project/projectCategories';
import { CategoryType } from '~/components/pages/projects/project-explorer/body/ProjectListWithFilter';
import { trpc } from '~/utils/trpc';
isPast;
export const useFilteredProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();
  const [selectedRounds, setSelectedRounds] = useState<Round[] | null>();

  // trpc calls
  const { data: roundsData, isLoading: roundsLoading } =
    trpc.round.findOngoingRounds.useQuery();

  const {
    data: filteredProjectsFromServer,
    isLoading: filteredProjectsLoading,
  } = trpc.project.verifiedProjects.useQuery(
    {
      filter: selectedCategory?.value ?? undefined,
      round: selectedRounds?.map((round) => round.id) ?? [],
    },
    {
      enabled: !roundsLoading,
      refetchInterval: 20000,
      staleTime: 10000,
    }
  );

  useEffect(() => {
    if (roundsData) {
      console.log('roundsData', roundsData);

      setSelectedRounds(roundsData);
    }
  }, [roundsData]);

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
    filteredProjectsLoading,
    roundsData,
    roundsLoading,
    selectedCategory,
    setSelectedCategory,
    selectedRounds,
    setSelectedRounds,
    filteredProjectsFromServer,
    filteredCategories,
    searchTerm,
    setSearchTerm,
    handleCategoryClick,
    handleRoundClick,
    isCategorySelected,
    isRoundSelected,
  };
};
