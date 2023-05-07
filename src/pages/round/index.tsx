import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import * as anchor from '@coral-xyz/anchor';
import { connection, createRound } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import { Button } from '@chakra-ui/react';

const Round = () => {
  const anchorWallet = useAnchorWallet();
  const createRoundMutation = trpc.round.create.useMutation({
    onSuccess: (data) => {
      console.log('data', data);
    },
  });
  const creatRound = async () => {
    const ix = await createRound(
      anchorWallet as NodeWallet,
      'tessst',
      10000,
      20
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
      matchingPool: 10000,
      name: 'tessst',
      notionPage: 'sdf',
      projectCount: 20,
      tx: 'dfd',
    });
  };
  return (
    <>
      <WalletMultiButton />
      <Button onClick={creatRound}>Create Round</Button>
    </>
  );
};

export default Round;
