import Link from 'next/link';
import Username from '@/app/components/common/username';
import { WalletAddress } from '@/app/components/common/wallet';
import { useUser } from '@/app/context/user';
import ChevronDown from '@/theme/icons/chevron_down.svg';
import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Skeleton,
  useDisclosure,
  VStack,
} from '@/utils/chakra';
import { handleLogout } from '@/utils/helpers/auth';

import { WalletBalance } from './WalletBalance';

const ProfileDetails = () => {
  const { user } = useUser();
  return (
    <HStack p="8px" rounded="8px" gap="12px">
      <Skeleton
        fadeDuration={2}
        isLoaded={!!user?.profilePicture}
        width="40px"
        height="40px"
        borderRadius="8px"
      >
        <Avatar
          width="40px"
          height="40px"
          // borderRadius={6}
          name={user?.username as string}
          src={user?.profilePicture as string}
        />
      </Skeleton>
      <VStack alignItems={'start'} justify="center" w="full" spacing="6px">
        <Username
          isLoading={!user?.username}
          username={user?.username}
          size="sm"
        />
        <Center>
          <WalletAddress
            // @ts-ignore
            walletAddress={user?.mainWallet}
            size="xs"
          />
        </Center>
      </VStack>
    </HStack>
  );
};

const UserNavbarMenuButton = () => {
  const { logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser();
  async function handleSignOut() {
    await handleLogout();
    logout();
  }

  const NavMenuButtons = () => {
    return (
      <>
        <Skeleton
          opacity={!user?.username ? 0.5 : 1}
          fadeDuration={2.5}
          isLoaded={!!user?.username}
          w="full"
        >
          <Link href={'/' + user?.username}>
            <Button
              isDisabled
              disabled
              as={Button}
              bg="transparent"
              w="full"
              rounded="md"
              textStyle={'body4'}
              color="white"
              display={'flex'}
              alignItems="center"
              justifyContent={'start'}
              // leftIcon={
              //   {
              //     /*  @todo  */
              //   }
              //   // <Box
              //   //   as={BiUser}
              //   //   boxSize={{ base: "16px", sm: "18px", md: "20px" }}
              //   //   color={"#ADB8B6"}
              //   // />
              // }
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
            >
              <Box as="p" textStyle={{ base: 'body5', md: 'body4' }}>
                Profile
              </Box>
            </Button>
          </Link>
        </Skeleton>
        <Skeleton
          w="full"
          opacity={!user?.username ? 0.3 : 1}
          fadeDuration={2.5}
          isLoaded={!!user?.username}
        >
          <Link href={'/create/project'}>
            <Box
              as={Button}
              bg="transparent"
              rounded="md"
              w="full"
              textStyle={'body4'}
              color="white"
              display={'flex'}
              alignItems="center"
              justifyContent={'start'}
              // leftIcon={
              //   <Box
              //     as={MdUpload}
              //     boxSize={{ base: "16px", sm: "18px", md: "20px" }}
              //     color={"#ADB8B6"}
              //   />
              // }
              //   @todo
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
            >
              <Box textStyle={{ base: 'body5', md: 'body4' }}>
                Create new Project
              </Box>
            </Box>
          </Link>
        </Skeleton>
        <Skeleton
          w="full"
          opacity={!user?.username ? 0.1 : 1}
          fadeDuration={2.5}
          isLoaded={!!user?.username}
        >
          <Button
            bg="transparent"
            rounded="md"
            w="full"
            textStyle={'body4'}
            color="white"
            display={'flex'}
            alignItems="center"
            justifyContent={'start'}
            // leftIcon={
            //   <Box
            //     as={MdPowerSettingsNew}
            //     boxSize={{ base: "16px", sm: "18px", md: "20px" }}
            //     color={"#ADB8B6"}
            //   />
            // }
            //   @todo
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
        </Skeleton>
      </>
    );
  };

  return (
    <>
      <Skeleton
        fadeDuration={1.5}
        isLoaded={!!user?.profilePicture}
        width={{ base: '30px', md: '36px' }}
        height={{ base: '30px', md: '36px' }}
        display={{ base: 'flex', md: 'none' }}
        borderRadius="8px"
      >
        <Avatar
          as="button"
          onClick={onOpen}
          width={{ base: '30px', md: '36px' }}
          height={{ base: '30px', md: '36px' }}
          name={user?.username as string}
          src={user?.profilePicture as string}
        />
      </Skeleton>
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
              <WalletBalance />
              <Box w="full" h="1px" backgroundColor={'#1D1F1E'} />
              <VStack spacing="0px" align={'start'} w="full">
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
          rightIcon={
            <Center
              width={{ base: '18px', md: '20px' }}
              height={{ base: '18px', md: '20px' }}
              color="#FFF"
            >
              <ChevronDown size={26} />
            </Center>
          }
        >
          <Skeleton
            fadeDuration={2.5}
            isLoaded={!!user?.profilePicture}
            width={{ base: '28px', md: '40px' }}
            height={{ base: '28px', md: '40px' }}
            borderRadius="8px"
          >
            <Avatar
              width={{ base: '28px', md: '40px' }}
              height={{ base: '28px', md: '40px' }}
              name={user?.username as string}
              src={user?.profilePicture as string}
            />
          </Skeleton>
        </MenuButton>
        <MenuList
          background={'linear-gradient(322.35deg, #000000 0%, #0F0F0F 100%)'}
          border="1px solid #1D1F1E"
          gap="8px"
          display={'flex'}
          flexDir="column"
        >
          <ProfileDetails />
          <Skeleton
            opacity={!user?.profilePicture ? 0.6 : 1}
            fadeDuration={2}
            isLoaded={!!user?.profilePicture}
            width={'full'}
            height={!user?.profilePicture ? '3rem' : 'auto'}
            borderRadius="8px"
          >
            <WalletBalance />
          </Skeleton>
          <MenuDivider />
          <NavMenuButtons />
        </MenuList>
      </Menu>
    </>
  );
};

export default UserNavbarMenuButton;
