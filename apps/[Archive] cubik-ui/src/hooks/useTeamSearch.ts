import { trpc } from "~/utils/trpc";

const useTeamSearch = (currentTeammateName = "") => {
  const { data, error, isLoading } = trpc.user.search.useQuery({
    username: currentTeammateName,
  });

  return { data, error, isLoading };
};

export default useTeamSearch;
