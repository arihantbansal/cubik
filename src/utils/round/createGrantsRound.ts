import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import { UseFormGetValues } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { FormData } from '~/pages/grants/new-grant';
import { connection, createRoundIx } from '~/utils/program/contract';

interface CreateRoundMutationData {
  matchingPool: number;
  name: string;
  notionPage: string;
  projectCount: number;
  tx: string;
  colorScheme: string;
  short_description: string;
  startTime: string;
  endtime: string;
}

export const createRound = async (
  anchorWallet: any, // Add the specific type here
  name: string,
  pool: string,
  project: string,
  colorScheme: string,
  description: string,
  start: moment.Moment | null,
  end: moment.Moment | null,
  onClose: () => void,
  createRoundMutation: UseMutationResult<CreateRoundMutationData, any, any>,
  setTransactionError: (error: string | null) => void
) => {
  try {
    const ts = await getSession();

    console.log(ts);

    const ix = await createRoundIx(
      anchorWallet as NodeWallet,
      name,
      parseInt(pool),
      parseInt(project)
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const tx = new anchor.web3.Transaction();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix as anchor.web3.TransactionInstruction);
    const signed = await anchorWallet?.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signed!.serialize());
    if (!txid) {
      throw new Error('txid is null');
    }
    createRoundMutation.mutate({
      matchingPool: parseInt(pool),
      name: name,
      notionPage: 'https://www.notion.so/round1',
      projectCount: parseInt(project),
      tx: txid,
      colorScheme: colorScheme,
      short_description: description,
      startTime: start?.toISOString() as string,
      endtime: end?.toISOString() as string,
    });
    onClose();
  } catch (error: any) {
    setTransactionError(error.message || 'Error while signing transaction');
  }
};

export const onSignTransaction = async (
  startDate: Date,
  endDate: Date,
  description: string | undefined,
  getValues: UseFormGetValues<FormData>,
  setSignTransactionLoading: (_loading: boolean) => void,
  setTransactionError: (_error: string | null) => void,
  anchorWallet: any, // Add the specific type here
  onClose: () => void,
  createRoundMutation: any // Add the specific type here
) => {
  setSignTransactionLoading(true);
  try {
    const formValues = getValues(); // get the form values here
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    createRound(
      anchorWallet,
      formValues.name,
      formValues.pool,
      formValues.projects,
      formValues.colorScheme,
      formValues.short_description,
      startMoment,
      endMoment,
      onClose,
      createRoundMutation,
      setTransactionError
    );
  } catch (error: any) {
    setTransactionError(error.message || 'there was an error');
  } finally {
    setSignTransactionLoading(false);
  }
};
