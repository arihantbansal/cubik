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
  Text,
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

  return (
    <Container
      maxW="7xl"
      w="full"
      p={{ base: "23px 20px", sm: "32px", md: "48px", lg: "64px 20px" }}
      mt="4rem"
    >
      <Flex flexDir={"column"} gap="48px">
        <User
          NFTProfile={profile.profileNft as NFTProfile}
          username={username}
          mainWallet={profile.mainWallet}
          profilePicture={profile.profilePicture!}
        />
        {children}
      </Flex>
    </Container>
  );
};

export default Profile;
