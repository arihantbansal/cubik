import { Button } from '@chakra-ui/button';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import { Avatar } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';

const UserNavMenu = () => {
  const { disconnect, disconnecting } = useWallet();
  const { data: session } = useSession();
  const router = useRouter();

  function handleSignOut() {
    disconnect();
    signOut();
  }

  if (!session?.user.id) return <>no user</>;

  return (
    <>
      <HStack gap="0.5rem">
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
            rightIcon={<BiChevronDown />}
            color="white"
            fontSize={'md'}
            //todo: set max width to prevent overflow of text
          >
            {session.user.username}
          </MenuButton>
          <MenuList bg="#121212" border="1px solid #222222">
            <HStack p="0.5rem 1rem" gap="0.5rem">
              <Avatar
                size={'sm'}
                name={session.user.username}
                src={session.user.image ? session.user.image : undefined}
              />
              <VStack
                alignItems={'start'}
                justify="center"
                w="full"
                spacing="0"
              >
                <Text fontSize="md">{session.user.username}</Text>
                <WalletAddress
                  // @ts-ignore
                  walletAddress={session.user.mainWallet}
                  size="xs"
                  copy={true}
                />
              </VStack>
            </HStack>
            <MenuDivider />
            <MenuItem
              mx="0.5rem"
              bg="transparent"
              rounded="md"
              onClick={() => {
                console.log('pushing to profile');
                router.push({
                  pathname: '/create-project',
                });
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
                router.push({
                  pathname: '/[username]',
                  query: { username: session.user.username },
                });
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
      </HStack>
    </>
  );
};

export default UserNavMenu;
