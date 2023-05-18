import { Box, Center, Container, Heading, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import SEO from 'src/components/SEO';
import AdminView from '~/components/pages/user-profile/AdminView';
import VisitorView from '~/components/pages/user-profile/VisitorView';
import { trpc } from '~/utils/trpc';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, isError, isLoading } = trpc.user.findOne.useQuery(
    {
      username: router.query.username as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isError) {
    return (
      <Container maxW="full">
        <Center gap="16px" flexDir={'column'} maxW="4xl" mx="auto" py="14rem">
          <Heading fontSize="9xl">404</Heading>
          <Box as="p" textStyle={'title1'}>
            Page Not Found{' '}
          </Box>
          <Box textAlign={'center'} maxW="22rem" as="p" textStyle={'body2'}>
            The page you are looking for does not exist. Go back{' '}
            <Text
              as="span"
              color="brand.teal5"
              textDecoration={'underline'}
              onClick={() => router.push('/')}
              cursor="pointer"
            >
              home
            </Text>
          </Box>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`@${data ? data.username : 'User'} - Cubik`}
        description={`@${data ? data.username : 'User'}'s profile`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <Container
        maxW="7xl"
        w="full"
        p={{ base: '23px 20px', sm: '32px', md: '48px', lg: '48px 20px' }}
      >
        {session?.user.username === data?.username ? (
          <AdminView user={data} isLoading={isLoading} />
        ) : (
          <VisitorView user={data} isLoading={isLoading} />
        )}
      </Container>
    </>
  );
};

export default React.memo(ProfilePage);
