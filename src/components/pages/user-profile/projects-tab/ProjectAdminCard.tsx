import {
  Accordion,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { ProjectJoinRoundStatus, ProjectsModel } from '@prisma/client';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { projectWithFundingRoundType } from '~/types/project';
import { ProjectStatus } from '~/utils/getProjectStatus';
import { trpc } from '~/utils/trpc';
import AdminProjectRoundCard from './AdminProjectRoundCard';
import ProjectHeader from './ProjectHeader';
import ProjectStatusBanner from './ProjectStatusBanner';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';
import Vault from './project-admin-dashboard/project-vault/Vault';

const ProjectAdminCard = ({ project }: { project: ProjectsModel }) => {
  const [showVault, setShowVault] = useState(false);
  console.log('projectid - ', project.id);
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = trpc.project.projectAdminDetails.useQuery({
    id: project.id,
  });

  const { startTime, endtime, status, round } = ProjectStatus({
    projectData: projectData as projectWithFundingRoundType,
  });

  if (isError) {
    return (
      <Card
        p={{ base: '16px', sm: '20px', md: '24px' }}
        gap={{ base: '16px', sm: '20px', md: '24px' }}
        w="100%"
        border={'none'}
      >
        <ComponentErrors error={error} />
      </Card>
    );
  }

  console.log('projectData in user profile - ', projectData);
  return (
    <Card
      px="0px"
      pb={{ base: '16px', sm: '20px', md: '24px' }}
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="100%"
      border={'none'}
    >
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={2}
        opacity={isLoading ? 0.5 : 1}
      >
        <ProjectStatusBanner
          startTime={startTime as Date}
          endtime={endtime as Date}
          status={status as string}
          roundName={round?.fundingRound.roundName as string}
        />
      </Skeleton>
      <CardHeader>
        <ProjectHeader isLoading={isLoading} project={projectData} />
      </CardHeader>
      <CardBody
        gap={{ base: '64px', sm: '72px', md: '24px' }}
        borderTop={'1px solid'}
        borderColor="neutral.3"
      >
        <Accordion
          px="16px"
          w="full"
          allowMultiple
          allowToggle
          variant={'unstyled'}
          gap={{ base: '64px', sm: '72px', md: '24px' }}
        >
          {projectData?.ProjectJoinRound.map((round) => (
            <AdminProjectRoundCard key={round.id} round={round} />
          ))}
        </Accordion>
        {round?.status === ProjectJoinRoundStatus.APPROVED && (
          <>
            <Stack
              gap={{ base: '64px', sm: '72px', md: '80px' }}
              padding={{ base: '16px', sm: '20px', md: '24px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <FundingOverview projectId={projectData?.id as string} />
              <ProjectInsights projectId={projectData?.id as string} />
            </Stack>
            {showVault && <Vault projectData={projectData} />}
            <Center w="full">
              <Button
                onClick={() => setShowVault(!showVault)}
                py="1rem"
                variant="outline"
                //ml={'auto'}
                rightIcon={
                  showVault ? (
                    <BiChevronUp size={20} />
                  ) : (
                    <BiChevronDown size={20} />
                  )
                }
              >
                <Box
                  textStyle={{ base: 'xs', md: 'sm' }}
                  ml={2}
                  fontWeight={600}
                >
                  {showVault ? 'Hide' : 'Show'} Vault Details
                </Box>
              </Button>
            </Center>
          </>
        )}
      </CardBody>
      <CardFooter display="none" />
    </Card>
  );
};

export default ProjectAdminCard;
