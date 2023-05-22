import { Container, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import { ProjectDetailsAndTabs } from '~/components/pages/projects/project-details/ProjectDetailsAndTabs';
import SEO from '~/components/SEO';
import { Mixpanel } from '~/utils/mixpanel';
import { trpc } from '~/utils/trpc';

const ProjectDetails = () => {
  const router = useRouter();

  const { data, isError, isLoading, error } = trpc.project.findOne.useQuery({
    id: router.query.projectId as string,
  });
  Mixpanel.track('project_page_load', {
    id: router.query.projectId,
  });
  if (isError) {
    return <>{error.message}</>;
  }

  console.log('project details', data);
  return (
    <>
      <SEO
        title={`${data ? data.name : 'Project'} - Cubik`}
        description={`${data ? data.short_description : ''}`}
        image={data ? data?.logo : ''}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'} p="0">
          {/*<Container pt="32px" maxW="7xl" mx="auto">
            <Breadcrumb color="white" fontWeight="bold" fontSize="md">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/projects">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href={'/projects/' + data?.id}>
                  {data?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Container> */}
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '24px', md: '12px', lg: '60px', xl: '100px' }}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
            py={{ base: '24px', md: '64px' }}
            alignItems={'start'}
            justifyContent={'start'}
          >
            <ProjectDetailsAndTabs
              projectDetails={data}
              isLoading={isLoading}
            />
            <ProjectInteractions projectDetails={data} isLoading={isLoading} />
          </Stack>
        </Container>
      </main>
    </>
  );
};

export default ProjectDetails;
