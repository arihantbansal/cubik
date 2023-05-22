import { Container } from '@chakra-ui/react';
//import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '~/components/SEO';
import GrantDetailsBody from '~/components/pages/grants/details/GrantDetailsBody';
import GrantDetailsHeader from '~/components/pages/grants/details/GrantDetailsHeader';
import { trpc } from '~/utils/trpc';

const GrantDetails = () => {
  const router = useRouter();
  const { grantId } = router.query;
  const { data, error, isLoading } = trpc.round.details.useQuery({
    id: grantId as string,
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
          {/* <Container border="1px solid red" p="0" maxW="7xl" w="full">
            <Breadcrumb color="white" fontWeight="bold" fontSize="md">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/grants">
                  Grants
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href={'/grants/' + data?.id}>
                  {data?.roundName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Container> */}
          <GrantDetailsHeader data={data} isLoading={isLoading} />
          <GrantDetailsBody data={data} isLoading={isLoading} />
        </Container>
      </main>
    </div>
  );
};

export default GrantDetails;
