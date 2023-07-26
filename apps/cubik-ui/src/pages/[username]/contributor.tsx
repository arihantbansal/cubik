import { Container } from '@chakra-ui/layout';
import React from 'react';
import SEO from '~/components/SEO';

interface Props {
  username: string;
}
const UserContributions = ({ username }: Props) => {
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
  return {
    props: {
      username,
    },
  };
}
export default UserContributions;
