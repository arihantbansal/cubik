import { ProjectsDetailedDescription } from "@/app/hackathons/components/ProjectDetailedDescription";
import { getDomain } from "@/utils/helpers/getDomain";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider,
  VStack,
  HStack,
  Avatar,
  Center,
  Stack,
  Button,
  Box,
  Link,
} from "@/utils/chakra";
import { ProjectVerifyStatus } from "@cubik/database";
import React from "react";

interface Props {
  projectName: string;
  project_link: string;
  projectLogo: string;
  status: ProjectVerifyStatus;
  shortDescription: string;
  id: string;
}
export const AdminProjectDetails = ({
  projectLogo,
  status,
  projectName,
  shortDescription,
  project_link,
  id,
}: Props) => {
  const ProjectOptionsMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          rounded="4px"
          aria-label="Options"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          }
        />
        <MenuList background={"#242424"} outline="none" border="none">
          <MenuItem
            isDisabled
            _hover={{
              backgroundColor: "#141414",
            }}
            _active={{
              backgroundColor: "#141414",
            }}

            // icon={<VscPreview size={22} />}
          >
            <Link href={"/project/" + id} isExternal>
              <Box as="p" textStyle={"body3"}>
                Preview
              </Box>
            </Link>
          </MenuItem>
          <MenuItem
            isDisabled
            //   icon={<AiOutlineEdit size={22} />}
          >
            <Box as="p" textStyle={"body3"}>
              Edit
            </Box>
          </MenuItem>
          <MenuItem
            isDisabled
            //    icon={<BiMessageSquareDots size={22} />}
          >
            <Box as="p" textStyle={"body3"}>
              Contact
            </Box>
          </MenuItem>
          <MenuDivider color="#00000040" />
          <MenuItem
            disabled
            isDisabled
            //   icon={<MdDeleteOutline size={22} />}
          >
            <Box as="p" textStyle={"body3"}>
              Delete Project
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <VStack p={5} gap={{ base: "32px", md: "64px" }} zIndex="9" w="full">
      <VStack align={"start"} w="full" gap="24px">
        <HStack w="full" justifyContent={"space-between"} align="top">
          <Avatar
            src={projectLogo}
            name={projectName}
            borderRadius="8px"
            width={50}
            height={50}
          />
          <Center display={{ base: "flex", md: "none" }}>
            <ProjectOptionsMenu />
          </Center>
          <Stack
            display={{ base: "none", md: "flex" }}
            direction="row"
            gap="8px"
            h="fit-content"
          >
            {status === "VERIFIED" && (
              <>
                <Button
                  variant="cubikFilled"
                  size="cubikSmall"
                  isDisabled
                  disabled
                  onClick={() => {
                    // setDrawerBodyView(drawerBodyViewEnum.GRANTS);
                  }}
                >
                  Apply For Grant
                </Button>
              </>
            )}
            <ProjectOptionsMenu />
          </Stack>
        </HStack>
        <VStack gap={{ base: "4px", md: "16px" }} w="full" align="start">
          <HStack align={"start"} w="full">
            <Box
              as="p"
              textStyle={{ base: "headline4", md: "headline3" }}
              color="neutral.11"
            >
              {projectName}
            </Box>
          </HStack>
          <Box as="p" textStyle={"body9"} color="neutral.9">
            {shortDescription}
          </Box>
        </VStack>
      </VStack>
    </VStack>
  );
};
