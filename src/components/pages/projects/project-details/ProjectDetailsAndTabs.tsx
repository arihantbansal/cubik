import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Skeleton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import {
  ProjectFundingData,
  ProjectOwner,
  ProjectSocials,
} from './project-interactions/ProjectInteractions';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import { ProjectsTabs } from './ProjectTabs';
import {
  Contribution,
  ProjectJoinRound,
  ProjectsModel,
  Round,
  Team,
  UserModel,
} from '@prisma/client';
import { ProjectDonationSimulator } from './project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ro } from 'date-fns/locale';
import ProjectsContributorsNumber from '../project-explorer/body/ProjectsContributorsNumber';
import { RecentContributions } from './project-interactions/RecentContributors';
import { ProjectCTAsMobile } from './project-interactions/ProjectCTAs';

type MobileDrawerTypes = {
  logo: string;
  projectName: string;
  walletAddress: string;
  isOpen: boolean;
  onClose: () => void;
  setDonationSuccessful: any;
  roundId: string;
  projectJoinRoundId: string;
  projectDetails: ProjectsModel;
  roundName: string;
};

const MobileDrawer = ({
  logo,
  projectName,
  walletAddress,
  isOpen,
  onClose,
  setDonationSuccessful,
  roundId,
  projectJoinRoundId,
  projectDetails,
  roundName,
}: MobileDrawerTypes) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      variant="cubik"
    >
      <DrawerOverlay />
      <DrawerContent w={{ base: '26rem', md: '30rem' }} mx="auto" pt="0">
        <DrawerCloseButton top="28px" backgroundColor="none" />
        <DrawerHeader p="16px" roundedTop={'16px'} backgroundColor="black">
          <HStack>
            <Avatar src={logo} size="md" />
            <VStack gap="0" align={'start'}>
              <Box as="p" textStyle={'title3'} lineHeight="16px">
                {projectName}
              </Box>
              <WalletAddress walletAddress={walletAddress} size={'sm'} />
            </VStack>
          </HStack>
        </DrawerHeader>
        <DrawerBody mx="auto">
          <ProjectDonationSimulator
            height={80}
            width={120}
            roundName={roundName}
            projectDetails={projectDetails}
            projectJoinRoundId={projectJoinRoundId}
            roundId={roundId}
            setDonationSuccessful={setDonationSuccessful}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileOnlyViews = ({
  joinId,
  isLoading,
  data,
}: {
  joinId?: string;
  isLoading: boolean;
  data:
    | (ProjectJoinRound & {
        project: ProjectsModel & {
          Team: (Team & {
            user: UserModel;
          })[];
          Contribution: (Contribution & {
            user: UserModel;
          })[];
          owner: UserModel;
        };
        fundingRound: Round;
      })
    | null
    | undefined;
}) => {
  console.log('2 - data', data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationSuccessful, setDonationSuccessful] = useState(false);

  return (
    <>
      <VStack gap="32px" w="full" display={{ base: 'flex', lg: 'none' }}>
        {/* <HStack w="full">
          <Skeleton
            isLoaded={!isLoading}
            opacity={isLoading ? 0.6 : 1}
            fadeDuration={3}
            w="full"
          >
            <Button
              w="full"
              fontSize={'16px'}
              onClick={onOpen}
              variant="connect_wallet"
            >
              Donate
            </Button>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            opacity={isLoading ? 0.6 : 1}
            fadeDuration={3}
            w="full"
          >
            <Button
              w="full"
              h="40px"
              borderRadius={'8px'}
              variant="secondary"
              fontSize="14px"
              pb="8px"
            >
              Visit Project
            </Button>
          </Skeleton>
        </HStack>{' '} */}
        <ProjectCTAsMobile
          joinId={joinId}
          round={data?.fundingRound}
          projectDetails={data?.project}
          isLoading={isLoading}
          onOpen={onOpen}
        />
        <ProjectSocials
          isLoading={isLoading}
          projectDetails={data?.project as ProjectsModel}
        />
        <RecentContributions
          projectId={data?.projectId as string}
          roundId={data?.roundId as string}
          isLoading={isLoading}
        />
        <ProjectFundingData
          isLoading={isLoading}
          contributors={data?.contributions || 0}
          funding={(data?.amountRaise as number) || 0}
        />
        <ProjectOwner isLoading={isLoading} team={data?.project.Team} />
      </VStack>
      <MobileDrawer
        roundName={data?.fundingRound.roundName as string}
        projectDetails={data?.project as ProjectsModel}
        logo={data?.project.logo as string}
        projectName={data?.project.name as string}
        walletAddress={data?.project.mutliSigAddress as string}
        isOpen={isOpen}
        onClose={onClose}
        projectJoinRoundId={data?.roundId as string}
        roundId={data?.roundId || ''}
        setDonationSuccessful={setDonationSuccessful}
      />
    </>
  );
};

export const ProjectDetailsAndTabs = ({
  joinId,
  isLoading,
  data,
}: {
  joinId?: string;
  isLoading: boolean;
  data:
    | (ProjectJoinRound & {
        project: ProjectsModel & {
          Team: (Team & {
            user: UserModel;
          })[];
          Contribution: (Contribution & {
            user: UserModel;
          })[];
          owner: UserModel;
        };
        fundingRound: Round;
      })
    | null
    | undefined;
}) => {
  return (
    <Container
      display={'flex'}
      w="full"
      maxW="50rem"
      flex="3"
      flexDir="column"
      alignItems={{ base: 'end', lg: 'center' }}
      justifyContent="start"
      gap={{ base: '32px', lg: '64px' }}
      p="0"
    >
      <ProjectDetailsHeader
        isLoading={isLoading}
        industry={data?.project.industry as string}
        logo={data?.project.logo as string}
        name={data?.project.name as string}
        short_description={data?.project.short_description as string}
      />
      <MobileOnlyViews joinId={joinId} isLoading={isLoading} data={data} />
      <ProjectsTabs
        ownerName={data?.project.owner.username as string}
        roundId={data?.roundId || ''}
        projectDetails={data?.project}
        isLoading={isLoading}
      />
    </Container>
  );
};
