import { Container, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { isPast } from "date-fns";
import { GetServerSideProps } from "next";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { ProjectInteractions } from "~/components/pages/projects/project-details/project-interactions/ProjectInteractions";
import { ProjectDetailsAndTabs } from "~/components/pages/projects/project-details/ProjectDetailsAndTabs";
import ProjectDetailsLiveRoundStatus from "~/components/pages/projects/project-details/ProjectDetailsLiveRoundStatus";
import SEO from "~/components/SEO";
import { Mixpanel } from "~/utils/mixpanel";
import { trpc } from "~/utils/trpc";

const ProjectDetails = ({
  projectId,
  joinId,
}: {
  projectId: string;
  joinId: string;
}) => {
  const { data, isLoading, isError, error } =
    trpc.project.findOneJoinRound.useQuery(
      {
        id: joinId as string,
      },
      {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      }
    );

  Mixpanel.track("project_page_load", {
    id: projectId,
    name: data?.project.name,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  const RoundStatusBanner = () => {
    if (isPast(data?.fundingRound.startTime as Date)) {
      return (
        <ProjectDetailsLiveRoundStatus
          endTime={data?.fundingRound.endTime as Date}
          startTime={data?.fundingRound.startTime as Date}
          status={"LIVE"}
          show={true}
          roundName={data?.fundingRound.roundName as string}
        />
      );
    } else return <></>;
  };
  if (data?.project.isArchive === true) {
    return <ComponentErrors error={{ message: "This project is been ban" }} />;
  }
  return (
    <>
      <SEO
        title={`${data ? data?.project?.name : "Project"} - Cubik`}
        description={`${data ? data?.project?.short_description : ""}`}
        image={data ? data?.project?.logo : ""}
      />
      <main style={{ width: "full" }}>
        <Container maxW={"full"}>
          {joinId && (
            <Skeleton
              isLoaded={!isLoading}
              w="full"
              maxW="7xl"
              mx="auto"
              fadeDuration={2}
              opacity={isLoading ? 0.3 : 1}
              h={isLoading ? "3rem" : "auto"}
            >
              <RoundStatusBanner />
            </Skeleton>
          )}
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "24px", md: "12px", lg: "60px", xl: "100px" }}
            px={{ base: "0.5rem", sm: "2rem", md: "2rem", xl: "1rem" }}
            py={{ base: "24px", md: "64px" }}
            alignItems={"start"}
            justifyContent={"start"}
          >
            {/* <ProjectDetailsAndTabs
              joinId={joinId}
              isLoading={isLoading}
              amountRaise={data?.amountRaise ?? 0}
              roundId={data?.fundingRound.id as string}
              fundingRound={data?.fundingRound}
              projectDetails={{
                ...data?.project!!,
              }}
              contributions={data?.project.Contribution.length ?? 0}
              communityContributions={Number(
                (
                  data?.project.Contribution.reduce(
                    (acc, curr) => acc + curr.usdTotal,
                    0
                  ) || 0
                ).toFixed(2)
              )}
            /> */}
            <ProjectInteractions
              joinId={joinId}
              round={data?.fundingRound}
              projectDetails={{
                ...data?.project!!,
              }}
              contributors={data?.project.Contribution}
              funding={data?.amountRaise ?? 0}
              isLoading={isLoading}
              preview={false}
              team={data?.project.Team ?? []}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectId = context.query.projectId as string;
  const join = context.query.join as string;

  return {
    props: {
      projectId,
      joinId: join,
    },
  };
};

export default ProjectDetails;
