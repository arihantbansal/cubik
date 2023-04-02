import { Container, useDisclosure } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import ConnectWalletModal from '../pages/connect-wallet/ConnectWalletModal';
import AuthWrapper from './AuthWrapper';

import NavbarCTA from './NavbarCTA';
import { Header } from './navigation/Header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <AuthWrapper>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      <Header>
        <NavbarCTA onOpen={onOpen} />
      </Header>
      <Container my="5.2rem" maxW="full" p="0" h="100%">
        {children}
      </Container>
    </AuthWrapper>
  );
};

export default AppLayout;
