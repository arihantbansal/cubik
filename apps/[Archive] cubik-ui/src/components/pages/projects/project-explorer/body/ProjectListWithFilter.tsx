import { VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import EmptyProjectsState from "./empty-state/ProjectsEmptyState";
import ProjectsList from "./ProjectsList";
import { trpc } from "~/utils/trpc";
import ProjectListLoadingSkeleton from "../../skeletons/ProjectListLoadingSkeleton";
import { ProjectExplorerType } from "@cubik/common-types";

export type RoundTypes = {
  name: string;
  colorScheme: string;
  id: string;
};

export type CategoryType = {
  label: string;
  value: string;
  colorScheme?: string;
};

export const ProjectListWithFilter = ({ projects }: { projects: any }) => {
  return <></>;
  // const shuffleSeed = useMemo(() => Math.round(Math.random() * 10), []);

  // const { data: filteredProjectsFromServer, isLoading: filteredProjectsLoading } =
  //   trpc.project.verifiedProjects.useQuery(
  //     {
  //       filter: undefined,
  //       seed: shuffleSeed,
  //       round: [],
  //     },
  //     {
  //       refetchInterval: 20000,
  //       staleTime: 10000,
  //       refetchOnMount: false,
  //       refetchOnReconnect: false,
  //       refetchOnWindowFocus: false,
  //     },
  //   );
  // return (
  //   <>
  //     <VStack w="full" align={'start'} gap="16px">
  //       {filteredProjectsLoading ? (
  //         <ProjectListLoadingSkeleton />
  //       ) : filteredProjectsFromServer && filteredProjectsFromServer.length > 0 ? (
  //         <ProjectsList allProjectsData={filteredProjectsFromServer} />
  //       ) : (
  //         <EmptyProjectsState />
  //       )}
  //     </VStack>
  //   </>
  // );
};
