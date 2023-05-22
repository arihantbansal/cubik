import {
  Avatar,
  Box,
  Card,
  Center,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import Link from 'next/link';
import { Key } from 'react';
import {
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { HiLink } from 'react-icons/hi';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import { ProjectCreatorTeamType } from '~/types/IProjectDetails';
import { ProjectWithRoundDetailsWithOwnerWithTeamType } from '~/types/project';
import {
  ProjectCreatorSkeleton,
  ProjectSocialsSkeleton,
} from '../skeletons/ProjectPageLoadingSkeleton';
import { ProjectCTAs } from './ProjectCTAs';

type ProjectCreatorTeamMemberProps = {
  teamMember: ProjectCreatorTeamType;
};
interface Props {
  isLoading: boolean;
  funding: number;
  contributers: number;
}

export const ProjectFundingData = ({
  isLoading,
  funding,
  contributers,
}: Props) => {
  return (
    <VStack gap="16px" align={'start'} w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Funding
      </Box>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={4}
        opacity={isLoading ? 0.4 : 1}
        w="full"
      >
        <VStack
          border="1px solid"
          borderColor={'surface.green.3'}
          rounded="16px"
          backgroundColor={'surface.green.0'}
          w="full"
          p="24px 32px"
          overflow={'hidden'}
          position={'relative'}
        >
          {' '}
          <Box
            as="svg"
            position="absolute"
            top="50%"
            left="0%"
            transform="translate(-50%, -50%)"
            zIndex={-1}
            width="22rem"
            height="22rem"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'blur(45px)',
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#31F57930" />
          </Box>
          <HStack w="full" align={'start'}>
            <VStack align={'start'} gap="8px">
              <Box as="p" textStyle={'headline4'} color={'neutral.11'}>
                ${funding}
              </Box>

              <Box as="p" textStyle={'body4'} color={'neutral.8'}>
                Estimated Funds Raised
              </Box>
            </VStack>

            <Center
              position={'absolute'}
              right="0"
              bottom="0"
              boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16)"
            >
              <svg
                width="101"
                height="106"
                viewBox="0 0 101 106"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_1363_21440)">
                  <path
                    d="M60.0472 117.591C61.135 117.783 62.1723 117.057 62.3641 115.969L63.5644 109.162C85.2513 111.092 99.1889 102.466 102.236 85.1849C104.839 70.4213 97.7263 59.8371 80.9811 52.9561L74.2603 50.3622C74.0819 50.2934 73.9772 50.1079 74.0104 49.9196L78.3481 25.3196C78.3903 25.0803 78.6354 24.9336 78.8646 25.0145C85.0046 27.1823 88.8912 32.3205 88.9551 37.9564C88.9673 39.0364 89.672 40.0375 90.7355 40.2251L105.737 42.8702C106.838 43.0643 107.892 42.3153 107.992 41.2016C109.323 26.3915 99.1384 13.9916 81.1991 9.15052L82.5073 1.7313C82.6991 0.643507 81.9728 -0.393808 80.885 -0.585614L75.2313 -1.58252C74.1435 -1.77432 73.1062 -1.04799 72.9144 0.0398027L71.6182 7.39099C50.9197 5.42491 37.0501 14.0631 34.111 30.7317C31.6158 44.883 38.7248 55.8874 54.4494 62.5885L61.0704 65.4359C61.2408 65.5092 61.3385 65.6901 61.3062 65.8728L56.7602 91.6549C56.7188 91.8896 56.481 92.036 56.2535 91.9652C48.7794 89.6366 44.1646 84.3615 43.9698 78.1243C43.937 77.0724 43.2372 76.1147 42.2007 75.9319L26.5619 73.1744C25.4709 72.982 24.4237 73.716 24.3056 74.8174C22.6208 90.5407 33.6616 102.748 53.9594 107.539L52.7712 114.278C52.5794 115.365 53.3057 116.403 54.3935 116.594L60.0472 117.591ZM82.5982 83.9671C81.3467 91.0647 75.4625 94.7634 66.6889 93.8994C66.4595 93.8768 66.2974 93.6625 66.3374 93.4355L70.5698 69.4325C70.6135 69.1844 70.8763 69.0392 71.1103 69.1326C80.1026 72.7206 83.7427 77.4763 82.5982 83.9671ZM54.0731 32.4978C55.1913 26.1561 61.1295 22.3527 68.4255 23.0613C68.654 23.0835 68.8135 23.2972 68.7736 23.5233L64.7941 46.0925C64.7499 46.3431 64.4838 46.4885 64.2493 46.3897C56.5783 43.1581 53.0378 38.369 54.0731 32.4978Z"
                    fill="#0B120C"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_1363_21440"
                    x="0.136719"
                    y="-21.6133"
                    width="131.973"
                    height="167.234"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="12" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1363_21440"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1363_21440"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </Center>
          </HStack>
        </VStack>
      </Skeleton>
      <Skeleton
        isLoaded={!isLoading}
        fadeDuration={4}
        opacity={isLoading ? 0.3 : 1}
        w="full"
      >
        <VStack
          border="1px solid"
          borderColor={'surface.blue.3'}
          rounded="16px"
          backgroundColor={'surface.blue.0'}
          w="full"
          p="24px 32px"
          overflow={'hidden'}
          position={'relative'}
        >
          <Box
            as="svg"
            position="absolute"
            top="50%"
            left="0%"
            transform="translate(-50%, -50%)"
            zIndex={-1}
            width="22rem"
            height="22rem"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'blur(45px)',
            }}
          >
            <circle cx="50" cy="50" r="50" fill="#33ADFF40" />
          </Box>
          <HStack w="full" align={'start'}>
            <VStack align={'start'} gap="8px">
              <Box as="p" textStyle={'headline4'} color={'neutral.11'}>
                {contributers}
              </Box>
              <Box as="p" textStyle={'body4'} color={'neutral.8'}>
                Contributors
              </Box>
            </VStack>
            <Center
              position={'absolute'}
              right="0"
              bottom="0"
              boxShadow="0px 4px 24px rgba(0, 0, 0, 0.16)"
            >
              <svg
                width="115"
                height="92"
                viewBox="0 0 115 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M92.8695 84.8883C93.3201 85.5823 93.5757 86.3856 93.6093 87.2134C93.6429 88.0411 93.4533 88.8627 93.0604 89.5912C92.6676 90.3196 92.0861 90.928 91.3774 91.352C90.6687 91.776 89.8592 91.9999 89.0343 92H4.57883C3.75395 91.9999 2.9444 91.776 2.23573 91.352C1.52706 90.928 0.945574 90.3196 0.552713 89.5912C0.159852 88.8627 -0.0297973 88.0411 0.00380092 87.2134C0.0373992 86.3856 0.292998 85.5823 0.743593 84.8883C7.18969 74.923 16.6712 67.3181 27.7735 63.2084C21.6359 59.1046 16.9762 53.126 14.4835 46.1568C11.9907 39.1875 11.7972 31.5976 13.9316 24.5093C16.066 17.4211 20.415 11.2108 26.3354 6.79698C32.2558 2.38313 39.4333 0 46.8066 0C54.1798 0 61.3574 2.38313 67.2778 6.79698C73.1982 11.2108 77.5471 17.4211 79.6815 24.5093C81.8159 31.5976 81.6224 39.1875 79.1297 46.1568C76.6369 53.126 71.9772 59.1046 65.8397 63.2084C76.9419 67.3181 86.4234 74.923 92.8695 84.8883ZM143.191 84.8021C136.744 74.8787 127.283 67.3065 116.213 63.2084C123.459 58.3064 128.572 50.8156 130.512 42.2606C132.453 33.7055 131.074 24.7294 126.658 17.1592C122.241 9.58899 115.118 3.99376 106.738 1.51239C98.3584 -0.968988 89.3522 -0.149992 81.5527 3.80267C81.2545 3.95733 80.9937 4.17595 80.789 4.44306C80.5842 4.71017 80.4404 5.01922 80.3678 5.34835C80.2951 5.67747 80.2954 6.0186 80.3686 6.3476C80.4418 6.67659 80.5862 6.9854 80.7914 7.25214C86.591 14.5179 89.9217 23.458 90.2956 32.7628C90.6696 42.0676 88.067 51.2482 82.8693 58.9598C82.5333 59.4637 82.4092 60.0806 82.5239 60.676C82.6386 61.2715 82.9829 61.7973 83.4818 62.139C90.2587 66.8894 96.0601 72.9074 100.569 79.8636C102.387 82.6603 103.13 86.026 102.658 89.3324C102.605 89.6613 102.624 89.9979 102.713 90.3188C102.802 90.6397 102.96 90.9373 103.175 91.191C103.39 91.4447 103.657 91.6485 103.958 91.7882C104.26 91.9278 104.587 92.0001 104.919 92H139.436C140.445 92.0003 141.425 91.6663 142.225 91.0499C143.025 90.4335 143.6 89.569 143.861 88.5908C144.02 87.9474 144.043 87.2776 143.928 86.6249C143.812 85.9721 143.561 85.3511 143.191 84.8021Z"
                  fill="#15154780"
                />
              </svg>
            </Center>
          </HStack>
        </VStack>
      </Skeleton>
    </VStack>
  );
};

const SocialLinks = ({ urlName }: { urlName: string }) => {
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

export const ProjectSocials = ({
  isLoading,
  hideTitle,
  projectDetails,
}: {
  isLoading: boolean;
  hideTitle?: boolean;
  projectDetails:
    | ProjectWithRoundDetailsWithOwnerWithTeamType
    | ProjectsModel
    | null
    | undefined;
}) => {
  const socials = [
    {
      name: projectDetails?.twitter_handle ? 'twitter' : undefined,
      url: projectDetails?.twitter_handle
        ? projectDetails.twitter_handle
        : undefined,
    },
    {
      name: projectDetails?.discord_link ? 'discord' : undefined,
      url: projectDetails?.discord_link
        ? projectDetails.discord_link
        : undefined,
    },
    {
      name: projectDetails?.telegram_link ? 'telegram' : undefined,

      url: projectDetails?.telegram_link
        ? projectDetails.telegram_link
        : undefined,
    },
    {
      name: projectDetails?.github_link ? 'github' : undefined,
      url: projectDetails?.github_link ? projectDetails.github_link : undefined,
    },
  ];
  return (
    <VStack gap={{ base: '8px', md: '16px' }} align="start" w="full">
      {!hideTitle && (
        <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
          Socials
        </Box>
      )}
      <Wrap direction={'row'}>
        {isLoading ? (
          <ProjectSocialsSkeleton isLoading={isLoading} />
        ) : (
          socials.map(
            (
              link: { name: string | undefined; url: string | undefined },
              key: Key
            ) =>
              link.name && (
                <IconButton
                  aria-label={link.name}
                  variant={'unstyled'}
                  fontSize={{ base: 'lg', md: 'xl' }}
                  display="flex"
                  alignItems={'center'}
                  rounded="full"
                  color="brand.teal6"
                  backgroundColor="brand.teal2"
                  key={key}
                  icon={<SocialLinks urlName={link.name} />}
                  _hover={{
                    backgroundColor: 'brand.teal3',
                  }}
                  as="a"
                  href={link.url}
                  target="_blank"
                />
              )
          )
        )}
      </Wrap>
    </VStack>
  );
};

export const ProjectCreatorTeamMember = ({
  teamMember,
}: ProjectCreatorTeamMemberProps) => {
  return (
    <HStack
      as={Link}
      cursor="pointer"
      href={`https://cubik.so/${teamMember.user.username}`}
      w="full"
      justify="space-between"
      px="16px"
    >
      <HStack gap="0.6rem">
        <Avatar
          borderRadius={'8px'}
          size={{ base: 'xs', md: 'sm' }}
          src={teamMember.user.profilePicture}
        />
        <Box color={'white'} as="p" textStyle={{ base: 'body4', md: 'body3' }}>
          @{teamMember.user.username}
        </Box>
      </HStack>
      <Box color="#B4B0B2" as="p" textStyle={{ base: 'body5', md: 'body4' }}>
        {TruncatedAddr({
          walletAddress: teamMember.user.mainWallet,
        })}
      </Box>
    </HStack>
  );
};

export const ProjectOwner = ({
  projectDetails,
  isLoading,
}: {
  projectDetails:
    | ProjectWithRoundDetailsWithOwnerWithTeamType
    | null
    | undefined;
  isLoading: boolean;
}) => {
  return (
    <VStack gap="16px" align={'start'} w="full">
      <Box as="p" textStyle={{ base: 'title4', md: 'title3' }} color="white">
        Creators
      </Box>
      {isLoading ? (
        <ProjectCreatorSkeleton isLoading={isLoading} />
      ) : (
        projectDetails?.Team.map(
          (teamMember: ProjectCreatorTeamType, key: Key) => (
            <ProjectCreatorTeamMember teamMember={teamMember} key={key} />
          )
        )
      )}
    </VStack>
  );
};

export const SimilarProject = () => {
  return (
    <VStack align={'start'} w="full" gap="16px" color="#CBCBCB">
      <Card w="full" direction={'row'} gap="16px" p="16px" align={'start'}>
        <Avatar
          size="md"
          src="https://pbs.twimg.com/profile_images/1536479364657086464/0J5Nw811_400x400.jpg"
        />
        <VStack w="full" alignItems={'start'} textAlign="start">
          <Box as="p" textStyle={'title4'} color="white">
            Solarplex
          </Box>
          <Box as="p" color="#B4B0B2" textStyle={'body5'}>
            Product Hunt for Solana Blockchain.
          </Box>
        </VStack>
      </Card>
      <Card direction={'row'} gap="16px" p="16px" align={'start'}>
        <Avatar
          size="md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOMVpOC5XXMwOU6RtVD8zvHxObLbk38Jfrtc0SbMC2w&s"
        />
        <VStack alignItems={'start'} textAlign="start">
          <Box as="p" textStyle={'title4'} color="white">
            Superteam Earn
          </Box>
          <Box as="p" color="#B4B0B2" textStyle={'body5'}>
            Build your Web3 reputation through Solana bounties, grants, and
            jobs.
          </Box>
        </VStack>
      </Card>
      <Card direction={'row'} gap="16px" p="16px" align={'start'}>
        <Avatar size="md" src="https://i.ibb.co/G2bNtMP/blob.jpg" />
        <VStack alignItems={'start'} textAlign="start">
          <Box as="p" textStyle={'title4'} color="white">
            XRay
          </Box>
          <Box as="p" color="#B4B0B2" textStyle={'body5'}>
            On a mission to make Solana the most human-readable blockchain.
          </Box>
        </VStack>
      </Card>
    </VStack>
  );
};

// sidebar
export const ProjectCreatorAndLinks = ({
  projectDetails,
  isLoading,
}: {
  projectDetails:
    | ProjectWithRoundDetailsWithOwnerWithTeamType
    | null
    | undefined;
  isLoading: boolean;
}) => {
  return (
    <VStack
      gap={{ base: '24px', md: '64px' }}
      w="full"
      justify={'space-between'}
      direction={'column'}
      justifyContent={'start'}
      display={{ base: 'none', lg: 'flex' }}
    >
      <ProjectSocials isLoading={isLoading} projectDetails={projectDetails} />
      <ProjectFundingData
        isLoading={isLoading}
        contributers={
          projectDetails?.ProjectJoinRound.find((e) => e.status === 'APPROVED')
            ?.contributions ?? 0
        }
        funding={
          projectDetails?.ProjectJoinRound.find((e) => e.status === 'APPROVED')
            ?.amountRaise ?? 0
        }
      />
      <ProjectOwner isLoading={isLoading} projectDetails={projectDetails} />
      <VStack
        gap="16px"
        align={'start'}
        w={{ base: 'auto', sm: 'auto', lg: 'full' }}
      >
        <Box as="p" textStyle={'title3'} color="white">
          Similar Projects
        </Box>
        <SimilarProject />
      </VStack>
    </VStack>
  );
};

interface ProjectInteractionsProps {
  projectDetails:
    | ProjectWithRoundDetailsWithOwnerWithTeamType
    | null
    | undefined;
  isLoading: boolean;
}

export const ProjectInteractions = ({
  projectDetails,
  isLoading,
}: ProjectInteractionsProps) => {
  return (
    <Stack
      w="full"
      maxW="26rem"
      flex="1"
      gap="48px"
      flexDir="column"
      justifyContent="start"
    >
      <ProjectCTAs projectDetails={projectDetails} isLoading={isLoading} />
      <ProjectCreatorAndLinks
        projectDetails={projectDetails}
        isLoading={isLoading}
      />
    </Stack>
  );
};
