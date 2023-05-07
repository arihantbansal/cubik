import { Stack } from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { ProjectDonationSimulator } from '~/components/pages/projects/project-details/project-interactions/project-donation-simulator/ProjectDonationSimulator';

const PaymentModalBody = ({
  projectDetails,
}: {
  projectDetails: ProjectsModel;
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
