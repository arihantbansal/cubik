import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from 'next-auth/react';

const AdminWallet = ['52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ'];

const AdminControls = () => {
  const { data } = useSession();
  const { publicKey, connected } = useWallet();

  if (!connected) {
    return null;
  }

  if (
    !data?.user.mainWallet ||
    data?.user.mainWallet !== publicKey?.toBase58()
  ) {
    return null;
  }

  if (!AdminWallet.includes(publicKey?.toBase58() as string)) {
    return null;
  }

  return (
    <Flex
      mb="40px"
      zIndex="99"
      justify={'space-between'}
      flexDirection={{ base: 'column', sm: 'row' }}
      padding={{ base: '10px 16px', md: '24px' }}
      w="full"
      align={{ base: 'start', sm: 'center' }}
      gap="8px"
      border="1px solid"
      borderRadius={'8px'}
      borderColor="#1C7CEB22"
      backgroundColor={'#1C7CEB08'}
    >
      <Box
        as="p"
        noOfLines={{ base: 2, md: 1 }}
        whiteSpace={{ base: 'normal', md: 'nowrap' }}
        textStyle={{ base: 'body6', md: 'body5' }}
        color="surface.blue.1"
      >
        You have the access to manage Projects
      </Box>
      <HStack w="fit-content" rounded="full" p="6px 10px" bg="#1C7CEB">
        <Box
          as="p"
          cursor={'pointer'}
          noOfLines={1}
          whiteSpace={'nowrap'}
          textStyle={{ base: 'body6', md: 'body5' }}
          color="white"
        >
          <Link href={`/projects/admin?pubKey=${publicKey?.toBase58()}`}>
            Manage Projects
          </Link>
        </Box>{' '}
      </HStack>
    </Flex>
  );
};

export default AdminControls;
