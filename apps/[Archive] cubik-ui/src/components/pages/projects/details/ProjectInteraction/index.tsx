import React from "react";
import { ProjectCreatorAndLinks } from "./ProjectCreatorAndLinks";
import { ProjectsModel, Team, UserModel } from "@prisma/client";
import { ProjectCTAs } from "./ProjectCTAs";
import { Stack } from "@chakra-ui/layout";
import { HackathonSchedule } from "@cubik/common-types";

interface Props {
  funding: number;
  contributors: number;
  communityContributions: number;
  project: ProjectsModel;
  team: (Team & {
    user: UserModel;
  })[];
  isLoading: boolean;
  preview?: boolean;
  timeline: HackathonSchedule;
  roundId?: string;
  hackathonId: string;
  projectJoinId?: string;
  hackathonJoinId?: string;
  tracks: {
    label: string;
    value: string;
  }[];
}

export const ProjectInteractions = ({
  communityContributions,
  contributors,
  funding,
  isLoading,
  project,
  team,
  preview,
  timeline,
  hackathonId,
  roundId,
  hackathonJoinId,
  projectJoinId,
  tracks,
}: Props) => {
  const timelineSorted = timeline?.sort((a, b) => a.index - b.index);
  return (
    <>
      <Stack
        w="full"
        maxW="26rem"
        flex="1"
        gap="48px"
        flexDir="column"
        justifyContent="start"
      >
        {roundId && (
          <ProjectCTAs
            project={project}
            projectJoinId={projectJoinId}
            roundId={roundId}
            startTime={timelineSorted[2].start as Date}
            endTime={timelineSorted[2].end as Date}
            loading={isLoading}
          />
        )}

        {hackathonId && (
          <ProjectCTAs
            project={project}
            hackathonJoinId={hackathonJoinId}
            hackathonId={hackathonId}
            startTime={timelineSorted[2].start as Date}
            endTime={timelineSorted[2].end as Date}
            loading={isLoading}
          />
        )}
        <ProjectCreatorAndLinks
          tracks={tracks}
          communityContributions={communityContributions}
          contributors={contributors}
          funding={funding}
          isLoading={isLoading}
          project={project}
          team={team || []}
          preview={preview}
        />
      </Stack>
    </>
  );
};
