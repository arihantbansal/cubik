import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  HStack,
  LinkBox,
  SlideFade,
  Stack,
  useMediaQuery,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { ProjectJoinRoundStatus, UserModel } from "@cubik/database";
import { isPast } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";
import CustomTag from "~/components/common/tags/CustomTag";
import { RemoveToast, SuccessToast } from "~/components/common/toasts/Toasts";
import useListStore from "~/store/listStore";
import { verifiedProjectsType } from "~/types/projects";
import { formatNumberWithK } from "~/utils/formatWithK";
import ProjectsContributorsNumber, {
  ContributionType,
} from "./ProjectsContributorsNumber";
import { projectRouter } from "@cubik/api/src/router";
import { ProjectExplorerType } from "@cubik/common-types";
import Image from "next/image";
import EmptyProjectsState from "./empty-state/ProjectsEmptyState";
import EmptyStateHOC from "~/components/HOC/EmptyState";

const ProjectEventBanner = ({
  name,
  bg,
  color,
}: {
  name: string;
  bg?: string;
  color?: string;
}) => {
  return (
    <Center
      w="full"
      bg={color ? `surface.${color}.3` : "transparent"}
      borderTopRadius={"16px"}
      position={"relative"}
      overflow={"hidden"}
    >
      {bg && (
        <Center
          zIndex={"0"}
          alignItems={"end"}
          bg="red"
          w="28rem"
          h="8.5rem"
          transform={"translateY(31%)"}
          position={"absolute"}
          overflow={"hidden"}
        >
          <Image
            src={bg as string}
            alt={name as string}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Center>
      )}
      <HStack
        zIndex={"1"}
        w="full"
        gap="8px"
        padding={"12px 24px"}
        borderTopRadius={"16px"}
        justifyContent="space-between"
      >
        <Box
          w="full"
          as="p"
          noOfLines={2}
          whiteSpace={"nowrap"}
          color={color ? `surface.${color}.1` : "transparent"}
          textStyle={"overline4"}
          overflow="visible"
          pt="0.1rem"
          lineHeight={"auto"}
          textTransform="uppercase"
          letterSpacing={"0.2em"}
          fontSize={{ base: "8px", md: "10px" }}
          textShadow={"0px 5px 7px rgb(0 0 0)"}
        >
          Participating In
        </Box>
        <Box
          overflow="visible"
          as="p"
          w="fit-content"
          whiteSpace={"nowrap"}
          textStyle={{ base: "title6", md: "title5" }}
          color={`surface.${color}.1`}
          textShadow={"0px 5px 7px rgb(0 0 0)"}
        >
          {name}
        </Box>
      </HStack>
    </Center>
  );
};

const ProjectCard = ({ project }: { project: ProjectExplorerType }) => {
  // use media query to detect mobile screen

  const [isLargerThan767] = useMediaQuery("(min-width: 767px)");
  const toast = useToast();
  const addProject = useListStore((state) => state.addProject);
  const removeProject = useListStore((state) => state.removeProject);
  const projectList = useListStore((state) => state.projectList);

  const [isHovered, setIsHovered] = useState(false);
  const [addedToList, setAddedToList] = useState(
    !!projectList.find((item) => item.id === project.id)
  );

  const industry = JSON.parse(project.industry);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleAddOrRemoveProject = () => {
    if (addedToList) {
      removeProject(project.id);
      setAddedToList(false);
      RemoveToast({ toast, message: "Project removed from list" });
    } else {
      // addProject(projectJoinRound.project);
      setAddedToList(true);
      SuccessToast({ toast, message: "Project added to list" });
    }
  };

  useEffect(() => {
    setAddedToList(!!projectList.find((item) => item.id === project.id));
  }, [projectList]);

  const genrateLink = (): string => {
    if (project.projectEvent.eventName === "hackathon") {
      return `/${project.ownerName}/hackathon/${project.projectEvent.id}`;
    }
    if (project.projectEvent.eventName === "round") {
      return `/${project.ownerName}/${project.id}/${project.projectEvent.id}`;
    }
    return `/${project.ownerName}/${project.id}`;
  };

  return (
    <LinkBox
      as={Link}
      href={genrateLink()}
      w="full"
      maxW={{
        base: "92vw",
        sm: "87vw",
        md: "44vw",
        lg: "29.5vw",
        xl: "25.5rem",
      }}
      position={"relative"}
    >
      <Card
        //  border={addedToList ? '2px solid #659C95' : '2px solid transparent'}
        border="none"
        p="0"
        h={{ base: "fit-content", md: "23rem" }}
        cursor="pointer"
        w="100%"
        maxW={{
          base: "full",
          sm: "full",
          md: "44vw",
          lg: "29.5vw",
          xl: "25.5rem",
        }}
        //  onTouchStart={() => setIsHovered((prevState) => !prevState)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        gap="0"
        background={"#0C0D0D"}
        _hover={{
          border: "none",
          background: "neutral.3",
          //  borderColor: `surface.${project.colorScheme}.3`,
        }}
        _active={{
          // border: '2px solid',
          background: "neutral.3",
          borderColor: `surface.${"teal"}.3`,
        }}
      >
        {/* card outline */}
        {addedToList && (
          <Center
            position={"absolute"}
            w="1.6rem"
            h="1.6rem"
            rounded="full"
            bg="#659C95"
            right="-0.6rem"
            top="-0.6rem"
          >
            <HiCheck size={16} color="#001F1B" />
          </Center>
        )}
        {/* card Header */}
        {/* {isPast(project.projectEvent.start) && !isPast(project.projectEvent.end) && ( */}
        {/* // if project is participating in a round then make it visible else don't show it */}
        <ProjectEventBanner
          name={project.projectEvent.name}
          bg={project.projectEvent?.bg ?? undefined}
          color={project.projectEvent.color ? "teal" : "white"}
        />
        {/* )} */}
        {/* cards footer */}
        <VStack
          w="full"
          alignItems={"start"}
          justifyContent="space-between"
          h="full"
        >
          <VStack
            p={{ base: "14px", md: "24px" }}
            gap={{ base: "12px", md: "16px" }}
            w="full"
            alignItems={"start"}
          >
            <Stack
              spacing={{ base: "14px", md: "16px" }}
              direction={{ base: "row", md: "column" }}
              align={{ base: "center", md: "start" }}
              w="full"
              justifyContent={"space-between"}
            >
              <Avatar
                src={project.logo}
                name={project.title}
                borderRadius={"8px"}
                width={{ base: "3.4rem", md: "4rem" }}
                height={{ base: "3.4rem", md: "4rem" }}
              />
              <VStack spacing="4px" w="full">
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Box
                    as="p"
                    color="neutral.11"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    {project.title}
                  </Box>
                  <Box
                    as="p"
                    color="#A8F0E6"
                    textStyle={{ base: "title4", md: "title3" }}
                  >
                    $
                    {formatNumberWithK(
                      (parseInt(
                        project.projectEvent.amount?.toFixed(2) as string
                      ) as number) ?? 0
                    )}
                  </Box>
                </HStack>
                <HStack
                  w="full"
                  align="start"
                  gap="14px"
                  justify="space-between"
                >
                  <Center>
                    <Box
                      noOfLines={1}
                      textAlign="start"
                      as="p"
                      whiteSpace={"nowrap"}
                      textStyle={{ base: "title6", md: "title5" }}
                      color="neutral.7"
                      textTransform="lowercase"
                      w="full"
                    >
                      by @{project.ownerName}
                    </Box>
                  </Center>
                  <Box
                    color="neutral.8"
                    as="p"
                    textStyle={{ base: "body6", md: "body5" }}
                  >
                    Est. Match
                  </Box>
                </HStack>
              </VStack>{" "}
            </Stack>
            {project.projectShortDescription && (
              <Box
                color="neutral.9"
                as="p"
                textStyle={{ base: "body5", md: "body4" }}
                sx={{
                  noOfLines: { base: "4", md: "3" },
                }}
                alignContent="start"
                alignItems={"start"}
                textAlign={"start"}
              >
                {project.projectShortDescription}
              </Box>
            )}
          </VStack>
          {/* card footer */}
          {project.contributors && (
            <VStack
              marginTop={"0px !important"}
              p="8px 24px 24px 24px"
              w="full"
              position={"relative"}
            >
              <HStack
                display={isLargerThan767 && isHovered ? "none" : "flex"}
                overflowX="hidden"
                w="full"
                justify="space-between"
              >
                <Box
                  overflow="hidden"
                  w="full"
                  flex="4"
                  minWidth="0"
                  position="relative"
                  _after={{
                    content: '""',
                    position: "absolute",
                    top: "45%",
                    right: "0%",
                    transform: "translateY(-50%)",
                    height: "2.4rem",
                    width: "3rem",
                    background:
                      "linear-gradient(90deg, #0C0D0D00 0%, #0C0D0D 80%)",
                  }}
                >
                  <HStack
                    overflow="clip"
                    w="200%"
                    mt="auto"
                    justify="start"
                    whiteSpace="nowrap" // Set whiteSpace to nowrap
                  >
                    {industry.map((tag: any, key: any) => {
                      return (
                        <CustomTag color={tag.label} key={key}>
                          {tag.label}
                        </CustomTag>
                      );
                    })}
                  </HStack>
                </Box>
                <ProjectsContributorsNumber
                  contributors={project.contributors as any[]}
                  contributorsCount={project.contributorCount}
                />
              </HStack>
              {isLargerThan767 && (
                <SlideFade in={isHovered} offsetY="0px" reverse>
                  <HStack
                    zIndex={"9"}
                    w="full"
                    justifyContent="start"
                    position="absolute"
                    left="0"
                    p="8px 24px 24px 24px"
                    bottom="0px"
                    backgroundColor={isHovered ? "neutral.3" : "#0C0D0D"}
                    borderRadius="36px"
                    justify={"space-between"}
                  >
                    <Button
                      as={Link}
                      href={genrateLink()}
                      background={"#1D1F1E"}
                      color="white"
                      fontWeight={"700"}
                      borderColor="transparent"
                      outline="none"
                      //  w="calc(100% - 2.2rem)"
                      w="calc(100% )"
                      variant="connect_wallet"
                    >
                      View Details
                    </Button>
                    {/* <IconButton
                  background={'#1D1F1E'}
                  color="white"
                  fontWeight={'700'}
                  borderColor="transparent"
                  outline="none"
                  onClick={handleAddOrRemoveProject}
                  aria-label="link"
                  variant="connect_wallet"
                  icon={
                    addedToList ? <MdRemove size={26} /> : <BsPlus size={26} />
                  }
                /> */}
                  </HStack>
                </SlideFade>
              )}
            </VStack>
          )}
        </VStack>
      </Card>
    </LinkBox>
  );
};

const ProjectsList = ({
  explorerProjects,
}: {
  explorerProjects: ProjectExplorerType[];
}) => {
  return (
    <Wrap
      overflow={"visible"}
      py="8px"
      spacing={{ base: "1.8rem", md: "1.5rem" }}
      w="100%"
      margin="0"
      justify={"center"}
      align="center"
      direction={{ base: "column", sm: "row", md: "row" }}
    >
      {explorerProjects.length > 0 ? (
        explorerProjects.map((project, key: React.Key | null | undefined) => {
          return <ProjectCard project={project} key={key} />;
        })
      ) : (
        <>
          <EmptyStateHOC
            heading={"No Project Found"}
            subHeading={
              "We couldn`t find any projects matching your search. Please try a different query or check back later."
            }
          />
        </>
      )}
    </Wrap>
  );
};

export default ProjectsList;
