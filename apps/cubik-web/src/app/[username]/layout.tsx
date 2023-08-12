import { prisma } from "@cubik/database";
// import Details from "./components/details";
import {
  Center,
  Container,
  Flex,
  HStack,
  SkeletonCircle,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@/utils/chakra";
import { notFound } from "next/navigation";
import ProfilePictureAvatar from "@/app/components/common/profile-picture";
import Username from "../components/common/username";
import User from "./components/user";
import { NFTProfile } from "@/types/NFTProfile";

const getProfile = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      profilePicture: true,
      mainWallet: true,
      profileNft: true,
    },
  });
};

const Profile = async ({
  params: { username },
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) => {
  console.log(username);
  const profile = await getProfile(username);

  if (!profile) {
    return notFound();
  }

  console.log("profile", profile);

  return (
    <Container
      maxW="7xl"
      w="full"
      p={{ base: "23px 20px", sm: "32px", md: "48px", lg: "48px 20px" }}
    >
      <Flex flexDir={"column"} gap="48px">
        <User
          NFTProfile={profile.profileNft as NFTProfile}
          username={username}
          mainWallet={profile.mainWallet}
          profilePicture={profile.profilePicture!}
        />

        <Tabs variant={"cubik"} isLazy>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Projects</Tab>
            <Tab>Contributions</Tab>
          </TabList>
          <TabPanels p={"0"}>
            <TabPanel p="0">
              <Flex maxW={"full"} p="0" flexDir="column" gap="40px">
                {/* <UserDetails
                  isLoading={isLoading}
                  userId={user?.id as string}
                /> */}

                {children}
              </Flex>
            </TabPanel>
            {/* <TabPanel>
              <Flex direction="column" w="full" gap="32px">
                 {user &&
                user.project.filter(
                  (project) => project.status === ProjectVerifyStatus.VERIFIED
                ).length ? (
                  // filter verified projects only to show on user profile
                  user.project
                    .filter(
                      (project) =>
                        project.status === ProjectVerifyStatus.VERIFIED
                    )
                    .map((project, key) => (
                      <ProjectVisitorCard
                        userName={user.username as string}
                        project={project}
                        isLoading={isLoading}
                        key={key}
                      />
                    ))
                ) : (
                  <VisitorProjectEmptyState />
                )} 
              </Flex>
            </TabPanel>
            <TabPanel>
              {user && <UserContributions userId={user.id} />}
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

export default Profile;
