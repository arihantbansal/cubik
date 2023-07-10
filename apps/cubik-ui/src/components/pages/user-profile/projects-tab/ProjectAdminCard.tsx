import { Accordion } from '@chakra-ui/accordion';
import { Button } from '@chakra-ui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { Box, Center } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import {
  Contribution,
  ProjectJoinRound,
  ProjectVerifyStatus,
  ProjectsModel,
  Round,
  UserModel,
} from '@cubik/database';
import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ComponentErrors from '~/components/errors/ComponentErrors';
import { trpc } from '~/utils/trpc';
import AdminProjectRoundCard from './AdminProjectRoundCard';
import ProjectHeader from './ProjectHeader';
import ProjectVerificationStatusBanner from './ProjectVerificationStatusBanner';
import Vault from './project-admin-dashboard/project-vault/Vault';

const ProjectAdminCard = ({ project }: { project: ProjectsModel }) => {
  const [showVault, setShowVault] = useState(true);
  const {
    data: projectData,
    isLoading,
    isError,
    error,
  } = trpc.project.projectAdminDetails.useQuery({
    id: project.id,
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
      gap={{ base: '16px', sm: '20px', md: '24px' }}
      w="100%"
      border={'none'}
    >
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={1.5}
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
        fadeDuration={2.5}
        opacity={isLoading ? 0.5 : 1}
        w="full"
      >
        <CardBody
          display={
            projectData && projectData?.ProjectJoinRound?.length > 0
              ? 'flex'
              : 'none'
          }
          pb={{ base: '16px', sm: '20px', md: '24px' }}
          gap={{ base: '16px', md: '24px' }}
        >
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
              createKey={projectData?.createKey as string}
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
