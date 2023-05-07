import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Container,
  HStack,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import GetFormattedLink from '~/components/HOC/GetLink';
import {
  connection,
  markProjectFailed,
  markProjectVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

const ProjectAuthenticationRoute = () => {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = trpc.project.findManyReview.useQuery();
  const wallet = useWallet();
  const router = useRouter();
  const anchorWallet = useAnchorWallet();

  const wallets = [
    '8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP',
    'AhFfjBPCoNRDExEDFYuNK2NXCWNa1gi2VUbdA7cF19CD',
    '52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ',
  ];
  const projectUpdateMutation = trpc.project.updateProjectStatus.useMutation();

  // check for wallet is connected or not
  if (!wallet.publicKey?.toBase58()) {
    return <>wallet not connected</>;
  }

  // check if connected wallet matches with the wallet in the url
  if (wallet.publicKey?.toBase58() !== router.query.pubKey) {
    return <Center w="full">Access Denied</Center>;
  }

  // check if the wallet is in the wallets array
  if (!wallets.includes(wallet.publicKey.toBase58() as string)) {
    return <Center w="full">wallet is not in wallets array</Center>;
  }

  if (isLoading) {
    return (
      <Center w="full">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return <Center w="full">There was an Error</Center>;
  }

  const ApproveProject = async (
    id: string,
    username: string,
    count: number,
    owner: string
  ) => {
    const ix = await markProjectVerified(
      anchorWallet as NodeWallet,
      username,
      count,
      owner
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);
    const signedTx = await anchorWallet?.signTransaction(tx);
    if (!signedTx) return;
    const txid = await connection.sendRawTransaction(signedTx.serialize());
    console.log('txid', txid);

    projectUpdateMutation.mutate({
      id: id,
      status: 'VERIFIED',
    });
  };
  const RejectProject = async (
    id: string,
    username: string,
    count: number,
    owner: string
  ) => {
    const ix = await markProjectFailed(
      anchorWallet as NodeWallet,
      username,
      count,
      owner
    );
    const tx = new anchor.web3.Transaction();
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);
    const signedTx = await anchorWallet?.signTransaction(tx);
    if (!signedTx) return;
    const txid = await connection.sendRawTransaction(signedTx.serialize());
    console.log('txid', txid);
    projectUpdateMutation.mutate({
      id: id,
      status: 'REVIEW',
    });
  };
  console.log('all projects which are yet to be verified - ', projects);

  return (
    <>
      <Container maxW="7xl">
        <VStack align="start" py="32px">
          <Box as="p" textStyle={'heading1'} color="white">
            Projects to be Reviewed
          </Box>
        </VStack>
        <VStack spacing="32px" outline="1px solid red">
          {projects?.map((project) => (
            <>
              <Card
                key={project.id}
                px="0px"
                pt={{ base: '16px', sm: '20px', md: '24px' }}
                pb={{ base: '16px', sm: '20px', md: '24px' }}
                gap={{ base: '16px', sm: '20px', md: '24px' }}
                w="100%"
              >
                <CardHeader>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    px={''}
                    gap={''}
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
                          textStyle={{
                            base: 'title4',
                            sm: 'title3',
                            md: 'title2',
                          }}
                          noOfLines={1}
                          textAlign="left"
                          color="white"
                        >
                          {project.name}
                        </Box>
                        <GetFormattedLink link={project.project_link} />
                      </VStack>
                    </Stack>
                    <HStack justifyContent={'end'}>
                      <Button
                        variant={'project_button_secondary'}
                        //@ts-ignore
                        w="full"
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                        onClick={() =>
                          RejectProject(
                            project.id,
                            project.owner.username,
                            project.projectUserCount,
                            project.owner_publickey
                          )
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        variant={'project_button_secondary'}
                        //@ts-ignore
                        w="full"
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                        onClick={() =>
                          ApproveProject(
                            project.id,
                            project.owner.username,
                            project.projectUserCount,
                            project.owner_publickey
                          )
                        }
                      >
                        Accept
                      </Button>
                    </HStack>
                  </Stack>
                </CardHeader>
              </Card>
            </>
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default ProjectAuthenticationRoute;
