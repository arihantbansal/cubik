import { ProjectExplorerType } from "@/types/explorer";
import { Box, VStack, Select } from "@chakra-ui/react";
import React from "react";

interface Props {
  _projects: ProjectExplorerType[];
  projects: ProjectExplorerType[];
  setProjects: (projects: ProjectExplorerType[]) => void;
}

export const Sort = ({ _projects, projects, setProjects }: Props) => {
  const handleFilter = (filter: string) => {
    let filterProjects: ProjectExplorerType[] = projects;
    if (filter === "option1") {
      console.log("hit");
      const final = filterProjects.sort(
        (a, b) => a.projectEvent.amount - b.projectEvent.amount
      );
      setProjects(final);
      return;
    }
    if (filter === "option2") {
      const final = filterProjects.sort(
        (a, b) => b.projectEvent.amount - a.projectEvent.amount
      );
      setProjects(final);
      return;
    }
  };

  return (
    <VStack w="full" gap="8px" maxW="20rem">
      <Box w="full" textStyle={"body4"} color="neutral.8">
        Sort Project By
      </Box>
      <Select
        defaultValue={1}
        onChange={(e) => handleFilter(e.target.value)}
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
      >
        <option value="option1">Est. Funds Raised ( Low to how )</option>
        <option value="option2">Est. Funds Raised ( High to low )</option>
        <option value="option3">Contributors ( Highest to lowest )</option>
        <option value="option4">Contributors ( Lowest to highest )</option>
      </Select>
    </VStack>
  );
};
