import { Button } from '@chakra-ui/button';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import { Avatar as ChakraAvatar, Box, Center } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';

const UserNavMenu = () => {
  const { disconnect } = useWallet();
  const { data: session } = useSession();
  const router = useRouter();

  function handleSignOut() {
    disconnect()
      .then(() => {
        signOut();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (!session?.user.id) return <>no user</>;

  return (
    <Menu>
      <MenuButton
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
        _focus={{
          backgroundColor: 'transparent',
        }}
        as={Button}
        w={'fit-content'}
        display={{ base: 'none', md: 'flex' }}
        p="0"
        rightIcon={<BiChevronDown size={30} color="white" />}
        //todo: set max width to prevent overflow of text
      >
        <Box as="p" textStyle="body2" color="white">
          {session.user.username}
        </Box>
      </MenuButton>
      <MenuList bg="#121212" border="1px solid #222222">
        <HStack p="0.5rem 1rem" gap="0.5rem">
          <ChakraAvatar
            size={'sm'}
            name={session.user.username}
            src={session.user.profilePicture}
          />
          <VStack alignItems={'start'} justify="center" w="full" spacing="0">
            <Text fontSize="md">{session.user.username}</Text>
            <Center>
              <WalletAddress
                // @ts-ignore
                walletAddress={session.user.mainWallet}
                size="xs"
                copy={true}
              />
            </Center>
          </VStack>
        </HStack>
        <MenuDivider />
        <MenuItem
          mx="0.5rem"
          bg="transparent"
          rounded="md"
          onClick={() => {
            console.log('pushing to profile');
            router.prefetch('/submit-project');
          }}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#262626',
          }}
          _active={{
            backgroundColor: '#262626',
          }}
        >
          Create Project
        </MenuItem>
        <MenuItem
          mx="0.5rem"
          bg="transparent"
          rounded="md"
          onClick={() => {
            console.log('pushing to profile');
            router.prefetch(`/${session.user.username}`);
          }}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#262626',
          }}
          _active={{
            backgroundColor: '#262626',
          }}
        >
          View Profile
        </MenuItem>
        <MenuItem
          mx="0.5rem"
          bg="transparent"
          rounded="md"
          onClick={() => {
            router.prefetch('/projects');
          }}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#262626',
          }}
          _active={{
            backgroundColor: '#262626',
          }}
        >
          Projects
        </MenuItem>
        <MenuItem
          mx="0.5rem"
          bg="transparent"
          rounded="md"
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#262626',
          }}
          _active={{
            backgroundColor: '#262626',
          }}
        >
          Funding Rounds
        </MenuItem>
        <MenuItem
          mx="0.5rem"
          bg="transparent"
          rounded="md"
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#262626',
          }}
          _active={{
            backgroundColor: '#262626',
          }}
          as="button"
          onClick={handleSignOut}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserNavMenu;
