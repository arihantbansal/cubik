import {
  Avatar,
  Box,
  Card,
  HStack,
  IconButton,
  Stack,
  useMediaQuery,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
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
import {
  ProjectCreatorTeamType,
  ProjectWithCommentsAndRoundsType,
} from '~/types/IProjectDetails';
import { ProjectCTAs } from './ProjectCTAs';

type ProjectCreatorTeamMemberProps = {
  teamMember: ProjectCreatorTeamType;
};

const ProjectCreatorTeamMember = ({
  teamMember,
}: ProjectCreatorTeamMemberProps) => {
  const router = useRouter();
  return (
    <Card
      gap="16px"
      p="16px"
      w="full"
      align={'center'}
      direction={'row'}
      onClick={() => {
        router.push({
          pathname: '/[username]',
          query: { username: teamMember.id },
        });
      }}
      justifyContent={'space-between'}
    >
      <HStack gap="0.6rem">
        <Avatar
          size={{ base: 'sm', md: 'sm' }}
          src={teamMember.user.profilePicture}
        />
        <Box color={'white'} as="p" textStyle={'body3'}>
          @{teamMember.user.username}
        </Box>
      </HStack>
      <Box color="#B4B0B2" as="p" textStyle={'body4'}>
        {TruncatedAddr({
          walletAddress: teamMember.user.mainWallet,
        })}
      </Box>
    </Card>
  );
};

const SimilarProject = () => {
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

// sidebar
const ProjectCreatorAndLinks = ({
  projectDetails,
  isLoading,
}: {
  projectDetails: ProjectWithCommentsAndRoundsType;
  isLoading: boolean;
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
    <VStack
      gap={{ base: '24px', md: '64px' }}
      w="full"
      justify={'space-between'}
      direction={'column'}
      justifyContent={'start'}
    >
      <VStack
        gap="16px"
        align={'start'}
        w={{ base: 'auto', sm: 'auto', md: 'full' }}
      >
        <Box as="p" textStyle={'title3'}>
          Links
        </Box>
        <Wrap direction={'row'}>
          {socials.map(
            (
              link: { name: string | undefined; url: string | undefined },
              key: Key
            ) =>
              link.name && (
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
                  icon={<SocialLinks urlName={link.name} />}
                  _hover={{
                    backgroundColor: 'brand.teal3',
                  }}
                  as="a"
                  href={link.url}
                  target="_blank"
                />
              )
          )}
        </Wrap>
      </VStack>
      {projectDetails.Team.length > 0 && (
        <VStack
          gap="16px"
          align={'start'}
          w={{ base: 'auto', sm: 'auto', md: 'full' }}
        >
          <Box as="p" textStyle={'title3'}>
            Projects Creator
          </Box>
          {projectDetails.Team.map(
            (teamMember: ProjectCreatorTeamType, key: Key) => (
              <ProjectCreatorTeamMember teamMember={teamMember} key={key} />
            )
          )}
        </VStack>
      )}
      <VStack
        gap="16px"
        align={'start'}
        w={{ base: 'auto', sm: 'auto', md: 'full' }}
      >
        <Box as="p" textStyle={'title3'}>
          Similar Projects
        </Box>
        <SimilarProject />
      </VStack>
    </VStack>
  );
};

interface ProjectInteractionsProps {
  projectDetails: ProjectWithCommentsAndRoundsType;
  isLoading: boolean;
}

export const ProjectInteractions = ({
  projectDetails,
  isLoading,
}: ProjectInteractionsProps) => {
  const [isSmallerThank768] = useMediaQuery('(min-width: 768px)');

  return (
    <Stack
      w="full"
      maxW="26rem"
      flex="1"
      // position={{ base: 'relative', lg: 'fixed' }}
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
