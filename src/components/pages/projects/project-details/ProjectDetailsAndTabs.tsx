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
import { Prisma, ProjectsModel } from '@prisma/client';
import { useRef } from 'react';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import { ProjectWithCommentsAndRoundsType } from '~/types/IProjectDetails';
import { ProjectDonationSimulator } from './project-interactions/project-donation-simulator/ProjectDonationSimulator';
import { ProjectsDetailedDescription } from './ProjectDetailedDescription';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import { ProjectsTabs } from './ProjectTabs';
import { ProjectDetailSkeleton } from './skeletons/ProjectPageLoadingSkeleton';

type MobileDrawerTypes = {
  logo: string;
  projectName: string;
  walletAddress: string;
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
};

const MobileDrawer = ({
  logo,
  projectName,
  walletAddress,
  isOpen,
  onClose,
  btnRef,
}: MobileDrawerTypes) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
      variant="cubik"
    >
      <DrawerOverlay />
      <DrawerContent pt="0">
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
        <DrawerBody>
          <ProjectDonationSimulator height={80} width={120} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const ProjectDetailsAndTabs = ({
  projectDetails,
  isLoading,
}: {
  projectDetails: ProjectWithCommentsAndRoundsType;
  isLoading: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  console.log(projectDetails);
  // const industry = loading ? undefined : JSON.parse(projectDetails.industry);

  return (
    <Container
      display={'flex'}
      w="full"
      maxW="50rem"
      flex="3"
      flexDir="column"
      alignItems={{ base: 'end', md: 'center' }}
      justifyContent="start"
      gap={{ base: '24px', md: '64px' }}
    >
      <>
        {isLoading ? (
          <ProjectDetailSkeleton />
        ) : (
          <ProjectDetailsHeader projectDetails={projectDetails} />
        )}
      </>
      {/* visible on mobile */}
      <HStack w="full" display={{ base: 'flex', md: 'none' }}>
        <Button
          onClick={onOpen}
          w="full"
          fontSize={'16px'}
          variant="connect_wallet"
        >
          Donate
        </Button>
        <Button
          onClick={onOpen}
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
      {/* <MobileDrawer
        logo={projectDetails.logo}
        projectName={projectDetails.name}
        walletAddress={projectDetails.owner_publickey}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
      />*/}
      <ProjectsTabs projectDetails={projectDetails} isLoading={isLoading} />
    </Container>
  );
};
