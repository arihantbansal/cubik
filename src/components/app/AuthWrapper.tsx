import { Container } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { publicKey } = useWallet();

  async function auth() {
    if (!publicKey) return;
    const signInResponse = await signIn('credentials', {
      callbackUrl: '',
      redirect: false,
      wallet: publicKey.toBase58(),
    });
    if (signInResponse?.status === 401) {
      router.push('/create-profile');
    }
    if (session && router.pathname === '/create-profile') {
      router.push({
        pathname: '/[username]',
        query: { username: session.user.username },
      });
    }
  }

  useEffect(() => {
    auth();
  }, [publicKey]);

  return (
    <Container maxW="full" p="0">
      {children}
    </Container>
  );
};

export default AuthWrapper;
