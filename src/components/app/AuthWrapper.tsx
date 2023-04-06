import { Container } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

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
      console.log('now redirect to create-profile which is prefetched');
      router.push('/create-profile'); //todo: add prefetching here to make it faster ( prefetching does not work in development server )
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
