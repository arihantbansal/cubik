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
import { GetServerSideProps } from 'next';
import GetFormattedLink from '~/components/HOC/GetLink';
import {
  connection,
  createRoundIx,
  updateProjectRoundFailed,
  updateProjectRoundVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

const RoundAdmin = ({ slug }: { slug: string }) => {
  const anchorWallet = useAnchorWallet();
  const createRoundMutation = trpc.round.create.useMutation();

  const updateRound = trpc.round.updateStatus.useMutation();
  const projectforRound = trpc.round.findInReview.useQuery({
    name: slug,
  });

  const createRound = async () => {
    const ix = await createRoundIx(
      anchorWallet as NodeWallet,
      'Round 1',
      1000,
      10
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix as anchor.web3.TransactionInstruction);

    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    console.log('txid', txid);
    if (!txid) {
      throw new Error('txid is null');
    }
    createRoundMutation.mutate({
      matchingPool: 1000,
      name: 'Round 1',
      notionPage: 'https://www.notion.so/round1',
      projectCount: 10,
      tx: txid,
    });
  };

  const markVerified = async () => {
    const ix = await updateProjectRoundVerified(
      anchorWallet as NodeWallet,
      'round Id',
      1,
      'owner key'
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
      status: 'ACCEPTED',
    });
  };

  const markUnverified = async () => {
    const ix = await updateProjectRoundFailed(
      anchorWallet as NodeWallet,
      'round Id',
      1,
      'owner key'
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
    <>
      <Stack w={'7xl'} mx={'auto'}>
        <VStack spacing="32px" mt={20}>
          {projectforRound.data?.ProjectJoinRound?.map((projectJoin) => (
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
                        onClick={() => markUnverified()}
                        maxW={{ base: 'full', sm: '8rem', md: '10rem' }}
                      >
                        Reject
                      </Button>
                      <Button
                        variant={'project_button_secondary'}
                        //@ts-ignore
                        w="full"
                        onClick={() => markVerified()}
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
        </VStack>
      </Stack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  return {
    props: { slug },
  };
};
export default RoundAdmin;
