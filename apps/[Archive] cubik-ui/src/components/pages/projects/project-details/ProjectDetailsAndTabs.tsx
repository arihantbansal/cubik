import { Avatar } from "@chakra-ui/avatar";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, HStack, VStack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Contribution,
  ProjectsModel,
  Round,
  Team,
  UserModel,
} from "@cubik/database";
import { useState } from "react";
import { WalletAddress } from "~/components/common/wallet/WalletAdd";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import { ProjectsTabs } from "./ProjectTabs";
import { ProjectCTAsMobile } from "./project-interactions/ProjectCTAs";
import {
  ProjectFundingData,
  ProjectOwner,
  ProjectSocials,
} from "./project-interactions/ProjectInteractions";
import { ProjectDonationSimulator } from "./project-interactions/project-donation-simulator/ProjectDonationSimulator";
import { HackathonSchedule } from "@cubik/common-types";

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
  name: string;
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
  name,
}: MobileDrawerTypes) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      variant="cubik"
    >
      <DrawerOverlay />
      <DrawerContent w={{ base: "26rem", md: "30rem" }} mx="auto" pt="0">
        <DrawerCloseButton top="28px" backgroundColor="none" />
        <DrawerHeader p="16px" roundedTop={"16px"} backgroundColor="black">
          <HStack>
            <Avatar src={logo} size="md" />
            <VStack gap="0" align={"start"}>
              <Box as="p" textStyle={"title3"} lineHeight="16px">
                {projectName}
              </Box>
              <WalletAddress walletAddress={walletAddress} size={"sm"} />
            </VStack>
          </HStack>
        </DrawerHeader>
        <DrawerBody mx="auto" w="full">
          <ProjectDonationSimulator
            height={88}
            width={120}
            name={name}
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
  projectJoinId,
  isLoading,
  project,
  roundId,
  amountRaise,
  contributions,
  communityContributions,
  hackathonId,
  timeline,
  endTime,
  startTime,
  hackathonJoinId,
  name,
}: {
  projectJoinId?: string;
  isLoading: boolean;
  roundId?: string;
  amountRaise: number;
  contributions: number;
  communityContributions: number;
  hackathonId?: string;
  timeline?: HackathonSchedule;
  hackathonJoinId?: string;
  startTime: Date;
  endTime: Date;
  name: string;
  project:
    | (ProjectsModel & {
        Team: (Team & {
          user: UserModel;
        })[];
        Contribution: (Contribution & {
          user: UserModel;
        })[];
        owner: UserModel;
      })
    | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [donationSuccessful, setDonationSuccessful] = useState(false);

  return (
    <>
      <VStack gap="32px" w="full" display={{ base: "flex", lg: "none" }}>
        {hackathonId && (
          <ProjectCTAsMobile
            onOpen={onOpen}
            endTime={endTime}
            loading={isLoading}
            project={{
              ...project!!,
            }}
            startTime={startTime}
            hackathonId={hackathonId as string}
            hackathonJoinId={hackathonJoinId}
          />
        )}
        <ProjectSocials
          isLoading={isLoading}
          projectDetails={{
            ...project!!,
          }}
        />
        {/* <RecentContributions
          projectId={project?.id as string}
          roundId={roundId as string}
          isLoading={isLoading}
        /> */}
        <ProjectFundingData
          isLoading={isLoading}
          contributors={contributions || 0}
          funding={(amountRaise as number) || 0}
          communityContributions={communityContributions}
        />
        <ProjectOwner isLoading={isLoading} team={project?.Team} />
      </VStack>
      <MobileDrawer
        name={name}
        projectDetails={project as ProjectsModel}
        logo={project?.logo as string}
        projectName={project?.name as string}
        walletAddress={project?.mutliSigAddress as string}
        isOpen={isOpen}
        onClose={onClose}
        projectJoinRoundId={roundId as string}
        roundId={roundId || ""}
        setDonationSuccessful={setDonationSuccessful}
      />
    </>
  );
};

export const ProjectDetailsAndTabs = ({
  joinId,
  isLoading,
  projectDetails,
  roundId,
  amountRaise,
  fundingRound,
  contributions,
  communityContributions,
  hackathonId,
  timeline,
  name,
}: {
  joinId?: string;
  isLoading: boolean;
  roundId: string;
  amountRaise: number;
  contributions: number;
  fundingRound?: Round;
  communityContributions: number;
  hackathonId?: string;
  timeline?: HackathonSchedule;
  name: string;
  projectDetails:
    | (ProjectsModel & {
        Team: (Team & {
          user: UserModel;
        })[];
        Contribution: (Contribution & {
          user: UserModel;
        })[];
        owner: UserModel;
      })
    | undefined;
}) => {
  return (
    <Container
      display={"flex"}
      w="full"
      maxW="50rem"
      flex="3"
      flexDir="column"
      alignItems={{ base: "end", lg: "center" }}
      justifyContent="start"
      gap={{ base: "32px", lg: "64px" }}
      p="0"
    >
      <ProjectDetailsHeader
        isLoading={isLoading}
        industry={projectDetails?.industry as string}
        logo={projectDetails?.logo as string}
        name={projectDetails?.name as string}
        short_description={projectDetails?.short_description as string}
      />
      {hackathonId && (
        <MobileOnlyViews
          name={name}
          hackathonId={hackathonId as string}
          timeline={timeline as HackathonSchedule}
          amountRaise={amountRaise}
          contributions={contributions as number}
          communityContributions={communityContributions as number}
          isLoading={isLoading}
          project={projectDetails}
          roundId={roundId}
          endTime={timeline![2].end as Date}
          startTime={timeline![2].start as Date}
          hackathonJoinId={joinId}
        />
      )}
      {roundId && (
        <MobileOnlyViews
          amountRaise={amountRaise}
          contributions={contributions as number}
          communityContributions={communityContributions as number}
          isLoading={isLoading}
          project={projectDetails}
          roundId={roundId}
          endTime={fundingRound?.endTime as Date}
          startTime={fundingRound?.startTime as Date}
          projectJoinId={joinId}
          name={name}
        />
      )}
      <ProjectsTabs
        ownerName={projectDetails?.owner?.username as string}
        roundId={roundId || ""}
        projectDetails={projectDetails}
        isLoading={isLoading}
      />
    </Container>
  );
};
