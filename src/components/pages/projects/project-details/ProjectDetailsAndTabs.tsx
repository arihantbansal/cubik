import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { ProjectWithRoundDetailsWithOwnerWithTeamType } from '~/types/project';
import { ProjectDonationSimulator } from './project-interactions/project-donation-simulator/ProjectDonationSimulator';
import {
  ProjectFundingData,
  ProjectOwner,
  ProjectSocials,
} from './project-interactions/ProjectInteractions';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import { ProjectsTabs } from './ProjectTabs';
import { MobileOnlyViewSkeleton } from './skeletons/ProjectPageLoadingSkeleton';

type MobileDrawerTypes = {
  logo: string;
  projectName: string;
  walletAddress: string;
  isOpen: boolean;
  onClose: () => void;
  projectDetails: ProjectWithRoundDetailsWithOwnerWithTeamType;
  setDonationSuccessful: any;
};

const MobileDrawer = ({
  logo,
  projectName,
  walletAddress,
  isOpen,
  onClose,
  projectDetails,
  setDonationSuccessful,
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
            projectDetails={projectDetails}
            setDonationSuccessful={setDonationSuccessful}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileOnlyViews = ({
  projectDetails,
  isLoading,
}: {
  isLoading?: boolean;
  projectDetails: ProjectWithRoundDetailsWithOwnerWithTeamType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationSuccessful, setDonationSuccessful] = useState(false);

  return isLoading ? (
    <MobileOnlyViewSkeleton />
  ) : (
    <>
      <VStack gap="32px" w="full" display={{ base: 'flex', lg: 'none' }}>
        <HStack w="full">
          <Button
            w="full"
            fontSize={'16px'}
            onClick={onOpen}
            variant="connect_wallet"
          >
            Donate
          </Button>
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
        </HStack>
        <ProjectSocials projectDetails={projectDetails} />{' '}
        <ProjectFundingData />
        <ProjectOwner projectDetails={projectDetails} />
      </VStack>
      <MobileDrawer
        logo={projectDetails.logo}
        projectName={projectDetails.name}
        walletAddress={projectDetails.owner_publickey}
        isOpen={isOpen}
        onClose={onClose}
        projectDetails={projectDetails}
        setDonationSuccessful={setDonationSuccessful}
      />
    </>
  );
};

export const ProjectDetailsAndTabs = ({
  projectDetails,
  isLoading,
}: {
  projectDetails: ProjectWithRoundDetailsWithOwnerWithTeamType;
  isLoading: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  console.log('we are here');

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
        projectDetails={projectDetails}
      />
      <MobileOnlyViews isLoading={isLoading} projectDetails={projectDetails} />
      <ProjectsTabs projectDetails={projectDetails} isLoading={isLoading} />
    </Container>
  );
};
