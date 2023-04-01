import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { Container } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SEO from 'src/components/SEO';
import AdminView from '~/components/pages/user-profile/AdminView';
import VisitorView from '~/components/pages/user-profile/VisitorView';
import { trpc } from '~/utils/trpc';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const ProfilePage = () => {
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const wallet = useWallet();

  const user = trpc.user.findOne.useQuery({
    username: router.query.username as string,
  });

  useEffect(() => {
    console.log('use effect called - ', session?.user, user.data);
    if (!session && user.isLoading) {
      setUserProfileLoading(true); // session takes a while to load so we will show the loading screen until it is loaded
    } else {
      // if both session and isLoading are completed then only show the user details
      setUserProfileLoading(false);
    }
  }, [session, wallet.publicKey]);

  if (!user.data) {
    console.log('user not found');
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
      <Container maxW="7xl" p="0" px={{ base: '2rem', md: 'none' }}>
        {session?.user.username === user.data.username ? (
          <AdminView user={user.data} isLoading={userProfileLoading} />
        ) : (
          <VisitorView user={user.data} isLoading={userProfileLoading} />
        )}
      </Container>
    </>
  );
};

export default ProfilePage;

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
