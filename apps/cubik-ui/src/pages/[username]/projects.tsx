import { Container } from '@chakra-ui/layout';
import React from 'react';
import SEO from '~/components/SEO';
import { Prisma, prisma } from '@cubik/database';
import { ProfileNftType } from '~/types/user';
interface Props {
  profilePicture?: string | undefined;
  profileNft?: ProfileNftType | undefined;
  mainWallet?: string | undefined;
  username: string;
}
const UserProjects = ({ username }: Props) => {
  return (
    <>
      <SEO
        title={`@${username ? username : 'User'}`}
        description={`@${username ? username : 'User'}'s profile`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <Container
        maxW="7xl"
        w="full"
        p={{ base: '23px 20px', sm: '32px', md: '48px', lg: '48px 20px' }}
      ></Container>
    </>
  );
};
export async function getServerSideProps(context: { query: { username: string } }) {
  const username = context.query.username;
  const data = await prisma.userModel.findFirst({
    where: {
      username: username,
    },
    select: {
      profilePicture: true,
      profileNft: true,
      mainWallet: true,
    },
  });

  return {
    props: {
      username,
      ...data,
    },
  };
}
export default UserProjects;
