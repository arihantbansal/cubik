import { ProjectExplorerType } from "@/types/explorer";
import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  tracks: string[];
  setProjects: (projects: ProjectExplorerType[]) => void;
  _projects: ProjectExplorerType[];
}
export const TrackFilter = ({ setProjects, _projects, tracks }: Props) => {
  const handleChange = (value: string) => {
    if (value === "all") {
      setProjects(_projects);
    } else {
      const filteredProjects = _projects.filter(
        (project) =>
          project.projectEvent.eventName === "hackathon" &&
          project.projectEvent.tracks.find((e) => e.value == value)
      );
      setProjects(filteredProjects);
    }
  };
  return (
    <>
      <Box>
        <Text>Hackathon Tracks</Text>
      </Box>
      <Select
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Select option"
        defaultValue={"all"}
      >
        <option value="all">All</option>
        {tracks.map((track) => {
          return <option value={track}>{track}</option>;
        })}
      </Select>
    </>
  );
};
