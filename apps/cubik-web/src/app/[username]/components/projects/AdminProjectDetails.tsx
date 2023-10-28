import React from 'react';
import ThreeDots from '@/theme/icons/three_dots.svg';
import {
  Avatar,
  Box,
  Center,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  VStack,
} from '@/utils/chakra';
import { getDomain } from '@/utils/helpers/getDomain';

import type { ProjectVerifyStatus } from '@cubik/database';

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
  projectName,
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
          zIndex={0}
          icon={
            <Center width="18px" height="18px">
              <ThreeDots />
            </Center>
          }
        />
        <MenuList
          zIndex={2}
          background={'#242424'}
          outline="none"
          border="none"
        >
          <Link href={'/project/' + id} isExternal>
            <MenuItem

            // icon={<VscPreview size={22} />}
            >
              <Box as="p" textStyle={'body3'}>
                Preview
              </Box>
            </MenuItem>
          </Link>
          <Link href={'/edit/project/' + id}>
            <MenuItem
            //   icon={<AiOutlineEdit size={22} />}
            >
              <Box as="p" textStyle={'body3'}>
                Edit
              </Box>
            </MenuItem>
          </Link>
          <MenuItem
            isDisabled
            //    icon={<BiMessageSquareDots size={22} />}
          >
            <Box as="p" textStyle={'body3'}>
              Contact
            </Box>
          </MenuItem>
          <MenuDivider color="#00000040" />
          <MenuItem disabled isDisabled>
            <Box as="p" textStyle={'body3'}>
              Delete Project
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <VStack p={5} gap={{ base: '32px', md: '64px' }} zIndex="9" w="full">
      <Stack direction={{ base: 'column', sm: 'row' }} w="full">
        <Stack
          w="full"
          direction="row"
          gap={{ base: '8px', sm: '12px', md: '16px' }}
        >
          <Avatar
            src={projectLogo}
            name={projectName}
            borderRadius={'8px'}
            width={{ base: '42px', sm: '48px', md: '52px' }}
            height={{ base: '42px', sm: '48px', md: '52px' }}
          />
          <VStack
            alignItems={'start'}
            align={'center'}
            justify="center"
            spacing={{ base: '2px', sm: '4px', md: '6px' }}
          >
            <Box
              as="p"
              textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
              noOfLines={1}
              textAlign="left"
              color="white"
            >
              {projectName}
            </Box>
            <Center color="neutral.8">
              <Box as="p" textStyle={{ base: 'title6', md: 'title5' }}>
                {getDomain(project_link)}
              </Box>
            </Center>
          </VStack>
        </Stack>
        <ProjectOptionsMenu />;
      </Stack>
    </VStack>
  );
};
