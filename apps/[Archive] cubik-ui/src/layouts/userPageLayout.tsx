import { Box, Container, HStack } from "@chakra-ui/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ProfileHeader from "~/components/pages/user-profile/ProfileHeader";
interface Props {
  profilePicture?: string | undefined;
  mainWallet?: string | undefined;
  username: string;
  id: string;
  children: React.ReactNode;
}
export const UserPageLayout = (props: Props) => {
  const router = useRouter();
  return (
    <>
      <Container
        maxW="7xl"
        w="full"
        p={{ base: "23px 20px", sm: "32px", md: "48px", lg: "48px 20px" }}
      >
        <ProfileHeader
          isLoading={false}
          mainWallet={props.mainWallet}
          profilePicture={props.profilePicture}
          username={router.query.username as string}
        />
        <HStack py="1rem" gap={5} my={5}>
          <Box
            borderBottom={
              router.asPath === `/${router.query.username}` ? "2px solid" : 0
            }
            p={2}
            fontWeight={700}
            color={
              router.asPath === `/${router.query.username}`
                ? "brand.teal6"
                : "neutral.7"
            }
            fontSize={20}
          >
            <Link href={"/" + router.query.username}>Details</Link>
          </Box>
          <Box
            borderBottom={
              router.asPath === `/${router.query.username}/projects`
                ? "2px solid"
                : 0
            }
            p={2}
            fontWeight={700}
            color={
              router.asPath === `/${router.query.username}/projects`
                ? "brand.teal6"
                : "neutral.7"
            }
            fontSize={20}
          >
            <Link href={"/" + router.query.username + "/projects"}>
              Projects
            </Link>
          </Box>
          <Box
            borderBottom={
              router.asPath === `/${router.query.username}/contributor`
                ? "2px solid"
                : 0
            }
            p={2}
            fontWeight={700}
            color={
              router.asPath === `/${router.query.username}/contributor`
                ? "brand.teal6"
                : "neutral.7"
            }
            fontSize={20}
          >
            <Link href={"/" + router.query.username + "/contributor"}>
              Contributor
            </Link>
          </Box>
        </HStack>
        {props.children}
      </Container>
    </>
  );
};
