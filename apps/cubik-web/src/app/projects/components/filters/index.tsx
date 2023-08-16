"use client";
import Categories from "./categories";
import { ProjectExploreBanner, ProjectExplorerType } from "@/types/explorer";
import { Sort } from "./Sort";
import { Button, HStack, VStack, useDisclosure } from "@/utils/chakra";
import { TrackFilter } from "./TrackFilter";
import CollapsedFilters from "./Filters";

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
  const { isOpen, onToggle } = useDisclosure();
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
      <VStack align={"start"} justify={"space-between"} w="full">
        <HStack w="full" align={"start"} justify={"space-between"}>
          <Categories
            _projects={_projects}
            projects={projects}
            setProjects={setProjects}
          />
          <Button
            aria-label="Options"
            rounded="12px"
            onClick={onToggle}
            p={{ base: "8px", md: "10px 16px" }}
            height="100%"
            backgroundColor={"neutral.3"}
            color="#626665"
            _hover={{
              backgroundColor: "neutral.4",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            // leftIcon={
            //   <Box as={RiFilter3Fill} boxSize={['20px']} color="#626665" />
            // }
          >
            Filter
          </Button>
        </HStack>{" "}
        <CollapsedFilters
          projects={projects}
          _projects={_projects}
          setProjects={setProjects}
          tracks={HackathonTracks()}
          isOpen={isOpen}
        />
      </VStack>
    </>
  );
};

export default Filters;
