import { Box, Center, Container, Flex, Heading, Link } from "@chakra-ui/layout";
import React, { use } from "react";
import SEO from "~/components/SEO";
import { Prisma, ProjectVerifyStatus, prisma } from "@cubik/database";
import { ProfileNftType } from "~/types/user";
import ProfileHeader from "~/components/pages/user-profile/ProfileHeader";
import UserContributions from "~/components/pages/user-profile/contributions-tab/UserContributions";
import {
  AdminProjectEmptyState,
  VisitorProjectEmptyState,
} from "~/components/pages/user-profile/empty-states/ProjectEmptyState";
import ProjectVisitorCard from "~/components/pages/user-profile/projects-tab/ProjectVisitorCard";
import { trpc } from "~/utils/trpc";
import { UserPageLayout } from "~/layouts/userPageLayout";
import ComponentErrors from "~/components/errors/ComponentErrors";
import ProjectAdminCard from "~/components/pages/user-profile/projects-tab/ProjectAdminCard";
import { useUserStore } from "~/store/userStore";
interface Props {
  username: string;
}
const UserProjects = (props: Props) => {
  const { user } = useUserStore();
  const { data, isLoading, isError, error } = trpc.user.findOne.useQuery(
    {
      username: props.username as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const projects = trpc.project.getProjects.useQuery(
    {
      id: data?.id as string,
    },
    {
      enabled: !!data,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  if (isError) return <ComponentErrors error={error} />;
  if (!isLoading && !data) {
    return (
      <>
        <SEO
          title={`Error 404`}
          description={`There was some error!!`}
          image={`error`}
        />
        <Container maxW="full">
          <Center gap="16px" flexDir={"column"} maxW="4xl" mx="auto" py="14rem">
            <Heading fontSize="9xl">404</Heading>
            <Box as="p" textStyle={{ base: "title3", md: "title1" }}>
              Page Not Found
            </Box>
            <Box
              textAlign={"center"}
              maxW="22rem"
              as="p"
              textStyle={{ base: "body4", md: "body2" }}
            >
              The page you are looking for does not exist. Go back
              <Box
                as={Link}
                href="/projects"
                color="brand.teal5"
                textDecoration={"underline"}
              >
                home
              </Box>
            </Box>
          </Center>
        </Container>
      </>
    );
  }
  return (
    <>
      <SEO
        title={`@${data ? props.username : "User"}`}
        description={`@${data ? props.username : "User"}'s profile`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <UserPageLayout
        id={data?.id as string}
        mainWallet={data?.mainWallet as string}
        profilePicture={data?.profilePicture as string}
        username={props.username}
      >
        {user && user.id === data?.id ? (
          <Flex direction="column" w="full" gap={{ base: "24px", md: "32px" }}>
            {projects.data && projects.data.length > 0 ? (
              projects.data.map((project, key) => {
                return !project.isArchive ? (
                  <ProjectAdminCard project={project} key={key} />
                ) : (
                  <></>
                );
              })
            ) : (
              <AdminProjectEmptyState />
            )}
          </Flex>
        ) : (
          <Flex direction="column" w="full" gap="32px">
            {projects.data && projects.data?.length > 0 ? (
              projects.data
                .filter(
                  (project) => project.status === ProjectVerifyStatus.VERIFIED
                )
                .map((project, key) => (
                  <ProjectVisitorCard
                    userName={props.username}
                    project={project}
                    isLoading={false}
                    key={key}
                  />
                ))
            ) : (
              <VisitorProjectEmptyState />
            )}
          </Flex>
        )}
      </UserPageLayout>
    </>
  );
};
export async function getServerSideProps(context: {
  query: { username: string };
}) {
  const username = context.query.username;

  return {
    props: {
      username,
    },
  };
}
export default UserProjects;
