import { isPast } from 'date-fns';
import { useMemo, useState } from 'react';
import { category } from '~/components/pages/create-project/projectCategories';
import { CategoryType } from '~/components/pages/projects/project-explorer/body/ProjectListWithFilter';
import { trpc } from '~/utils/trpc';
isPast;
export const useFilteredProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const shuffleSeed = useMemo(() => Math.round(Math.random() * 10), []);
  const [roundIds, setRoundIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();

  // trpc calls
  const { data: roundsData, isLoading: roundsLoading } =
    trpc.round.findActive.useQuery();

  const {
    data: filteredProjectsFromServer,
    isLoading: filteredProjectsLoading,
  } = trpc.project.verifiedProjects.useQuery(
    {
      filter: selectedCategory?.value ?? undefined,
      round: roundIds, // need to change this later
      seed: shuffleSeed,
    },
    {
      enabled: !roundsLoading,
      refetchInterval: 20000,
      staleTime: 10000,
    }
  );

  const handleCategoryClick = (category?: CategoryType) => {
    if (category && isCategorySelected(category)) {
      setSelectedCategory(undefined);
      return;
    }
    setSelectedCategory(category);
  };

  const handleRoundClick = (roundid: string) => {
    if (roundIds.includes(roundid)) {
      setRoundIds(roundIds.filter((r) => r !== roundid));
    } else {
      setRoundIds([...roundIds, roundid]);
    }
  };

  const isCategorySelected = (category: CategoryType) =>
    selectedCategory?.value === category.value;

  const isRoundSelected = (roundId: string) => !roundIds?.includes(roundId);

  const filteredCategories = category.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    filteredProjectsLoading,
    roundsData,
    roundsLoading,
    selectedCategory,
    setSelectedCategory,
    roundIds,
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
