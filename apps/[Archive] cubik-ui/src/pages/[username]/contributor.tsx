import { Box, Center, Container, Flex, Heading, Link } from "@chakra-ui/layout";
import React from "react";
import SEO from "~/components/SEO";
import UserContributions from "~/components/pages/user-profile/contributions-tab/UserContributions";
import { trpc } from "~/utils/trpc";
import { UserPageLayout } from "~/layouts/userPageLayout";
import ComponentErrors from "~/components/errors/ComponentErrors";
interface Props {
  username: string;
}
const UserProjects = (props: Props) => {
  const { data, isLoading, isError, error } = trpc.user.findOne.useQuery(
    {
      username: props.username as string,
    },
    {
      refetchOnWindowFocus: false,
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
        <UserContributions userId={data?.id} />
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
