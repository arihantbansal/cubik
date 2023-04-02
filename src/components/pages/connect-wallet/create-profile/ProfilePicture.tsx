import { Avatar as ChakraAvatar, Center } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { BiUpArrowAlt } from 'react-icons/bi';

const ProfilePicture = ({
  onOpen,
  pfp,
}: {
  onOpen: () => void;
  pfp: string;
}) => {
  const { publicKey } = useWallet();
  return (
    <Center
      w="fit-content"
      transform={{ base: 'scale(0.9)', md: 'scale(1)' }}
      position="relative"
    >
      <Center
        cursor={'pointer'}
        onClick={onOpen}
        position={'absolute'}
        bottom="2px"
        right="2px"
        rounded="full"
        bg="white"
        p="0.1rem"
        zIndex={'10'}
      >
        <BiUpArrowAlt color="black" />
      </Center>
      <ChakraAvatar src={pfp} width="84px" height="84px" />
    </Center>
  );
};

export default ProfilePicture;
