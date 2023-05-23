import {
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
import { projectWithFundingRoundType } from '~/types/project';
import { ProjectStatus } from '~/utils/getProjectStatus';
import { trpc } from '~/utils/trpc';
import ProjectHeader from './ProjectHeader';
import ProjectStatusBanner from './ProjectStatusBanner';
import FundingOverview from './project-admin-dashboard/FundingOverview';
import ProjectInsights from './project-admin-dashboard/ProjectInsights';
import Vault from './project-admin-dashboard/project-vault/Vault';

const ProjectAdminCard = ({
  activeProject,
  project,
}: {
  project: ProjectsModel;
  activeProject?: string;
}) => {
  const [showVault, setShowVault] = useState(false);
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = trpc.project.projectAdminDetails.useQuery({
    id: project.id,
  });

  if (isError) {
    return <Center>{error.message}</Center>;
  }

  console.log('Project Data', projectData);
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
          startTime={
            ProjectStatus({
              projectData: projectData as projectWithFundingRoundType,
            })?.startTime || undefined
          }
          endtime={
            ProjectStatus({
              projectData: projectData as projectWithFundingRoundType,
            })?.endtime || undefined
          }
          status={
            ProjectStatus({
              projectData: projectData as projectWithFundingRoundType,
            })?.status as string
          }
          roundName={
            ProjectStatus({
              projectData: projectData as projectWithFundingRoundType,
            })?.round
              ? ProjectStatus({
                  projectData: projectData as projectWithFundingRoundType,
                })?.round?.fundingRound.roundName
              : undefined
          }
        />
      </Skeleton>
      <CardHeader>
        <ProjectHeader
          isLoading={isLoading}
          activeProject={activeProject}
          project={projectData}
        />
      </CardHeader>
      {ProjectStatus({
        projectData: projectData as projectWithFundingRoundType,
      })?.round?.status === ProjectJoinRoundStatus.APPROVED && (
        <>
          <CardBody
            gap={{ base: '64px', sm: '72px', md: '24px' }}
            borderTop={'1px solid'}
            borderColor="neutral.3"
          >
            <Stack
              gap={{ base: '64px', sm: '72px', md: '80px' }}
              padding={{ base: '16px', sm: '20px', md: '24px' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <FundingOverview projectId={projectData?.id as string} />
              <ProjectInsights projectId={projectData?.id as string} />
            </Stack>
            {showVault && <Vault projectData={projectData} />}
          </CardBody>
          <CardFooter pb="24px">
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
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ProjectAdminCard;
