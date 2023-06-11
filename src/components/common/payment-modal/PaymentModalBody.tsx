import { Stack } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';
// import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ProjectWithRoundDetailsWithOwnerWithTeamType } from '~/types/project';

const PaymentModalBody = ({
  setDonationSuccessful,
  projectDetails,
  projectJoinRoundId,
  roundId,
  roundName,
}: {
  setDonationSuccessful?: any;
  projectDetails: ProjectsModel;
  roundName: string;
  roundId: string;
  projectJoinRoundId: string;
}) => {
  return (
    <Stack direction="row">
      <ProjectDonationSimulator
        height={90}
        width={100}
        projectJoinRoundId={projectJoinRoundId}
        roundId={roundId}
        roundName={roundName}
        setDonationSuccessful={setDonationSuccessful}
        projectDetails={projectDetails}
      />
    </Stack>
  );
};

export default PaymentModalBody;
