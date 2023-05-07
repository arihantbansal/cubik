import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import {
  connection,
  createRoundIx,
  updateProjectRoundFailed,
  updateProjectRoundVerified,
} from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import * as anchor from '@coral-xyz/anchor';

const RoundAdmin = () => {
  const anchorWallet = useAnchorWallet();
  const createRoundMutation = trpc.round.create.useMutation();
  const updateRound = trpc.round.updateStatus.useMutation();
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
  return <div>RoundVerification</div>;
};

export default RoundAdmin;
