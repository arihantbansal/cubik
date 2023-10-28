import Image from 'next/image';
import { Center } from '@chakra-ui/react';

const GranteeLogo = ({ size }: { size: string }) => {
  return (
    <Center width={size} height={size}>
      <Image
        src="https://res.cloudinary.com/demonicirfan/image/upload/v1687306092/Grantee_1_k6ugiy.png"
        alt="Twitter Logo"
        width={'300'}
        height={'300'}
      />
    </Center>
  );
};

export default GranteeLogo;
