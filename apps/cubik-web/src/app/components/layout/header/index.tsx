'use client';

import React, { useEffect } from 'react';
import { useUser } from '@/app/context/user';
import { Container, Flex, HStack } from '@/utils/chakra';

import Logo from '../../common/logo';
import { WalletConnect } from './auth/handleConnect';
import Links from './links';

const Header = () => {
  const { setUser } = useUser();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userRes = await fetch('/api/auth/decode', {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const dataRes = await userRes.json();
        const user = dataRes.data;
        if (dataRes.data) {
          setUser({
            id: user.id,
            mainWallet: user.mainWallet,
            profilePicture: user.profilePicture,
            username: user.username,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  return (
    <>
      <div
        style={{
          backdropFilter: 'blur(18px)',
          margin: '0px !important',
          marginTop: '0px !important',
        }}
        className="fixed left-0 top-0 z-10  min-h-[3.6rem] w-screen max-w-full border-b border-[var(--color-bg-tertiary)] bg-transparent  py-6"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between lg:max-w-6xl xl:max-w-screen-2xl">
          <div className='flex items-center justify-start gap-10'>
            <Logo/>
            <Links/>
          </div>
          <WalletConnect />
        </div>
      </div>
    </>
  );
};

export default Header;
