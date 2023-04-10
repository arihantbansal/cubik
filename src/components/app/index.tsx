import { Container } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { ConnectWalletModal } from '../pages/connect-wallet/ConnectWalletModal';
import AuthWrapper from './AuthWrapper';

import NavbarCTA from './NavbarCTA';
import { Header } from './navigation/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <AuthWrapper>
      <ConnectWalletModal />
      <Header>
        <NavbarCTA />
      </Header>
      <Container
        mt={{ base: '4.2rem', md: '5.2rem' }}
        maxW="full"
        p="0"
        h="100%"
      >
        {children}
      </Container>
    </AuthWrapper>
  );
};

export default AppLayout;
