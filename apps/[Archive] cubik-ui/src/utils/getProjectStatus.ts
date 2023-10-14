import {
  ProjectJoinRound,
  ProjectJoinRoundStatus,
  ProjectVerifyStatus,
  Round,
} from "@cubik/database";
import { isFuture, isPast } from "date-fns";
import { projectWithFundingRoundType } from "~/types/project";

type projectRoundAndVerifyType = {
  round?:
    | (ProjectJoinRound & {
        fundingRound: Round;
      })
    | null
    | undefined;
  status:
    | ProjectJoinRoundStatus
    | ProjectVerifyStatus
    | "LIVE"
    | "ENDED"
    | undefined
    | null;
  startTime?: Date;
  endTime?: Date;
};

export const ProjectStatus = ({
  projectData,
}: {
  projectData: projectWithFundingRoundType | undefined | null;
}): projectRoundAndVerifyType => {
  let projectRoundData: projectRoundAndVerifyType = {
    status: undefined,
  };

  if (projectData?.status === ProjectVerifyStatus?.VERIFIED) {
    // verified project now only check round status
    if (projectData?.ProjectJoinRound.length > 0) {
      projectData?.ProjectJoinRound.map(
        (
          projectJoinRound: ProjectJoinRound & {
            fundingRound: Round;
          }
        ) => {
          if (projectJoinRound?.fundingRound.active) {
            // now check the project round status
            if (projectJoinRound?.status === ProjectJoinRoundStatus.APPROVED) {
              // check dates for live status
              if (isFuture(projectJoinRound.fundingRound.startTime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: ProjectJoinRoundStatus.APPROVED,
                  startTime: projectJoinRound.fundingRound.startTime,
                  endTime: projectJoinRound.fundingRound.endTime,
                };
              } else if (isFuture(projectJoinRound.fundingRound.endTime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: "LIVE",
                  startTime: projectJoinRound.fundingRound.startTime,
                  endTime: projectJoinRound.fundingRound.endTime,
                };
              } else if (isPast(projectJoinRound.fundingRound.endTime)) {
                projectRoundData = {
                  round: projectJoinRound,
                  status: "ENDED",
                  startTime: projectJoinRound.fundingRound.startTime,
                  endTime: projectJoinRound.fundingRound.endTime,
                };
              }
            } else {
              projectRoundData = {
                round: projectJoinRound,
                status: projectJoinRound.status,
              };
            }
          } else {
            projectRoundData = {
              round: projectJoinRound,
              status: "ENDED",
            };
          }
        }
      );
    } else {
      // project is approved but not participating in any round
      projectRoundData = { status: projectData?.status };
    }
  } else {
    projectRoundData = { status: projectData?.status };
  }
  return projectRoundData;
};

export const ProjectStatusV2 = ({
  projectData,
}: {
  projectData: projectWithFundingRoundType | undefined | null;
}): projectRoundAndVerifyType => {
  let projectRoundData: projectRoundAndVerifyType = {
    status: undefined,
  };

  return projectRoundData;
};
