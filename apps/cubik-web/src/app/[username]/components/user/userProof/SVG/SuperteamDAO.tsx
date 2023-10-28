import React from 'react';
import Image from 'next/image';
import { Center } from '@chakra-ui/react';

const SuperteamDAO = ({ size }: { size: string }) => {
  return (
    <Center width={size} height={size}>
      <Image
        src="https://res.cloudinary.com/demonicirfan/image/upload/v1687118592/Superteam_DAO_1_usaagd.png"
        alt="Superteam Logo"
        width={'300'}
        height={'300'}
      />
    </Center>
  );
};

export default SuperteamDAO;
