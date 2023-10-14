import { Container, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { ProjectsModel } from "@cubik/database";
import { GetServerSideProps } from "next";
import SEO from "~/components/SEO";
import ComponentErrors from "~/components/errors/ComponentErrors";
import { ProjectDetailsAndTabs } from "~/components/pages/projects/project-details/ProjectDetailsAndTabs";
import { ProjectInteractions } from "~/components/pages/projects/project-details/project-interactions/ProjectInteractions";
import { Mixpanel } from "~/utils/mixpanel";
import { trpc } from "~/utils/trpc";

const ProjectDetails = ({
  projectId,
  roundId,
}: {
  projectId: string;
  roundId: string | null;
}) => {
  const { data, isError, isLoading, error } = trpc.project.findOne.useQuery({
    id: projectId as string,
  });

  Mixpanel.track("project_page_load", {
    id: projectId,
  });

  if (isError) {
    return <ComponentErrors error={error} />;
  }

  const isPreview = roundId === null;
  // this is the page where project details will show but no round details will be there
  return (
    <>
      <SEO
        title={`${data ? data.name : "Project"} - Cubik`}
        description={`${data ? data.short_description : ""}`}
        image={data ? data?.logo : ""}
      />
      <main style={{ width: "full" }}>
        <Container maxW={"full"} p="0">
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "24px", md: "12px", lg: "60px", xl: "100px" }}
            px={{ base: "1rem", sm: "2rem", md: "2rem", xl: "1rem" }}
            py={{ base: "24px", md: "64px" }}
            alignItems={"start"}
            justifyContent={"start"}
          >
            <ProjectDetailsAndTabs
              name=""
              projectDetails={{
                ...data!!,
              }}
              roundId={roundId as string}
              joinId={""}
              isLoading={isLoading}
              amountRaise={0}
              contributions={0}
              communityContributions={0}
            />

            <ProjectInteractions
              projectDetails={data as ProjectsModel}
              isLoading={isLoading}
              preview={true}
              team={data?.Team ?? []}
            />
          </Stack>
        </Container>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectId = context.query.projectId as string;

  const roundId = context.query.round as string;
  const prev = context.query.prev as string | undefined;

  if (prev) {
    return {
      props: { projectId, roundId: null },
    };
  } else {
    if (roundId) {
      return {
        props: { projectId, roundId },
      };
    }
    return {
      props: { projectId, roundId: null },
    };
  }
};

export default ProjectDetails;
