'use client';

import React, { createContext, useContext, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export interface User {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
}

interface UserContextType {
  user: User | null;
  setUser: (userData: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { disconnect } = useWallet();

  const logout = () => {
    setUser(null);
    disconnect();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
