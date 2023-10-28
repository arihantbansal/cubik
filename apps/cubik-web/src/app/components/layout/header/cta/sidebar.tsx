import { Center, HStack, useBreakpointValue } from '@chakra-ui/react';

// import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return !isDesktop ? (
    <HStack justify="end" align="center" w="full" gap="12px">
      <Center display={{ base: 'flex', md: 'none' }} gap="12px">
        {/*  @todo  */}
        {/* <Box
          as={RxHamburgerMenu}
          boxSize={"26px"}
          color="white"
          onClick={onToggle}
        /> */}
      </Center>
    </HStack>
  ) : null;
};

export default Sidebar;
