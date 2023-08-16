"use client";
import Categories from "./categories";
import { ProjectExplorerType } from "@/types/explorer";
import { FilterTrack } from "./filterTrack";
import { HStack } from "@chakra-ui/react";

const Filters = ({
  _projects,
  projects,
  setProjects,
}: {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
}) => {
  return (
    <>
      <HStack justify={"space-between"} w="full">
        <Categories
          _projects={_projects}
          projects={projects}
          setProjects={setProjects}
        />
        <FilterTrack
          _projects={_projects}
          projects={projects}
          setProjects={setProjects}
        />
      </HStack>
    </>
  );
};

export default Filters;
