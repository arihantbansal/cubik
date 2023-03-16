import { FC, ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <>{children}</>;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      {/* <Header /> */}
      <div>hello world</div>
      {children}
    </AuthProvider>
  );
};

export default AppLayout;
