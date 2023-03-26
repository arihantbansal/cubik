import { Avatar as ChakraAvatar, Center } from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import { useSession } from 'next-auth/react';
import { BiUpArrowAlt } from 'react-icons/bi';

const ProfilePicture = ({
  onOpen,
  pfp,
}: {
  onOpen: () => void;
  pfp: string;
}) => {
  const { data: session } = useSession();
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
      {pfp.length === 0 ? (
        <Avatar
          size={84}
          name={session?.user.mainWallet as string}
          variant="marble"
          colors={[
            '#05299E',
            '#5E4AE3',
            '#947BD3',
            '#F0A7A0',
            '#F26CA7',
            '#FFFFFF',
            '#CAF0F8',
            '#CCA43B',
          ]}
        />
      ) : (
        <ChakraAvatar src={pfp} width="84px" height="84px" />
      )}
    </Center>
  );
};

export default ProfilePicture;
