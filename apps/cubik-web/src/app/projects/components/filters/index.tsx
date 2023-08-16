"use client";
import Categories from "./categories";
import { ProjectExploreBanner, ProjectExplorerType } from "@/types/explorer";
import { Sort } from "./Sort";
import { HStack, VStack } from "@chakra-ui/react";
import { TrackFilter } from "./TrackFilter";

const Filters = ({
  _projects,
  projects,
  setProjects,
  banner,
}: {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
  banner: ProjectExploreBanner[];
}) => {
  const HackathonTracks = () => {
    let tracks: string[] = [];
    const hackathons = banner.filter((e) => e.type === "hackathon");
    hackathons.forEach((hackathon) => {
      hackathon.hackathonTracks?.forEach((track) => {
        if (!tracks.includes(track)) {
          tracks.push(track);
        }
      });
    });

    return tracks;
  };
  return (
    <>
      <HStack align={"start"} justify={"space-between"} w="full">
        <VStack align={"start"}>
          <Categories
            _projects={_projects}
            projects={projects}
            setProjects={setProjects}
          />
          <TrackFilter
            _projects={_projects}
            setProjects={setProjects}
            tracks={HackathonTracks()}
          />
        </VStack>
        <Sort
          _projects={_projects}
          projects={projects}
          setProjects={setProjects}
        />
      </HStack>
    </>
  );
};

export default Filters;
