import { notFound } from 'next/navigation';
import type { NFTProfile } from '@/types/NFTProfile';
// import Details from "./components/details";
import { Container, Flex } from '@/utils/chakra';

import { prisma } from '@cubik/database';

import User from './components/user';

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
      p={{ base: '23px 20px', sm: '32px', md: '48px', lg: '64px 20px' }}
      mt="4rem"
    >
      <Flex flexDir={'column'} gap="48px">
        <User
          NFTProfile={profile.profileNft as unknown as NFTProfile}
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
