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
} from '@chakra-ui/react';
import {
  Contribution,
  ProjectJoinRound,
  ProjectVerifyStatus,
  ProjectsModel,
  Round,
  UserModel,
} from '@prisma/client';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ComponentErrors from '~/components/errors/ComponenetErrors';
import { projectWithFundingRoundType } from '~/types/project';
import { ProjectStatus } from '~/utils/getProjectStatus';
import { trpc } from '~/utils/trpc';
import AdminProjectRoundCard from './AdminProjectRoundCard';
import ProjectHeader from './ProjectHeader';
import ProjectVerificationStatusBanner from './ProjectVerificationStatusBanner';
import Vault from './project-admin-dashboard/project-vault/Vault';

const ProjectAdminCard = ({ project }: { project: ProjectsModel }) => {
  const [showVault, setShowVault] = useState(false);
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = trpc.project.projectAdminDetails.useQuery({
    id: project.id,
  });

  const { startTime, endTime, status, round } = ProjectStatus({
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
        w="full"
      >
        <ProjectVerificationStatusBanner
          status={projectData?.status}
          projectJoinRoundStatus={
            projectData && projectData?.ProjectJoinRound?.length > 0
              ? true
              : false
          }
        />
      </Skeleton>
      <CardHeader>
        <ProjectHeader isLoading={isLoading} project={projectData} />
      </CardHeader>
      {projectData && projectData?.ProjectJoinRound.length > 0 && (
        <Box w="full" h={'1px'} backgroundColor="neutral.3" />
      )}
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={4}
        opacity={isLoading ? 0.5 : 1}
        w="full"
      >
        <CardBody gap={{ base: '16px', md: '24px' }}>
          <Accordion
            px={{ base: '12px', md: '16px' }}
            w="full"
            display={'flex'}
            flexDir={'column'}
            gap={{ base: '16px', md: '24px' }}
            allowMultiple
            allowToggle
            variant={'unstyled'}
          >
            {projectData?.ProjectJoinRound.map(
              (
                round: ProjectJoinRound & {
                  fundingRound: Round & {
                    Contribution: (Contribution & { user: UserModel })[];
                  };
                }
              ) => (
                <AdminProjectRoundCard
                  isLoading={isLoading}
                  key={round.id}
                  round={round}
                />
              )
            )}
          </Accordion>
          {showVault && (
            <Vault
              isLoading={isLoading}
              multisigAddress={projectData?.mutliSigAddress}
            />
          )}
          <Center
            display={
              projectData?.status === ProjectVerifyStatus.VERIFIED
                ? 'flex'
                : 'none'
            }
            w="full"
          >
            <Button
              onClick={() => setShowVault(!showVault)}
              variant="cubikText"
              size={{ base: 'cubikMini', md: 'cubikSmall' }}
              rightIcon={
                showVault ? (
                  <Box as={BiChevronUp} boxSize={['14px', '16px', '18px']} />
                ) : (
                  <Box as={BiChevronDown} boxSize={['14px', '16px', '18px']} />
                )
              }
            >
              {showVault ? 'Hide' : 'Show'} Vault Details
            </Button>
          </Center>
        </CardBody>
      </Skeleton>
      <CardFooter display="none" />
    </Card>
  );
};

export default ProjectAdminCard;
