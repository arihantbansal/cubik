import { Container } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Container maxW="full" p="0">
      {children}
    </Container>
  );
};

export default AuthWrapper;
