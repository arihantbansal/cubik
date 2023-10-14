import { Accordion } from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Box, Center } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { ProjectVerifyStatus } from "@cubik/database";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { trpc } from "~/utils/trpc";
import AdminProjectRoundCard from "./AdminProjectRoundCard";
import ProjectHeader from "./ProjectHeader";
import ProjectVerificationStatusBanner from "./ProjectVerificationStatusBanner";
import Vault from "./project-admin-dashboard/project-vault/Vault";
import { ProjectProfileCard } from "~/types/projects";
import { HackathonSchedule } from "@cubik/common-types";
import AdminProjectHackathonCard from "./AdminProjectHackathonCard";

const ProjectAdminCard = ({ project }: { project: ProjectProfileCard }) => {
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
        p={{ base: "16px", sm: "20px", md: "24px" }}
        gap={{ base: "16px", sm: "20px", md: "24px" }}
        w="100%"
        border={"none"}
      >
        <ComponentErrors error={error} />
      </Card>
    );
  }

  return (
    <Card
      px="0px"
      gap={{ base: "16px", sm: "20px", md: "24px" }}
      w="100%"
      border={"none"}
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
        <ProjectHeader
          isLoading={isLoading}
          longDescription={projectData?.long_description as string}
          projectLogo={project.logo}
          projectName={project.name}
          project_link={project.project_link}
          shortdescription={projectData?.short_description as string}
          status={project?.status}
        />
      </CardHeader>
      {projectData && projectData?.ProjectJoinRound.length > 0 && (
        <Box w="full" h={"1px"} backgroundColor="neutral.3" />
      )}
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={2.5}
        opacity={isLoading ? 0.5 : 1}
        w="full"
      >
        <CardBody
          pt="0"
          display={projectData ? "flex" : "none"}
          pb={{ base: "16px", sm: "20px", md: "24px" }}
          gap={{ base: "16px", md: "24px" }}
        >
          {projectData?.ProjectJoinRound?.length &&
          projectData?.ProjectJoinRound?.length > 0 ? (
            <Accordion
              px={{ base: "12px", md: "16px" }}
              w="full"
              display={"flex"}
              flexDir={"column"}
              gap={{ base: "16px", md: "24px" }}
              allowMultiple
              allowToggle
              variant={"unstyled"}
            >
              {projectData?.ProjectJoinRound.map((round) => (
                <AdminProjectRoundCard
                  isLoading={isLoading}
                  amountRaise={round.amountRaise || 0}
                  endTime={round.fundingRound.endTime}
                  id={round.fundingRound.id}
                  projectId={project.id}
                  key={round.fundingRound.id}
                  roundName={round.fundingRound.roundName}
                  startTime={round.fundingRound.startTime}
                  status={round.status}
                />
              ))}
            </Accordion>
          ) : (
            <> </>
          )}
          {projectData?.projectJoinHackathon?.length &&
          projectData?.projectJoinHackathon?.length > 0 ? (
            <Accordion
              px={{ base: "12px", md: "16px" }}
              w="full"
              display={"flex"}
              flexDir={"column"}
              gap={{ base: "16px", md: "24px" }}
              allowMultiple
              allowToggle
              variant={"unstyled"}
            >
              {projectData?.projectJoinHackathon.map((hackathon) => {
                const timeline = (
                  hackathon.hackathon.timeline as unknown as HackathonSchedule
                ).sort((a, b) => a.index - b.index);
                return (
                  <AdminProjectHackathonCard
                    isLoading={isLoading}
                    amountRaise={hackathon.amount || 0}
                    endTime={timeline[1].end as Date}
                    id={hackathon.hackathon.name}
                    projectId={project.id}
                    key={hackathon.hackathon.name}
                    hackathonName={hackathon.hackathon.name}
                    startTime={timeline[1].start as Date}
                    status={"APPROVED"}
                  />
                );
              })}
            </Accordion>
          ) : (
            <></>
          )}
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
                ? "flex"
                : "none"
            }
            w="full"
          >
            <Button
              onClick={() => setShowVault(!showVault)}
              variant="cubikText"
              size={{ base: "cubikMini", md: "cubikSmall" }}
              rightIcon={
                showVault ? (
                  <Box as={BiChevronUp} boxSize={["14px", "16px", "18px"]} />
                ) : (
                  <Box as={BiChevronDown} boxSize={["14px", "16px", "18px"]} />
                )
              }
            >
              {showVault ? "Hide" : "Show"} Vault Details
            </Button>
          </Center>
        </CardBody>
      </Skeleton>
      <CardFooter display="none" />
    </Card>
  );
};

export default ProjectAdminCard;
