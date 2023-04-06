import { Container } from '@chakra-ui/react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SEO from 'src/components/SEO';
import superjson from 'superjson';
import AdminView from '~/components/pages/user-profile/AdminView';
import VisitorView from '~/components/pages/user-profile/VisitorView';
import { appRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';

const ProfilePage = () => {
  console.log('profile component rendered');
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const user = trpc.user.findOne.useQuery({
    username: router.query.username as string,
  });

  // useEffect(() => {
  //   console.log('use effect called - ', session?.user, user.data);
  //   if (session && !user.isLoading) {
  //     setUserProfileLoading(false); // session takes a while to load so we will show the loading screen until it is loaded
  //   }
  // }, [session]);

  if (!user.data) {
    console.log('user not found - ', user.data);
    return (
      <Container maxW="7xl" w="full" p="8rem">
        this page does not exist try searching for something else
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

export async function getServerSideProps(context: { query: any }) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson,
  });
  const { query } = context;
  const { username } = query;

  await ssg.user.findOne.prefetch({
    username: username as string,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
