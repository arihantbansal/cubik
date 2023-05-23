import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import SEO from '~/components/SEO';
import GrantDetailsBody from '~/components/pages/grants/details/GrantDetailsBody';
import GrantDetailsHeader from '~/components/pages/grants/details/GrantDetailsHeader';
import { trpc } from '~/utils/trpc';

interface GrantDetailsProps {
  grantId: string;
}

const GrantDetails: React.FC<GrantDetailsProps> = ({ grantId }) => {
  const { data, error, isLoading } = trpc.round.details.useQuery({
    id: grantId,
  });

  return (
    <div>
      <SEO title={``} description={``} image={``} />
      <main>
        <Container
          py="80px"
          maxW="7xl"
          px="1rem"
          display={'flex'}
          flexDir={'column'}
          gap="80px"
        >
          <GrantDetailsHeader data={data} isLoading={isLoading} />
          <GrantDetailsBody data={data} isLoading={isLoading} />
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
