import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UserWalletVerificationProvider } from '~/context/UserWalletVerificationContext';
import NavbarCTA from './NavbarCTA';
import { Header } from './navigation/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Container maxW="full" p="0">
      <UserWalletVerificationProvider>
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
      </UserWalletVerificationProvider>
    </Container>
  );
};

export default AppLayout;
