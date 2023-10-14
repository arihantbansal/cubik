import { projectWithFundingRoundType } from "~/types/project";

export const ProjectRound = ({
  project,
}: {
  project: projectWithFundingRoundType;
}): { roundName: string; colorScheme: string } => {
  const activeRounds = project.ProjectJoinRound.filter(
    (projectRounds) => projectRounds.fundingRound.active
  );

  if (activeRounds.length > 0) {
    const activeRound = activeRounds[0];
    return {
      roundName: activeRound.fundingRound.roundName,
      colorScheme: activeRound.fundingRound.colorScheme || "teal",
    };
  } else {
    return {
      roundName: "",
      colorScheme: "teal",
    };
  }
};
