import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  ProjectJoinRoundStatus,
  ProjectsModel,
  ProjectVerifyStatus,
} from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai';
import { BiMessageSquareDots } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { VscPreview } from 'react-icons/vsc';
import GetFormattedLink from '~/components/HOC/GetLink';
import { ProjectWithRoundDetailsType } from '~/types/project';
import { getDomain } from '~/utils/getDomain';
import { ProjectStatus } from '~/utils/getProjectStatus';
import { ProjectSocials } from '../../projects/project-details/project-interactions/ProjectInteractions';
import { ProjectsDetailedDescription } from '../../projects/project-details/ProjectDetailedDescription';
import { ProjectLink } from '../../projects/project-details/ProjectDetailsHeader';
import ApplyForGrant from './project-admin-dashboard/ProjectAdminDetailsDrawer/ApplyForGrant';
import EditProjectDetails from './project-admin-dashboard/ProjectAdminDetailsDrawer/EditProjectDetails';
import ProjectStatusBanner from './ProjectStatusBanner';

export enum drawerBodyViewEnum {
  PROJECT_DETAILS = 'project_details',
  GRANTS = 'apply_for_grant',
  EDIT = 'edit',
  PREVIEW = 'preview',
}

export const ProjectHeaderVisitorView = ({
  project,
}: {
  project: ProjectsModel;
}) => {
  const router = useRouter();
  const btnRef = useRef();
  const headerSpacing = {
    base: '16px',
    sm: '20px',
    md: '24px',
  };

  return (
    <>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        px={headerSpacing}
        gap={headerSpacing}
        w="full"
      >
        <Stack
          w="full"
          direction="row"
          gap={{ base: '8px', sm: '12px', md: '16px' }}
        >
          <Center>
            <Avatar
              src={project.logo}
              name={project.name}
              width={{ base: '36px', sm: '48px', md: '52px' }}
              height={{ base: '36px', sm: '48px', md: '52px' }}
            />
          </Center>
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
              {project.name}
            </Box>
            <GetFormattedLink link={project.project_link} />
          </VStack>
        </Stack>
        <Center justifyContent={'end'}>
          <Button
            variant={'project_button_secondary'}
            //@ts-ignore
            ref={btnRef}
            onClick={() =>
              router.push({
                pathname: `/projects/${project.id}`,
              })
            }
            w="full"
            maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
          >
            View Project
          </Button>
        </Center>
      </Stack>
    </>
  );
};

const ProjectDetails = ({
  project,
  setDrawerBodyView,
}: {
  project: ProjectWithRoundDetailsType;
  setDrawerBodyView: any;
}) => {
  const [showApplyToRound, setShowApplyToRound] = useState(false);

  useEffect(() => {
    if (project.status === ProjectVerifyStatus.VERIFIED) {
      setShowApplyToRound(true);
    }
    if (
      ProjectStatus({ projectData: project as ProjectWithRoundDetailsType })
        ?.round?.status === ProjectJoinRoundStatus.APPROVED ||
      ProjectJoinRoundStatus.PENDING
    ) {
      setShowApplyToRound(false);
    } else {
      setShowApplyToRound(false);
    }
  }, [project.status]);

  const ProjectOptionsMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          rounded="4px"
          aria-label="Options"
          icon={<AiOutlineMore size={38} />}
        />
        <MenuList background={'#242424'} outline="none" border="none">
          <MenuItem
            isDisabled
            _hover={{
              backgroundColor: '#141414',
            }}
            _active={{
              backgroundColor: '#141414',
            }}
            icon={<VscPreview size={22} />}
          >
            <Box as="p" textStyle={'body3'}>
              Preview
            </Box>
          </MenuItem>
          <MenuItem isDisabled icon={<AiOutlineEdit size={22} />}>
            <Box as="p" textStyle={'body3'}>
              Edit
            </Box>
          </MenuItem>
          <MenuItem isDisabled icon={<BiMessageSquareDots size={22} />}>
            <Box as="p" textStyle={'body3'}>
              Contact
            </Box>
          </MenuItem>
          <MenuDivider color="#00000040" />
          <MenuItem icon={<MdDeleteOutline size={22} />}>
            <Box as="p" textStyle={'body3'}>
              Delete Project
            </Box>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <VStack
      padding={{
        base: '100px 20px 20px 20px',
        sm: '80px 20px 20px 20px',
        md: '80px 40px 40px 40px',
      }}
      gap={{ base: '32px', md: '64px' }}
      w="full"
    >
      <VStack align={'start'} w="full" gap="24px">
        <HStack w="full" justifyContent={'space-between'} align="top">
          <Avatar
            src={project.logo}
            name={project.name}
            borderRadius="8px"
            width={{ base: '80px', md: '102px' }}
            height={{ base: '80px', md: '102px' }}
          />
          <Center display={{ base: 'flex', md: 'none' }}>
            <ProjectOptionsMenu />
          </Center>
          <Stack
            display={{ base: 'none', md: 'flex' }}
            direction="row"
            gap="8px"
            h="fit-content"
          >
            <Button
              variant="apply_for_grant"
              isDisabled={!showApplyToRound}
              onClick={() => {
                setDrawerBodyView(drawerBodyViewEnum.GRANTS);
              }}
            >
              Apply For Grant
            </Button>
            <ProjectOptionsMenu />
          </Stack>
        </HStack>
        <VStack gap={{ base: '4px', md: '16px' }} w="full" align="start">
          <HStack align={'start'} w="full">
            <Box
              as="p"
              textStyle={{ base: 'headline4', md: 'headline3' }}
              color="neutral.11"
            >
              {project.name}
            </Box>
          </HStack>
          <Box as="p" textStyle={'body9'} color="neutral.9">
            {project.short_description}
          </Box>
          <HStack w="full">
            <HStack w="full">
              <Button
                variant="unstyled"
                display={'flex'}
                alignItems="center"
                rounded="full"
                color="brand.teal6"
                backgroundColor="brand.teal2"
                p={{ base: '0.5rem 0.8rem', md: '0.4rem 1rem' }}
                iconSpacing={{ base: '0.3rem', md: '0.4rem' }}
                leftIcon={<ProjectLink urlName={'url'} />}
                _hover={{
                  backgroundColor: 'brand.teal3',
                }}
                as="a"
                href={project.project_link}
                target="_blank"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="brand.teal.6"
                  pb="0.1rem"
                >
                  {getDomain(project.project_link)}
                </Box>
              </Button>
              <ProjectSocials hideTitle={true} projectDetails={project} />
            </HStack>
          </HStack>
        </VStack>
      </VStack>
      <Stack
        display={{ base: 'flex', md: 'none' }}
        direction={'row'}
        w="full"
        h="fit-content"
      >
        <Button
          variant="connect_wallet"
          width={'full'}
          isDisabled={!showApplyToRound}
          onClick={() => {
            setDrawerBodyView(drawerBodyViewEnum.GRANTS);
          }}
        >
          Apply For Grant
        </Button>
      </Stack>
      <Center>
        <ProjectsDetailedDescription
          description={project.long_description}
          maxH="full"
          overflow={'scroll'}
        />
      </Center>
    </VStack>
  );
};

const ProjectHeader = ({
  activeProject,
  project,
}: {
  activeProject?: string;
  project: ProjectWithRoundDetailsType;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerBodyView, setDrawerBodyView] = useState<drawerBodyViewEnum>(
    drawerBodyViewEnum.PROJECT_DETAILS
  );
  const { data } = useSession();
  const router = useRouter();
  const btnRef = useRef();
  const headerSpacing = {
    base: '16px',
    sm: '20px',
    md: '24px',
  };

  useEffect(() => {
    if (activeProject === project.id) {
      onOpen();
    } else {
      console.log('this project is not active');
    }
  }, [activeProject]);

  return (
    <>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        px={headerSpacing}
        gap={headerSpacing}
        w="full"
      >
        <Stack
          w="full"
          direction="row"
          gap={{ base: '8px', sm: '12px', md: '16px' }}
        >
          <Center>
            <Avatar
              src={project.logo}
              name={project.name}
              width={{ base: '36px', sm: '48px', md: '52px' }}
              height={{ base: '36px', sm: '48px', md: '52px' }}
            />
          </Center>
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
              {project.name}
            </Box>
            <GetFormattedLink link={project.project_link} />
          </VStack>
        </Stack>
        <Center justifyContent={'end'}>
          <Link
            href={`/${data?.user.username}/?project=${project.id}`}
            style={{
              color: '#A8F0E6',
              backgroundColor: 'transparent',
              height: 'full',
              width: 'full',
              padding: '14px 44px 14px 44px',
              border: '1px solid #A8F0E6',
              fontSize: '15px',
              whiteSpace: 'nowrap',
              fontWeight: '600',
              lineHeight: '22px',
              borderRadius: '12px',
              transition: 'all 0.6s',
            }}
          >
            View Details
          </Link>
        </Center>
        <Drawer
          w="fit-content"
          maxW="40rem"
          isOpen={isOpen}
          placement="bottom"
          onClose={() => {
            setDrawerBodyView(drawerBodyViewEnum.PROJECT_DETAILS);
            onClose();
          }}
          //@ts-ignore
          finalFocusRef={btnRef}
        >
          <DrawerOverlay
            color="rgba(0, 0, 0, 0.72)"
            backdropFilter="blur(8px)"
          />
          <DrawerContent
            // border="1px solid #1D1F1E !important"
            borderColor={'#1D1F1E'}
            borderBottom={'none'}
            borderTopRadius={'24px'}
            background="#080808"
            maxW="80rem !important"
            mx="auto"
            p="0"
          >
            <DrawerCloseButton
              transform={'translateY(-3rem)'}
              rounded="full"
              backgroundColor="#141414"
              onClick={() => {
                // router.replace(`/${data?.user.username}`, undefined, {
                //   shallow: true,
                // });
              }}
            />

            <DrawerBody maxH={'90vh'} p="0">
              {drawerBodyView === drawerBodyViewEnum.GRANTS ? (
                <ApplyForGrant
                  setDrawerBodyView={setDrawerBodyView}
                  project={project}
                />
              ) : drawerBodyView === drawerBodyViewEnum.EDIT ? (
                <EditProjectDetails />
              ) : drawerBodyView === drawerBodyViewEnum.PREVIEW ? (
                <></>
              ) : (
                <>
                  <Center w="full" position="fixed" zIndex="100">
                    <ProjectStatusBanner
                      status={
                        ProjectStatus({
                          projectData: project as ProjectWithRoundDetailsType,
                        })?.status as string
                      }
                      roundName={
                        ProjectStatus({
                          projectData: project as ProjectWithRoundDetailsType,
                        })?.round
                          ? ProjectStatus({
                              projectData:
                                project as ProjectWithRoundDetailsType,
                            })?.round?.fundingRound.roundName
                          : undefined
                      }
                    />
                  </Center>
                  <ProjectDetails
                    project={project}
                    setDrawerBodyView={setDrawerBodyView}
                  />
                </>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </>
  );
};

export default ProjectHeader;
