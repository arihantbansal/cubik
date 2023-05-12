import { Box, Center, Container, Heading, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import SEO from 'src/components/SEO';
import AdminView from '~/components/pages/user-profile/AdminView';
import { VisitorViewSkeleton } from '~/components/pages/user-profile/skeletons/ProfileViewSkeletons';
import VisitorView from '~/components/pages/user-profile/VisitorView';
import { trpc } from '~/utils/trpc';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const user = trpc.user.findOne.useQuery(
    {
      username: router.query.username as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (user.isError) {
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
  if (user.isLoading || !user.data) {
    return (
      <Container
        maxW="7xl"
        w="full"
        p={{ base: '23px 20px', md: '48px 20px', lg: '80px 20px' }}
      >
        <VisitorViewSkeleton />
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`@${user.data.username}`}
        description={`${user.data.username} supports public good on Cubik`}
        image={`https://solana.ghost.io/content/images/2022/06/solana-network-upgrades.png`}
      />
      <Container
        maxW="7xl"
        w="full"
        p={{ base: '23px 20px', md: '48px 20px', lg: '80px 20px' }}
      >
        {session?.user.username === user.data.username ? (
          <AdminView user={user.data} isLoading={user.isLoading} />
        ) : (
          <VisitorView user={user.data} isLoading={user.isLoading} />
        )}
      </Container>
    </>
  );
};

export default React.memo(ProfilePage);
