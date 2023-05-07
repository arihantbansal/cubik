import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import SEO from 'src/components/SEO';
import superjson from 'superjson';
import AdminView from '~/components/pages/user-profile/AdminView';
import VisitorView from '~/components/pages/user-profile/VisitorView';
import { appRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';
import { createVault, getVault } from '~/utils/vault';
import * as anchor from '@coral-xyz/anchor';
import { connection } from '~/utils/program/contract';
import { sendAndConfirmTransaction } from '@solana/web3.js';

const ProfilePage = () => {
  console.log('profile component rendered');
  const { data: session } = useSession();
  const router = useRouter();
  const anchorWallet = useAnchorWallet();

  const user = trpc.user.findOne.useQuery(
    {
      username: router.query.username as string,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!user.data) {
    console.log('user not found - ', user.data);
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
