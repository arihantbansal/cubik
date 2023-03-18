import { Button, Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Header } from './navigation/Header';

interface AppLayoutProps {
  children: ReactNode;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return (
    <Container maxW="full" p="0">
      {children}
    </Container>
  );
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Header>
        <Button variant="connect_wallet" h="fit-content">
          Connect Wallet
        </Button>
      </Header>
      {children}
    </AuthProvider>
  );
};

export default AppLayout;
