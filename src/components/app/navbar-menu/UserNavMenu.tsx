import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  MenuDivider,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { BiChevronDown, BiUser } from 'react-icons/bi';
import { MdPowerSettingsNew, MdUpload } from 'react-icons/md';
import { useAuthStore } from '~/store/authStore';
import ProfileDetails from './ProfileDetails';
import WalletBalance from './WalletBalance';
import { useUserStore } from '~/store/userStore';

const UserNavMenu = () => {
  const { disconnect } = useWallet();
  const { setKey } = useAuthStore();
  const { setUser } = useUserStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUserStore();
  async function handleSignOut() {
    await disconnect();
    localStorage.removeItem('anon_sig');
    localStorage.removeItem('wallet_auth');
    localStorage.removeItem('walletName');
    setUser(null);
  }

  const NavMenuButtons = () => {
    return (
      <>
        <Button
          bg="transparent"
          rounded="md"
          textStyle={'body4'}
          color="white"
          display={'flex'}
          alignItems="center"
          justifyContent={'start'}
          leftIcon={
            <Box
              as={BiUser}
              boxSize={{ base: '12px', sm: '18px', md: '20px' }}
              color={'#ADB8B6'}
            />
          }
          iconSpacing="8px"
          p={{ base: '12px', md: '8px' }}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#141414',
          }}
          _active={{
            backgroundColor: '#141414',
          }}
          as={Link}
          href={'/' + user?.username}
        >
          <Box as="p" textStyle={{ base: 'body5', md: 'body4' }}>
            Profile
          </Box>
        </Button>
        <Button
          bg="transparent"
          rounded="md"
          textStyle={'body4'}
          color="white"
          display={'flex'}
          alignItems="center"
          justifyContent={'start'}
          leftIcon={
            <Box
              as={MdUpload}
              boxSize={{ base: '12px', sm: '18px', md: '20px' }}
              color={'#ADB8B6'}
            />
          }
          iconSpacing="8px"
          p={{ base: '12px', md: '8px' }}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#141414',
          }}
          _active={{
            backgroundColor: '#141414',
          }}
          as={Link}
          href={'/submit-project'}
        >
          <Box textStyle={{ base: 'body5', md: 'body4' }}>Submit Project</Box>
        </Button>
        <Button
          bg="transparent"
          rounded="md"
          textStyle={'body4'}
          color="white"
          display={'flex'}
          alignItems="center"
          justifyContent={'start'}
          leftIcon={
            <Box
              as={MdPowerSettingsNew}
              boxSize={{ base: '12px', sm: '18px', md: '20px' }}
              color={'#ADB8B6'}
            />
          }
          p={{ base: '12px', md: '8px' }}
          onClick={handleSignOut}
          sx={{
            width: '-webkit-fill-available',
          }}
          _hover={{
            backgroundColor: '#141414',
          }}
          _active={{
            backgroundColor: '#141414',
          }}
        >
          <Box as="p" textStyle={{ base: 'body5', md: 'body4' }}>
            Disconnect Wallet
          </Box>
        </Button>
      </>
    );
  };

  return (
    <>
      <Avatar
        display={{ base: 'flex', md: 'none' }}
        as="button"
        onClick={onOpen}
        width={{ base: '30px', md: '36px' }}
        height={{ base: '30px', md: '36px' }}
        borderRadius={6}
        name={user?.username}
        src={user?.profilePicture}
      />
      <Drawer
        variant="cubik"
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <VStack gap="16px" w="full" align={'start'}>
              <ProfileDetails />
              <WalletBalance />{' '}
              <Box w="full" h="1px" backgroundColor={'#1D1F1E'} />
              <VStack gap="0px" align={'start'} w="full">
                <NavMenuButtons />
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Menu>
        <MenuButton
          display={{ base: 'none', md: 'flex' }}
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
          p="0"
          rightIcon={<BiChevronDown size={26} color="#A8F0E6" />}
        >
          <Avatar
            width={{ base: '28px', md: '36px' }}
            height={{ base: '28px', md: '36px' }}
            borderRadius={6}
            name={user?.username}
            src={user?.profilePicture}
          />
        </MenuButton>
        <MenuList
          background={'linear-gradient(322.35deg, #000000 0%, #0F0F0F 100%)'}
          border="1px solid #1D1F1E"
          gap="8px"
          display={'flex'}
          flexDir="column"
        >
          <ProfileDetails />
          <WalletBalance />
          <MenuDivider />
          <NavMenuButtons />
        </MenuList>
      </Menu>
    </>
  );
};

export default UserNavMenu;
