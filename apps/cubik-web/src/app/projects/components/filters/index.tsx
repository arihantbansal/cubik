"use client";
import { useRef } from "react";
// import CategoryTag from '~/components/common/tags/CategoryTags';
import { Center, HStack } from "@/utils/chakra";
import Categories from "./categories";
import { Project } from "../";

const Filters = ({
  _projects,
  projects,
  setProjects,
}: {
  _projects: Project[];
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}) => {
  return (
    <>
      <Categories
        _projects={_projects}
        projects={projects}
        setProjects={setProjects}
      />
    </>
  );
};

export default Filters;
