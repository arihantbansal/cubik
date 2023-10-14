import { useMemo, useState } from "react";
import { category } from "~/components/pages/create-project/projectCategories";
import { CategoryType } from "~/components/pages/projects/project-explorer/body/ProjectListWithFilter";
import { trpc } from "~/utils/trpc";

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

export const useFilteredProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const shuffleSeed = useMemo(() => Math.round(Math.random() * 10), []);
  const [roundIds, setRoundIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();

  const isMobileScreen = isMobileDevice();
  const trpcParams = {
    filter: selectedCategory?.value ?? undefined,
    round: [],
    seed: shuffleSeed,
    mobile: isMobileScreen,
  };

  const {
    data: filteredProjectsFromServer,
    isLoading: filteredProjectsLoading,
  } = trpc.project.verifiedProjects.useQuery(trpcParams, {
    refetchInterval: 20000,
    staleTime: 10000,
  });

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

  const filteredCategories = category.filter((cat) => {
    console.log(cat);
    return cat.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return {
    filteredProjectsLoading,
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
