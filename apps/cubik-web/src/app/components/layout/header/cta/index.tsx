'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@/app/context/user';
import { Center } from '@/utils/chakra';

import ConnectWallet from './connect-wallet';
import Sidebar from './sidebar';
import UserNavbarMenuButton from './user-navbar-menu';

export interface User {
  username: string;
  profilePicture: string;
  mainWallet: string;
}

const CTA = () => {
  const { user } = useUser();

  const path = usePathname();
  const isCreateProfilePage = path === '/create/profile';

  return (
    <Center
      h={{ base: '2rem', md: '2.6rem' }}
      justifyContent="flex-end"
      alignItems="end"
      w="max"
      zIndex="99"
    >
      <Center w="fit-content">
        {!isCreateProfilePage && (
          <>{!user ? <ConnectWallet /> : <UserNavbarMenuButton />} </>
        )}
      </Center>
      <Sidebar />
    </Center>
  );
};

export default CTA;
