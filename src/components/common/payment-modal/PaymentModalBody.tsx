import { Stack } from '@chakra-ui/react';
import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';

const PaymentModalBody = ({
  projectDetails,
}: {
  projectDetails: ProjectWithCommentsAndRoundsType;
}) => {
  return (
    <Stack direction="row">
      <ProjectDonationSimulator
        height={90}
        width={100}
        projectDetails={projectDetails}
      />
    </Stack>
  );
};

export default PaymentModalBody;
