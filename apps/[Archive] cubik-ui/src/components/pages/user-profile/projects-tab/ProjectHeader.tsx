import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, HStack, Stack, VStack } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import { useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { BiMessageSquareDots } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import GetFormattedLink from "~/components/HOC/GetLink";
import { projectWithFundingRoundType } from "~/types/project";
import { getDomain } from "~/utils/getDomain";
import { ProjectsDetailedDescription } from "../../projects/project-details/ProjectDetailedDescription";
import { ProjectLink } from "../../projects/project-details/ProjectDetailsHeader";
import { ProjectSocials } from "../../projects/project-details/project-interactions/ProjectInteractions";
import ApplyForGrant from "./project-admin-dashboard/ProjectAdminDetailsDrawer/ApplyForGrant";
import EditProjectDetails from "./project-admin-dashboard/ProjectAdminDetailsDrawer/EditProjectDetails";
import { ProjectVerifyStatus } from "@prisma/client";

export enum drawerBodyViewEnum {
  PROJECT_DETAILS = "project_details",
  GRANTS = "apply_for_grant",
  EDIT = "edit",
  PREVIEW = "preview",
}

const ProjectDetails = ({
  isLoading,
  setDrawerBodyView,
  projectLogo,
  status,
  projectName,
  shortDescription,
  project_link,
  long_description,
}: {
  long_description: string;
  projectName: string;
  project_link: string;
  projectLogo: string;
  status: ProjectVerifyStatus;
  isLoading: boolean;
  shortDescription: string;
  setDrawerBodyView: any;
}) => {
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
        <MenuList background={"#242424"} outline="none" border="none">
          <MenuItem
            isDisabled
            _hover={{
              backgroundColor: "#141414",
            }}
            _active={{
              backgroundColor: "#141414",
            }}
            icon={<VscPreview size={22} />}
          >
            <Box as="p" textStyle={"body3"}>
              Preview
            </Box>
          </MenuItem>
          <MenuItem isDisabled icon={<AiOutlineEdit size={22} />}>
            <Box as="p" textStyle={"body3"}>
              Edit
            </Box>
          </MenuItem>
          <MenuItem isDisabled icon={<BiMessageSquareDots size={22} />}>
            <Box as="p" textStyle={"body3"}>
              Contact
            </Box>
          </MenuItem>
          <MenuDivider color="#00000040" />
          <MenuItem icon={<MdDeleteOutline size={22} />}>
            <Box as="p" textStyle={"body3"}>
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
        base: "100px 20px 20px 20px",
        sm: "80px 20px 20px 20px",
        md: "80px 40px 40px 40px",
      }}
      gap={{ base: "32px", md: "64px" }}
      zIndex="9"
      w="full"
    >
      <VStack align={"start"} w="full" gap="24px">
        <HStack w="full" justifyContent={"space-between"} align="top">
          <Avatar
            src={projectLogo}
            name={projectName}
            borderRadius="8px"
            width={{ base: "80px", md: "102px" }}
            height={{ base: "80px", md: "102px" }}
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
                  onClick={() => {
                    setDrawerBodyView(drawerBodyViewEnum.GRANTS);
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
          <HStack w="full">
            <HStack w="full">
              <Button
                variant="unstyled"
                display={"flex"}
                alignItems="center"
                rounded="full"
                color="brand.teal6"
                backgroundColor="brand.teal2"
                p={{ base: "0.5rem 0.8rem", md: "0.4rem 1rem" }}
                iconSpacing={{ base: "0.3rem", md: "0.4rem" }}
                leftIcon={<ProjectLink urlName={"url"} />}
                _hover={{
                  backgroundColor: "brand.teal3",
                }}
                as="a"
                href={project_link}
                target="_blank"
              >
                <Box
                  as="p"
                  textStyle={{ base: "body5", md: "body4" }}
                  color="brand.teal.6"
                  pb="0.1rem"
                >
                  {getDomain(project_link)}
                </Box>
              </Button>
              {/* <ProjectSocials isLoading={isLoading} hideTitle={true} projectDetails={project} /> */}
            </HStack>
          </HStack>
        </VStack>
      </VStack>
      <Stack
        display={{ base: "flex", md: "none" }}
        direction={"row"}
        w="full"
        h="fit-content"
      >
        <Button
          variant="cubikFilled"
          size={"cubikSmall"}
          width={"full"}
          onClick={() => {
            setDrawerBodyView(drawerBodyViewEnum.GRANTS);
          }}
        >
          Apply For Grant
        </Button>
      </Stack>
      <Center>
        <ProjectsDetailedDescription
          description={long_description}
          maxH="full"
          overflow={"scroll"}
          isLoading={false}
        />
      </Center>
    </VStack>
  );
};

const ProjectHeader = ({
  isLoading,
  projectLogo,
  projectName,
  project_link,
  shortdescription,
  longDescription,
  status,
}: {
  isLoading: boolean;
  projectName: string;
  projectLogo: string;
  project_link: string;
  shortdescription: string;
  longDescription: string;
  status: ProjectVerifyStatus;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drawerBodyView, setDrawerBodyView] = useState<drawerBodyViewEnum>(
    drawerBodyViewEnum.PROJECT_DETAILS
  );
  const btnRef = useRef();
  const headerSpacing = {
    base: "16px",
    sm: "20px",
    md: "24px",
  };

  return (
    <>
      <Stack
        direction={{ base: "column", sm: "row" }}
        px={headerSpacing}
        gap={headerSpacing}
        w="full"
      >
        <Stack
          w="full"
          direction="row"
          gap={{ base: "8px", sm: "12px", md: "16px" }}
        >
          <SkeletonCircle
            isLoaded={!isLoading}
            fadeDuration={1.5}
            opacity={isLoading ? "0.5" : "1"}
            width={{ base: "36px", sm: "48px", md: "52px" }}
            height={{ base: "36px", sm: "48px", md: "52px" }}
          >
            <Avatar
              src={projectLogo}
              name={projectName}
              width={{ base: "36px", sm: "48px", md: "52px" }}
              height={{ base: "36px", sm: "48px", md: "52px" }}
            />
          </SkeletonCircle>
          <VStack
            alignItems={"start"}
            align={"center"}
            justify="center"
            spacing={{ base: "2px", sm: "4px", md: "6px" }}
          >
            <Skeleton
              isLoaded={!isLoading}
              fadeDuration={2}
              opacity={isLoading ? "0.5" : "1"}
              w={"8rem"}
            >
              <Box
                as="p"
                textStyle={{ base: "title4", sm: "title3", md: "title2" }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {projectName}
              </Box>
            </Skeleton>
            <GetFormattedLink isLoading={isLoading} link={project_link} />
          </VStack>
        </Stack>
        <Center w="full" justifyContent={"end"}>
          <Skeleton
            isLoaded={!isLoading}
            fadeDuration={2.5}
            opacity={isLoading ? "0.3" : "1"}
            w={{ base: "full", sm: "auto" }}
          >
            <Button
              w="full"
              variant={"cubikOutlined"}
              size={{
                base: "cubikMini",
                sm: "cubikSmall",
                md: "cubikMedium",
              }}
              onClick={onOpen}
            >
              View Details
            </Button>
          </Skeleton>
        </Center>
        {projectName && (
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
              borderColor={"#1D1F1E"}
              borderBottom={"none"}
              borderTopRadius={"24px"}
              background="#080808"
              maxW="80rem !important"
              mx="auto"
              p="0"
            >
              <DrawerCloseButton
                transform={"translateY(-3rem)"}
                rounded="full"
                backgroundColor="#141414"
              />

              <DrawerBody maxH={"90vh"} p="0">
                {drawerBodyView === drawerBodyViewEnum.GRANTS ? (
                  <></>
                ) : // <ApplyForGrant setDrawerBodyView={setDrawerBodyView} project={project} />
                drawerBodyView === drawerBodyViewEnum.EDIT ? (
                  <EditProjectDetails />
                ) : drawerBodyView === drawerBodyViewEnum.PREVIEW ? (
                  <></>
                ) : (
                  <>
                    <ProjectDetails
                      isLoading={false}
                      setDrawerBodyView={setDrawerBodyView}
                      long_description={longDescription}
                      projectLogo={projectLogo}
                      status={status}
                      projectName={projectName}
                      project_link={project_link}
                      shortDescription={shortdescription}
                    />
                  </>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </Stack>
    </>
  );
};

export default ProjectHeader;
