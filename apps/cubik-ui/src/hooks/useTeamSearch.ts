import { trpc } from '~/utils/trpc';

const useTeamSearch = (currentTeammateName = '') => {
  const { data, error, isLoading } = trpc.user.searchUser.useQuery({
    username: currentTeammateName,
  });

  return { data, error, isLoading };
};

export default useTeamSearch;
