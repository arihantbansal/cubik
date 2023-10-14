import { Box, Container } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import SEO from "~/components/SEO";
import GrantDetailsBody from "~/components/pages/grants/details/GrantDetailsBody";
import GrantDetailsHeader from "~/components/pages/grants/details/GrantDetailsHeader";
import { GrantRoundAdminControls } from "~/components/pages/projects/admin/AdminControls";
import { trpc } from "~/utils/trpc";

interface GrantDetailsProps {
  grantId: string;
}

const GrantDetails: React.FC<GrantDetailsProps> = ({ grantId }) => {
  const { data, isError, isLoading, error } = trpc.round.details.useQuery({
    id: grantId,
  });

  return (
    <div>
      <SEO
        title={`${data?.roundName || "Grant"}`}
        description={`${data?.short_description || "Grant Round on Cubik"}`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1687266944/Projects_ozybde.png`}
      />
      <main>
        <Container
          py={{ base: "32px", md: "80px" }}
          maxW="7xl"
          px="1rem"
          display={"flex"}
          flexDir={"column"}
          gap={{ base: "32px", md: "60px" }}
        >
          <GrantDetailsHeader
            isError={isError}
            data={data}
            isLoading={isLoading}
            error={error}
          />
          <GrantRoundAdminControls
            isLoading={isLoading}
            roundName={data?.roundName}
            roundId={data?.id}
            roundCreatorId={data?.userId}
          />
          <Box h="1px" backgroundColor="#1D1F1E90" w="full" />
          <GrantDetailsBody
            isError={isError}
            data={data}
            isLoading={isLoading}
          />
        </Container>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const grantId = context.query.grantId as string;
  return {
    props: { grantId }, // will be passed to the page component as props
  };
};

export default GrantDetails;
