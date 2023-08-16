import { ProjectExplorerType } from "@/types/explorer";
import { Box, Select, VStack } from "@/utils/chakra";
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
    <VStack w="full" gap="8px" maxW="20rem">
      <Box w="full" textStyle={"body4"} color="neutral.8">
        Hackathon Tracks
      </Box>
      <Select
        rounded="12px"
        h={{ base: "2.2rem", md: "2.5rem" }}
        textStyle={{ base: "body5", md: "body4" }}
        color="neutral.7"
        outline="none"
        w="full"
        border={"none"}
        boxShadow="none"
        _hover={{
          boxShadow: "none !important",
          borderColor: "#ffffff10 !important",
          outline: "#ffffff10 !important",
        }}
        _focus={{
          boxShadow: "none !important",
          borderColor: "#ffffff10 !important",
          outline: "#ffffff10 !important",
        }}
        _focusVisible={{
          boxShadow: "none !important",
          borderColor: "none !important",
          outline: "none !important",
        }}
        _active={{
          boxShadow: "none !important",
          borderColor: "none !important",
          outline: "none !important",
        }}
        _placeholder={{
          fontSize: { base: "12px", md: "14px" },
          lineHeight: { base: "18px", md: "20px" },
          color: "#75757580",
        }}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Select option"
        defaultValue={"all"}
      >
        <option value="all">All</option>
        {tracks.map((track) => {
          return <option value={track}>{track}</option>;
        })}
      </Select>
    </VStack>
  );
};
