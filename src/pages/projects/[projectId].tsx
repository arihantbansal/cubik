import { Container, Stack } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AboutProject } from '~/components/pages/projects/project-details/AboutProject';
import { ProjectInteractions } from '~/components/pages/projects/project-details/project-interactions/ProjectInteractions';
import SEO from '~/components/SEO';
import { projectType } from '~/types/project';

type projectPropsType = {
  project: projectType;
};

const ProjectDetails = (props: projectPropsType) => {
  const router = useRouter();
  //   const projectData = useQuery({
  //     queryFn: ({ queryKey }) =>
  //       getProjectByID({ project_id: queryKey[1] as string }),
  //     queryKey: ['project', router.query.projectId],
  //   });

  console.log(props);
  return (
    <>
      <SEO
        title={props.project.project_name}
        description={props.project.short_description}
        image={props.project.logo}
      />
      <main style={{ width: 'full' }}>
        <Container maxW={'full'} p="0" py={{ base: '6rem', md: '8rem' }}>
          <Stack
            maxW="7xl"
            mx="auto"
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '24px', md: '120px' }}
            px={{ base: '1rem', sm: '2rem', md: '2rem', xl: '1rem' }}
          >
            <AboutProject projectDetails={props.project} />
            <ProjectInteractions projectDetails={props.project} />
          </Stack>
        </Container>
      </main>
    </>
  );
};
// server side render this page

export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  const { projectId } = query;
  const queryClient = new QueryClient();
  const project = {
    project_name: 'Solmon',
    logo: 'https://images.vexels.com/media/users/3/242377/isolated/lists/304e716493f158f27841095b49db1ec6-ship-wheel-nautical-element.png',
    short_description:
      'Solmon is a cli tool that enable developer building on anchor to compile and deploy at file change',
    industry: [
      { value: 'tool', label: 'Tool', color_scheme: 'red' },
      { value: 'sdk', label: 'SDK', color_scheme: 'blue' },
    ],
    project_link: 'https://www.solmon.com/',
    usd_total: 0,
    owner_publickey: 'FkaHjeKxxVj4gzXmzeq4vsJEgWNRKCEjefFDQvuy6sGi',
    long_description:
      "Solmon is a tool that allows developers to make changes to the source code of a program and have them automatically applied to the running program without the need to manually stop and restart it. This process is called 'hot reloading' or 'hot swapping' which allows developers to save time and effort during the development process.\n#### Benefits of using Solmon \n- It eliminates the need to manually stop and restart the program every time a change is made, saving a significant amount of time and effort for the developer. - Allows developers to make changes to the code and see the results in real-time, without the need to manually stop and restart the program.- It's easy to use, compatible with multiple programming languages, and it can be integrated seamlessly with any development environment.- Allows developers to focus on other tasks, rather than manually stopping and restarting the program.\n #### How Solmon works \n\nSolmon works by monitoring the source code files and automatically detecting when changes are made. Once a change is detected, Solmon will automatically apply the change to the running program without the need for manual intervention. This allows developers to make changes to the code and see the results in real-time, without the need to manually stop and restart the program.\n\nIn summary, Solmon is a powerful tool that allows developers to make changes to the source code of a program and have them automatically applied to the running program without the need to manually stop and restart it. It saves time and effort for developers and allows them to focus on other tasks, it is easy to use and it's compatible with multiple programming languages, making it a valuable tool for any developer.\n",
    socials: [
      {
        name: 'twitter',
        url: 'https://twitter.com/anchorlang',
      },
      {
        name: 'discord',
        url: 'https://twitter.com/Laaoy4esC2',
      },
    ],
    owner: [
      {
        id: '',
        username: 'dhruv.sol',
        mainwallet: '0xkehg9233478shk34879dskj230sj3056hgtyui',
        icon: 'https://pbs.twimg.com/profile_images/1521019107663282177/JOpKsJOP_400x400.jpg',
        pubkey: '9kvn...3Syh',
      },
    ],
  };

  if (!project) {
    return {
      notFound: true,
    };
  }
  return {
    props: { project },
  };

  //   try {
  //     await queryClient.prefetchQuery(['project', projectId], () =>
  //       getProjectByID({ project_id: projectId })
  //     );
  //     return {
  //       props: { dehydratedState: dehydrate(queryClient) },
  //     };
  //   } catch (e) {
  //     return {
  //       notFound: true,
  //     };
  //   }
}

export default ProjectDetails;
