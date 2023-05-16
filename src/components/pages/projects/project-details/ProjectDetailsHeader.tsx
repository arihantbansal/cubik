import {
  Avatar,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import {
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { HiLink } from 'react-icons/hi';
import { MdReportGmailerrorred } from 'react-icons/md';
import CustomTag from '~/components/common/tags/CustomTag';
import { ProjectWithRoundDetailsWithOwnerWithTeamType } from '~/types/project';
import { ProjectDetailSkeleton } from './skeletons/ProjectPageLoadingSkeleton';

export const ProjectLink = ({ urlName }: { urlName: string }) => {
  switch (urlName) {
    case 'url':
      return <HiLink color="#E0FFFD" size={18} />;
    case 'twitter':
      return <FaTwitter color="#E0FFFD" size={18} />;
    case 'discord':
      return <FaDiscord color="#E0FFFD" size={18} />;
    case 'telegram':
      return <FaTelegramPlane color="#E0FFFD" size={18} />;
    case 'youtube':
      return <FaYoutube color="#E0FFFD" size={18} />;
    case 'github':
      return <FaGithub color="#E0FFFD" size={18} />;
    default:
      return <></>;
  }
};

const ProjectDetailsHeader = ({
  isLoading,
  projectDetails,
}: {
  isLoading?: boolean;
  projectDetails: ProjectWithRoundDetailsWithOwnerWithTeamType;
}) => {
  return isLoading ? (
    <ProjectDetailSkeleton />
  ) : (
    <Stack
      direction={{ base: 'row', md: 'row' }}
      gap={{ base: '8px', md: '24px' }}
      width={'100%'}
      alignItems={'center'}
    >
      <Avatar
        src={projectDetails?.logo}
        width={{ base: '4.4rem', md: '6.2rem' }}
        height={{ base: '4.4rem', md: '6.2rem' }}
      />
      <VStack
        justify={'center'}
        gap={{ base: '2px', md: '14px' }}
        alignItems={'start'}
        justifyContent="center"
      >
        <Stack spacing={{ base: '12px', md: '24px' }} direction={'row'}>
          <HStack align="center">
            <Box
              as="p"
              textStyle={{ base: 'title1', md: 'headline3' }}
              textTransform="capitalize"
              color="neutral.11"
              noOfLines={1}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {projectDetails?.name}
            </Box>
            <Menu>
              <MenuButton
                w="4px !important"
                display="flex"
                marginInline={'0px'}
                alignContent={'center'}
                justifyContent={'center'}
                m="0 !important"
                as={Button}
                variant="unstyled"
                rightIcon={<BiChevronDown size={26} color="white" />}
              />
              <MenuList p="0" outline="0" border="0">
                <MenuItem
                  p="8px 16px"
                  color="surface.yellow.2"
                  rounded="4px"
                  icon={
                    <MdReportGmailerrorred color="surface.yellow.2" size={22} />
                  }
                >
                  Report
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <HStack
            overflow={'hidden'}
            flexDirection={'row'}
            align="center"
            spacing="0.4rem"
            pt="0.5rem"
            display={{ base: 'none', md: 'flex' }}
          >
            {JSON.parse(projectDetails.industry)?.map(
              (tag: any, key: React.Key | null | undefined) => {
                return (
                  <CustomTag color={tag.label} key={key}>
                    {tag.label}
                  </CustomTag>
                );
              }
            )}
          </HStack>
        </Stack>
        <Box
          as="p"
          textStyle={{ base: 'body4', md: 'body2' }}
          color="neutral.9"
          noOfLines={2}
          textOverflow="ellipsis"
        >
          {projectDetails?.short_description}
        </Box>
        {/* <HStack>
          <Button
            variant="unstyled"
            display={'flex'}
            alignItems="center"
            rounded="full"
            color="brand.teal6"
            backgroundColor="brand.teal2"
            p={{ base: '0.5rem 0.8rem', md: '0.2rem 1rem' }}
            iconSpacing={{ base: '0.3rem', md: '0.4rem' }}
            leftIcon={<ProjectLink urlName={'url'} />}
            _hover={{
              backgroundColor: 'brand.teal3',
            }}
            as="a"
            href={projectDetails?.project_link}
            target="_blank"
          >
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="brand.teal.6"
              pb="0.1rem"
            >
              {getDomain(projectDetails?.project_link)}
            </Box>
          </Button>

          {socials.map((link: { name: string; url: string }, key: Key) => (
            <IconButton
              aria-label={link.name}
              variant={'unstyled'}
              fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
              display="flex"
              alignItems={'center'}
              rounded="full"
              color="brand.teal6"
              backgroundColor="brand.teal2"
              key={key}
              icon={<ProjectLink urlName={link.name} />}
              _hover={{
                backgroundColor: 'brand.teal3',
              }}
              as="a"
              href={link.name}
              target="_blank"
            />
          ))}
        </HStack> */}
      </VStack>
    </Stack>
  );
};

export default ProjectDetailsHeader;
