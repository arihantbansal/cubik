import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import GetFormattedLink from '~/components/HOC/GetLink';
import {
  connection,
  updateProjectRoundVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

const GrantUnderReviewProjects = ({
  roundId,
  setProjectsNumberByStatus,
}: any) => {
  const anchorWallet = useAnchorWallet();
  const updateRound = trpc.round.updateStatus.useMutation();
  const {
    data: roundData,
    isLoading,
    isError,
  } = trpc.round.findInReview.useQuery({
    id: roundId as string,
  });

  useEffect(() => {
    if (
      roundData?.ProjectJoinRound &&
      typeof roundData?.ProjectJoinRound === 'object'
    ) {
      setProjectsNumberByStatus((prev: any) => ({
        ...prev,
        review: Object.keys(roundData?.ProjectJoinRound).length, // count the number of keys in the object
      }));
    }
  }, [roundData?.ProjectJoinRound, setProjectsNumberByStatus]);

  const markVerified = async (
    name: string,
    owner: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      name,
      projectCount,
      owner
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    console.log('txid', txid);
    if (!txid) return;
    updateRound.mutate({
      id: '1',
      status: 'ACCEPTED',
    });
  };

  const markUnverified = async (
    name: string,
    owner: string,
    projectCount: number
  ) => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      name,
      projectCount,
      owner
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    console.log('txid', txid);
    if (!txid) {
      throw new Error('txid is null');
    }
    updateRound.mutate({
      id: '1',
      status: 'REJECTED',
    });
  };

  return (
    <VStack spacing={4} w="full">
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>There is some error</>
      ) : (
        <>
          {roundData?.ProjectJoinRound?.map((projectJoin) => (
            <>
              <Card
                key={projectJoin.project.id}
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
                          src={projectJoin.project.logo}
                          name={projectJoin.project.name}
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
                          {projectJoin.project.name}
                        </Box>
                        <GetFormattedLink
                          link={projectJoin.project.project_link}
                        />
                      </VStack>
                    </Stack>
                    <HStack justifyContent={'end'}>
                      <Button
                        variant={'project_button_secondary'}
                        //@ts-ignore
                        w="full"
                        onClick={() => {
                          markUnverified(
                            roundData?.roundName as string,
                            projectJoin.project.owner_publickey,
                            projectJoin.project.projectUserCount
                          );
                        }}
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={'project_button_secondary'}
                        //@ts-ignore
                        w="full"
                        onClick={() => {
                          markVerified(
                            roundData?.roundName as string,
                            projectJoin.project.owner.mainWallet,
                            projectJoin.project.projectUserCount
                          );
                        }}
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                      >
                        Accept
                      </Button>
                    </HStack>
                  </Stack>
                </CardHeader>
              </Card>
            </>
          ))}
        </>
      )}
    </VStack>
  );
};

export default GrantUnderReviewProjects;
