import {
  Avatar,
  Box,
  Card,
  HStack,
  Stack,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import ProjectDonationSimulator from './project-donation-simulator/ProjectDonationSimulator';
import { ProjectsDonation } from './ProjectDonation';

const ProjectOwner = ({ projectOwner }: { projectOwner: any }) => {
  const router = useRouter();
  console.log('project owners - ', projectOwner);
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
          query: { username: projectOwner.username },
        });
      }}
      justifyContent={'space-between'}
    >
      <HStack gap="0.6rem">
        <Avatar size={{ base: 'sm', md: 'sm' }} src={projectOwner.icon} />
        <Box color={'white'} as="p" textStyle={'body3'}>
          @{projectOwner?.username}
        </Box>
      </HStack>
      {projectOwner?.mainwallet && (
        <Box color="#B4B0B2" as="p" textStyle={'body4'}>
          {TruncatedAddr({ walletAddress: projectOwner.mainwallet })}
        </Box>
      )}
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

// sidebar
const SideBar = ({ projectDetails }: { projectDetails: any }) => {
  return (
    <VStack
      gap="48px"
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
          Projects Creator
        </Box>
        <ProjectOwner
          projectOwner={{
            id: '1234',
            username: 'irfan',
            mainwallet: '0x49fj3nfugmrivhrt748cvjhsdkwe',
          }}
        />
        {/* {projectDetails.owner.map((projectOwner, key) => {
          return <ProjectOwner projectOwner={projectOwner} key={key} />;
        })} */}
      </VStack>
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

// section 2
export const ProjectInteractions = ({
  projectDetails,
}: {
  projectDetails: any;
}) => {
  const [isSmallerThank768] = useMediaQuery('(min-width: 768px)');
  return (
    <Stack
      w="full"
      flex="1.2"
      gap={{ base: '48px', md: '48px' }}
      display={'flex'}
      flexDir={{ base: 'column', md: 'column' }}
      justifyContent="start"
    >
      <ProjectsDonation projectDetails={projectDetails} />
      {isSmallerThank768 && <ProjectDonationSimulator />}
      <Box height="2px" backgroundColor="#1A1A1A" w="full" />
      <SideBar projectDetails={projectDetails} />
    </Stack>
  );
};
