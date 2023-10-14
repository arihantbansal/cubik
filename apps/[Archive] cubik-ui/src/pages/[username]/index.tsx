import { Box, Center, Container, Flex, Heading } from "@chakra-ui/layout";
import Link from "next/link";
import SEO from "src/components/SEO";
import ComponentErrors from "~/components/errors/ComponentErrors";
import UserDetails from "~/components/pages/user-profile/details-tab/UserDetails";
import UserProofs from "~/components/pages/user-profile/details-tab/UserProofs";
import { UserPageLayout } from "~/layouts/userPageLayout";
import { useUserStore } from "~/store/userStore";
import { UserProof } from "~/types/user";
import { trpc } from "~/utils/trpc";

const ProfilePage = ({ username }: { username: string }) => {
  const { user } = useUserStore();

  const { data, isLoading, isError, error } = trpc.user.findOne.useQuery(
    {
      username: username as string,
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
      <UserPageLayout
        id={data?.id as string}
        mainWallet={data?.mainWallet as string}
        profilePicture={data?.profilePicture as string}
        username={username}
      >
        <Flex
          gap={{ base: "24px", md: "32px" }}
          w={"full"}
          p="0"
          flexDir="column"
        >
          <UserDetails userId={data?.id as string} isLoading={isLoading} />
          {user && user?.id === data?.id && (
            <UserProofs
              wallet={user?.mainWallet as string}
              isLoading={isLoading}
              proofs={user?.proof as unknown as UserProof[]}
            />
          )}
        </Flex>
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

export default ProfilePage;
