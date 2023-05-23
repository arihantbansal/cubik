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
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ProjectJoinRoundStatus,
  ProjectVerifyStatus,
  ProjectsModel,
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
import { projectWithFundingRoundType } from '~/types/project';
import { getDomain } from '~/utils/getDomain';
import { ProjectStatus } from '~/utils/getProjectStatus';
import { ProjectsDetailedDescription } from '../../projects/project-details/ProjectDetailedDescription';
import { ProjectLink } from '../../projects/project-details/ProjectDetailsHeader';
import { ProjectSocials } from '../../projects/project-details/project-interactions/ProjectInteractions';
import ProjectStatusBanner from './ProjectStatusBanner';
import ApplyForGrant from './project-admin-dashboard/ProjectAdminDetailsDrawer/ApplyForGrant';
import EditProjectDetails from './project-admin-dashboard/ProjectAdminDetailsDrawer/EditProjectDetails';

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
              background="neutral.6"
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
            variant={'cubikFilled'}
            as={Link}
            //@ts-ignore
            ref={btnRef}
            href={`/projects/${project.id}`}
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
  isLoading,
  project,
  setDrawerBodyView,
}: {
  isLoading: boolean;
  project: projectWithFundingRoundType;
  setDrawerBodyView: any;
}) => {
  const [showApplyToRound, setShowApplyToRound] = useState(false);

  useEffect(() => {
    console.log('project.status check');
    if (project.status === ProjectVerifyStatus.VERIFIED) {
      console.log('project is verified so show ApplyRound to true');
      if (
        ProjectStatus({ projectData: project as projectWithFundingRoundType })
          ?.round?.status === ProjectJoinRoundStatus.APPROVED
      ) {
        return setShowApplyToRound(false); // project is approved ina a round so don't show apply to round
      } else if (
        ProjectStatus({ projectData: project as projectWithFundingRoundType })
          ?.round?.status === ProjectJoinRoundStatus.REJECTED
      ) {
        return setShowApplyToRound(true); // project is rejected so show apply to round
      } else if (
        ProjectStatus({ projectData: project as projectWithFundingRoundType })
          ?.round?.status === ProjectJoinRoundStatus.PENDING
      ) {
        return setShowApplyToRound(false); // project is rejected so show apply to round
      }
      return setShowApplyToRound(true);
    } else {
      setShowApplyToRound(false);
    }
  }, [project?.status]);

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
      zIndex="9"
      w="full"
    >
      <VStack align={'start'} w="full" gap="24px">
        <HStack w="full" justifyContent={'space-between'} align="top">
          <Avatar
            src={project?.logo}
            name={project?.name}
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
              variant="cubikFilled"
              size="cubikSmall"
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
              {project?.name}
            </Box>
          </HStack>
          <Box as="p" textStyle={'body9'} color="neutral.9">
            {project?.short_description}
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
                href={project?.project_link}
                target="_blank"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="brand.teal.6"
                  pb="0.1rem"
                >
                  {getDomain(project?.project_link)}
                </Box>
              </Button>
              <ProjectSocials
                isLoading={isLoading}
                hideTitle={true}
                projectDetails={project}
              />
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
          variant="cubikFilled"
          size={'cubikSmall'}
          width={'full'}
          isDisabled={showApplyToRound}
          onClick={() => {
            setDrawerBodyView(drawerBodyViewEnum.GRANTS);
          }}
        >
          Apply For Grant
        </Button>
      </Stack>
      <Center>
        <ProjectsDetailedDescription
          description={project?.long_description}
          maxH="full"
          overflow={'scroll'}
          isLoading={false}
        />
      </Center>
    </VStack>
  );
};

const ProjectHeader = ({
  isLoading,
  activeProject,
  project,
}: {
  isLoading: boolean;
  activeProject?: string;
  project: projectWithFundingRoundType | null | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerBodyView, setDrawerBodyView] = useState<drawerBodyViewEnum>(
    drawerBodyViewEnum.PROJECT_DETAILS
  );
  const { data } = useSession();
  const btnRef = useRef();
  const headerSpacing = {
    base: '16px',
    sm: '20px',
    md: '24px',
  };
  let isLoding = true;
  useEffect(() => {
    if (activeProject === project?.id) {
      onOpen();
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
          <SkeletonCircle
            isLoaded={!isLoading}
            fadeDuration={2}
            opacity={isLoading ? '0.5' : '1'}
            width={{ base: '36px', sm: '48px', md: '60px' }}
            height={{ base: '36px', sm: '48px', md: '60px' }}
          >
            <Center>
              <Avatar
                src={project?.logo}
                name={project?.name}
                width={{ base: '36px', sm: '48px', md: '52px' }}
                height={{ base: '36px', sm: '48px', md: '52px' }}
              />
            </Center>{' '}
          </SkeletonCircle>
          <VStack
            alignItems={'start'}
            align={'center'}
            justify="center"
            spacing={{ base: '2px', sm: '4px', md: '6px' }}
          >
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={3}
              opacity={isLoading ? '0.5' : '1'}
              w={'8rem'}
            >
              <Box
                as="p"
                textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {project?.name}
              </Box>
            </Skeleton>
            {isLoading ? (
              <Skeleton w="8rem" h="1rem" opacity={0.4} />
            ) : (
              <GetFormattedLink
                isLoading={isLoading}
                link={project?.project_link}
              />
            )}
          </VStack>
        </Stack>
        {project && (
          <>
            <Center justifyContent={'end'}>
              <Skeleton
                isLoaded={!isLoading}
                fadeDuration={3}
                opacity={isLoading ? '0.3' : '1'}
              >
                <Button
                  variant={'cubikOutlined'}
                  size="cubikMedium"
                  as={Link}
                  href={`/${data?.user.username}/?project=${project?.id}`}
                >
                  View Details
                </Button>
              </Skeleton>
            </Center>
            <Drawer
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
                      <Center
                        background="#0C0D0D"
                        w="full"
                        position="fixed"
                        borderTopRadius={'24px'}
                      >
                        <ProjectStatusBanner
                          startTime={
                            ProjectStatus({
                              projectData:
                                project as projectWithFundingRoundType,
                            })?.startTime
                          }
                          endtime={
                            ProjectStatus({
                              projectData:
                                project as projectWithFundingRoundType,
                            })?.endtime
                          }
                          status={
                            ProjectStatus({
                              projectData:
                                project as projectWithFundingRoundType,
                            })?.status as string
                          }
                          roundName={
                            ProjectStatus({
                              projectData:
                                project as projectWithFundingRoundType,
                            })?.round
                              ? ProjectStatus({
                                  projectData:
                                    project as projectWithFundingRoundType,
                                })?.round?.fundingRound.roundName
                              : undefined
                          }
                        />
                      </Center>
                      <ProjectDetails
                        isLoading={false}
                        project={project}
                        setDrawerBodyView={setDrawerBodyView}
                      />
                    </>
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Stack>
    </>
  );
};

export default ProjectHeader;
