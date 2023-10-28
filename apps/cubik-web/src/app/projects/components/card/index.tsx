import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomTag from '@/app/components/common/tags/CustomTag';
import type { ProjectExplorerType } from '@/types/explorer';
import {
  Box,
  Button,
  Card,
  Center,
  HStack,
  LinkBox,
  SlideFade,
  Stack,
  useMediaQuery,
  VStack,
} from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatNumberWithK';

import ProjectsContributorsNumber from '../ProjectContributorsNumber';

const ProjectEventBanner = ({
  name,
  color,
}: {
  name: string;
  color?: string;
}) => {
  return (
    <Center
      w="full"
      bg={color ? `surface.${color}.3` : 'transparent'}
      borderTopRadius={'16px'}
      position={'relative'}
      overflow={'hidden'}
    >
      <HStack
        zIndex={'1'}
        w="full"
        gap="8px"
        padding={'12px 24px'}
        borderTopRadius={'16px'}
        justifyContent="space-between"
        color={'black'}
      >
        <Box
          w="full"
          as="p"
          noOfLines={2}
          whiteSpace={'nowrap'}
          color={color ? `surface.${color}.1` : 'transparent'}
          textStyle={'overline4'}
          overflow="visible"
          pt="0.1rem"
          lineHeight={'auto'}
          textTransform="uppercase"
          letterSpacing={'0.2em'}
          fontSize={{ base: '8px', md: '10px' }}
          //  textShadow={"0px 3px 4px rgb(0 0 0)"}
        >
          Participating In
        </Box>
        <Box
          overflow="visible"
          as="p"
          w="fit-content"
          whiteSpace={'nowrap'}
          textStyle={{ base: 'title6', md: 'title5' }}
          color={`surface.${color}.1`}
          //    textShadow={"0px 5px 7px rgb(0 0 0)"}
        >
          {name}
        </Box>
      </HStack>
    </Center>
  );
};

export const ProjectCard = ({ project }: { project: ProjectExplorerType }) => {
  // use media query to detect mobile screen
  const isDesktop = useMediaQuery('(min-width: 767px)');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleHover = () => {
    setIsHovered((prevState) => !prevState);
  };
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');
  // const addProject = useListStore((state) => state.addProject);
  // const removeProject = useListStore((state) => state.removeProject);
  // const projectList = useListStore((state) => state.projectList);

  // const [addedToList, setAddedToList] = useState(
  //   !!projectList.find((item) => item.id === project.id)
  // );

  const industry = JSON.parse(project.industry) as {
    label: string;
    value: string;
  }[];

  // const handleAddOrRemoveProject = () => {
  //   if (addedToList) {
  //     removeProject(project.id);
  //     setAddedToList(false);
  //     RemoveToast({ toast, message: "Project removed from list" });
  //   } else {
  //     // addProject(projectJoinRound.project);
  //     setAddedToList(true);
  //     SuccessToast({ toast, message: "Project added to list" });
  //   }
  // };

  // useEffect(() => {
  //   setAddedToList(!!projectList.find((item) => item.id === project.id));
  // }, [projectList]);

  const generateLink = (): string => {
    // if (project.projectEvent.eventName === "hackathon") {
    //   return `/${project.ownerName}/hackathon/${project.projectEvent.id}`;
    // }
    // if (project.projectEvent.eventName === "round") {
    //   return `/${project.ownerName}/${project.id}/${project.projectEvent.id}`;
    // }
    return `/project/${project.slug}`;
  };

  //  border={addedToList ? '2px solid #659C95' : '2px solid transparent'}
  return (
    <LinkBox
      as={Link}
      href={generateLink()}
      w="full"
      maxW={{
        base: '92vw',
        sm: '87vw',
        md: '44vw',
        lg: '29.5vw',
        xl: '25.5rem',
      }}
      position={'relative'}
    >
      <Card
        border="none"
        p="0"
        h={{ base: 'fit-content', md: '23rem' }}
        cursor="pointer"
        w="100%"
        maxW={{
          base: 'full',
          sm: 'full',
          md: '44vw',
          lg: '29.5vw',
          xl: '25.5rem',
        }}
        onTouchStart={toggleHover}
        onMouseEnter={isDesktop ? toggleHover : undefined}
        onMouseLeave={toggleHover}
        gap="0"
        background={'#0C0D0D'}
        _hover={{
          border: 'none',
          background: 'neutral.3',
        }}
        _active={{
          background: 'neutral.3',
          borderColor: `surface.${'teal'}.3`,
        }}
      >
        {/* Todo: fix the multi contribute option */}
        {/* {addedToList && (
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
        )} */}

        <ProjectEventBanner
          name={project.projectEvent.name}
          color={project.projectEvent.color ? 'teal' : 'yellow'}
        />
        <VStack
          w="full"
          alignItems={'start'}
          justifyContent="space-between"
          h="full"
        >
          <VStack
            p={{ base: '14px', md: '24px' }}
            gap={{ base: '12px', md: '16px' }}
            w="full"
            alignItems={'start'}
          >
            <Stack
              spacing={{ base: '14px', md: '16px' }}
              direction={{ base: 'row', md: 'column' }}
              align={{ base: 'center', md: 'start' }}
              w="full"
              justifyContent={'space-between'}
            >
              {/* <Avatar
                src={project.logo}
                name={project.title}
                borderRadius={"8px"}
                width={{ base: "3.4rem", md: "4rem" }}
                height={{ base: "3.4rem", md: "4rem" }}
              /> */}
              <Box
                borderRadius={'8px'}
                w={{ base: '3.4rem', md: '4rem' }}
                minW={{ base: '3.4rem', md: '4rem' }}
                h={{ base: '3.4rem', md: '4rem' }}
                position={'relative'}
              >
                <Image
                  src={project.logo}
                  alt={project.title}
                  fill={true}
                  style={{
                    objectFit: 'cover',
                    background: 'transparent',
                    borderRadius: '8px',
                  }}
                  priority
                />
              </Box>
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
                    maxW="full"
                    sx={{
                      numberOfLines: '1',
                    }}
                    textStyle={{ base: 'title4', md: 'title3' }}
                  >
                    {project.title}
                  </Box>
                  <Box
                    as="p"
                    color="#A8F0E6"
                    textStyle={{ base: 'title4', md: 'title3' }}
                  >
                    $
                    {formatNumberWithK(
                      parseInt(project.projectEvent.amount?.toFixed(2)) ?? 0,
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
                      whiteSpace={'nowrap'}
                      textStyle={{ base: 'title6', md: 'title5' }}
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
                    textStyle={{ base: 'body6', md: 'body5' }}
                  >
                    Est. Match
                  </Box>
                </HStack>
              </VStack>{' '}
            </Stack>
            {project.projectShortDescription && (
              <Box
                color="neutral.8"
                as="p"
                textStyle={{ base: 'body5', md: 'body4' }}
                sx={{
                  noOfLines: { base: '4', md: '3' },
                }}
                fontWeight={'600 !important'}
                alignContent="start"
                alignItems={'start'}
                textAlign={'start'}
              >
                {project.projectShortDescription}
              </Box>
            )}
          </VStack>
          {/* card footer */}
          {project.contributors && (
            <VStack
              marginTop={'0px !important'}
              p={{ base: '8px 14px 16px 14px', md: '8px 24px 24px 24px' }}
              w="full"
              position={'relative'}
            >
              <HStack
                display={isLargerThan767 && isHovered ? 'none' : 'flex'}
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
                    position: 'absolute',
                    top: '45%',
                    right: '0%',
                    transform: 'translateY(-50%)',
                    height: '2.4rem',
                    width: '3rem',
                    background: isHovered
                      ? 'linear-gradient(90deg, #14141400 0%, #141414 80%)'
                      : 'linear-gradient(90deg, #0C0D0D00 0%, #0C0D0D 80%)',
                  }}
                >
                  <HStack
                    spacing="4px"
                    p="0"
                    overflow="clip"
                    w="200%"
                    mt="auto"
                    justify="start"
                    whiteSpace="nowrap" // Set whiteSpace to nowrap
                  >
                    {industry.map((tag, key) => {
                      return (
                        <CustomTag color={tag.label} key={key}>
                          {tag.label}
                        </CustomTag>
                      );
                    })}
                  </HStack>
                </Box>
                <ProjectsContributorsNumber
                  contributors={project.contributors}
                  contributorsCount={project.contributorCount}
                />
              </HStack>
              {isLargerThan767 && (
                <SlideFade in={isHovered} offsetY="0px" reverse>
                  <HStack
                    zIndex={'9'}
                    w="full"
                    justifyContent="start"
                    position="absolute"
                    left="0"
                    p="8px 24px 24px 24px"
                    bottom="0px"
                    backgroundColor={isHovered ? 'neutral.3' : '#0C0D0D'}
                    borderRadius="36px"
                    justify={'space-between'}
                  >
                    <Button
                      as={Link}
                      href={generateLink()}
                      background={'#1D1F1E'}
                      color="white"
                      fontWeight={'700'}
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
