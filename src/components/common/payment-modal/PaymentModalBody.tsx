import { Stack } from '@chakra-ui/react';
import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';

const PaymentModalBody = ({
  setDonationSuccessful,
  projectDetails,
}: {
  setDonationSuccessful?: any;
  projectDetails: ProjectWithCommentsAndRoundsType;
}) => {
  return (
    <Stack direction="row">
      <ProjectDonationSimulator
        height={90}
        width={100}
        setDonationSuccessful={setDonationSuccessful}
        projectDetails={projectDetails}
      />
    </Stack>
  );
};

export default PaymentModalBody;
