import { Container } from '@chakra-ui/react';
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
