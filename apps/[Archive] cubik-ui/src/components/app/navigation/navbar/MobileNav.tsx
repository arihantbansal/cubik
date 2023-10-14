import { Box, Center, Collapse, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { SearchBar } from "~/components/common/searchbar";

export const MobileNavCollapsible = memo(function MobileNavCollapsible({
  isOpen,
  onToggle,
  onClose,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const landingPage = router.pathname === "/";

  return (
    <Collapse in={isOpen} animateOpacity>
      <Center
        display={landingPage ? "none" : "flex"}
        w="full"
        px="24px"
        pt={{ base: "16px", sm: "24px" }}
      >
        <SearchBar width={{ base: "100%", sm: "", md: "2rem", lg: "8rem" }} />
      </Center>
      <Flex
        display={{ base: "flex", lg: "none" }}
        flexDirection="column"
        alignItems="start"
        fontSize="18px"
        fontWeight={"700"}
        p="24px"
        pt="0px"
        gap={{ base: "16px", sm: "24px" }}
      >
        <Center w="full">{children}</Center>
        <Link href="/projects">
          <Box
            ps="6px"
            display="flex"
            alignItems={"start"}
            w="100%"
            onClick={() => onToggle()}
            fontSize="14px"
            fontWeight="500"
          >
            Projects
          </Box>
        </Link>
        <Link href="/grants">
          <Box
            ps="6px"
            display="flex"
            alignItems={"start"}
            w="100%"
            fontSize="14px"
            fontWeight="500"
            onClick={() => {
              onClose();
            }}
          >
            Grants
          </Box>
        </Link>
        <Link href="/hackathons">
          <Box
            ps="6px"
            display="flex"
            alignItems={"start"}
            w="100%"
            fontSize="14px"
            fontWeight="500"
            onClick={() => {
              onClose();
            }}
          >
            Hackathons
          </Box>
        </Link>
      </Flex>
    </Collapse>
  );
});
