import { Button, Container, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { ProjectVerifyStatus } from '@prisma/client';
import React from 'react';
import { trpc } from '~/utils/trpc';

const ProjectAuthenticationRoute = () => {
  const wallet = useWallet();
  const router = useRouter();

  const wallets = ['8Fy7yHo7Sn7anUtG7VANLEDxCWbLjku1oBVa4VouEVVP', '', ''];
  const projectUpdateMutation = trpc.project.updateProjectStatus.useMutation();
  if (!wallet.publicKey?.toBase58()) {
    return <>wallet not connected</>;
  }

  if (wallet.publicKey?.toBase58() !== router.query.pubKey) {
    return <>not same wallet</>;
  }

  if (!wallets.includes(wallet.publicKey.toBase58() as string)) {
    return <>wallet is not in wallets array</>;
  }

  return (
    <Container maxW="3xl">
      <VStack gap="0.5rem">
        <Button
          variant={'connect_wallet'}
          onClick={() => {
            projectUpdateMutation.mutate({
              id: router.query.projectId as string,
              status: ProjectVerifyStatus.VERIFIED,
            });
          }}
        >
          Approve
        </Button>
        <Button
          variant={'connect_wallet'}
          onClick={() => {
            projectUpdateMutation.mutate({
              id: router.query.projectId as string,
              status: ProjectVerifyStatus.FAILED,
            });
          }}
        >
          Reject
        </Button>
      </VStack>
    </Container>
  );
};

export default ProjectAuthenticationRoute;
