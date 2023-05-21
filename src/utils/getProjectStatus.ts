import { ProjectJoinRoundStatus, ProjectVerifyStatus } from '@prisma/client';
import {
  ProjectJoinRoundWithFundingType,
  projectWithFundingRoundType,
} from '~/types/project';

type projectRoundAndVerifyType = {
  round?: ProjectJoinRoundWithFundingType;
  status: ProjectJoinRoundStatus | ProjectVerifyStatus;
};

export const ProjectStatus = ({
  projectData,
}: {
  projectData: projectWithFundingRoundType;
}): projectRoundAndVerifyType | null => {
  let projectRoundData: projectRoundAndVerifyType | null = null;
  if (projectData.status === ProjectVerifyStatus.VERIFIED) {
    if (projectData.ProjectJoinRound.length > 0) {
      projectData.ProjectJoinRound.map(
        (projectJoinRound: ProjectJoinRoundWithFundingType) => {
          if (projectJoinRound.fundingRound.active) {
            projectRoundData = {
              round: projectJoinRound,
              status: projectJoinRound.status,
            };
          }
          // todo: handle the else condition
        }
      );
    } else {
      projectRoundData = { status: projectData.status };
    }
  } else {
    projectRoundData = { status: projectData.status };
  }
  return projectRoundData;
};
