import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AuthWrapper } from '~/context/authWrapper';
import NavbarCTA from './NavbarCTA';
import { Header } from './navigation/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const mtValue =
    typeof window !== 'undefined' &&
    window.location.pathname.split('/')[1] === 'hackathons'
      ? '0'
      : { base: '4.2rem', md: '5.2rem' };

  return (
    <Container maxW="full" p="0">
      <AuthWrapper>
        <Header>
          <NavbarCTA />
        </Header>
        <Container mt={mtValue} maxW="full" p="0" h="100%">
          {children}
        </Container>
      </AuthWrapper>
    </Container>
  );
};

export default AppLayout;
