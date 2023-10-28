import React from 'react';
import { Card, CardFooter, CardHeader } from '@chakra-ui/react';

import { AdminProjectDetails } from './AdminProjectDetails';
import { ProjectVerificationStatusBanner } from './ProjectVerificationStatusBanner';
import type { ProjectCommonType } from './type';

interface Props {
  project: ProjectCommonType;
}
export const AdminViewCards = ({ project }: Props) => {
  return (
    <>
      <Card px="0px" w="100%" gap={0} border={'none'}>
        <ProjectVerificationStatusBanner
          status={project?.status}
          projectJoinRoundStatus={true}
        />
        <CardHeader p="0" gap="0">
          <AdminProjectDetails
            id={project.id}
            projectLogo={project.logo}
            projectName={project.name}
            project_link={project.projectLink}
            shortDescription={project.shortDescription}
            status={project.status}
          />
        </CardHeader>
        {/* {projectData && projectData?.ProjectJoinRound.length > 0 && (
          <Box w="full" h={"1px"} backgroundColor="neutral.3" />
        )} */}

        {/* <CardBody
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
              // onClick={() => setShowVault(!showVault)}
              variant="cubikText"
              size={{ base: "cubikMini", md: "cubikSmall" }}
              // rightIcon={
              //   showVault ? (
              //     <Box as={BiChevronUp} boxSize={["14px", "16px", "18px"]} />
              //   ) : (
              //     <Box as={BiChevronDown} boxSize={["14px", "16px", "18px"]} />
              //   )
              // }
            >
              {showVault ? "Hide" : "Show"} Vault Details
            </Button>
          </Center>
        </CardBody> */}
        <CardFooter display="none" />
      </Card>
    </>
  );
};
