import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { ProjectsModel, Round } from '@prisma/client';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import React, { Dispatch, SetStateAction } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import { v4 as uuidV4 } from 'uuid';
import { formatNumberWithK } from '~/utils/formatWithK';
import { connection, ProjectJoinRound } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import { drawerBodyViewEnum } from '../../ProjectHeader';

type FormData = {
  selectRoundId: string | null;
};

const ApplyForGrant: React.FC<{
  setDrawerBodyView: Dispatch<SetStateAction<drawerBodyViewEnum>>;
  project: ProjectsModel;
}> = ({ setDrawerBodyView, project }) => {
  const {
    data: roundData,
    isLoading,
    error,
    isError,
  } = trpc.round.findActive.useQuery();
  const joinRoundMutation = trpc.project.joinRound.useMutation();
  const { control, handleSubmit } = useForm<FormData>();
  const wallet = useAnchorWallet();
  const [selectRoundId, setSelectRoundId] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('selected round - ', selectRoundId);
    if (!selectRoundId) return;
    // get round name of selected round id;
    const round = roundData?.find((round) => round.id === selectRoundId);
    if (!round) return;

    console.log(project.projectUserCount);

    const tx = new anchor.web3.Transaction();

    const ix = await ProjectJoinRound(
      wallet as NodeWallet,
      round.roundName,
      project.projectUserCount
    );
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = wallet?.publicKey;
    tx.add(ix);
    const signTx = await wallet?.signTransaction(tx);
    if (!signTx) return;
    const serialized_transaction = signTx.serialize();
    const sig = await connection.sendRawTransaction(serialized_transaction);
    if (!sig) return;
    joinRoundMutation.mutate({
      roundId: selectRoundId,
      projectId: project.id,
      tx: sig,
      id: uuidV4(),
    });
  };

  const Tile: React.FC<{ tileIndex: string; round: Round }> = ({
    tileIndex,
    round,
  }) => {
    const isSelected = selectRoundId === tileIndex;

    return (
      <HStack
        border={'2px solid'}
        borderColor={isSelected ? '#14665B' : '#ffffff10'}
        backgroundColor={isSelected ? '#010F0D' : '#000000'}
        p={{ base: '16px', md: '32px' }}
        w="full"
        gap="24px"
        rounded="16px"
        justify={'start'}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        onClick={() => setSelectRoundId(tileIndex)}
      >
        <Center
          rounded="full"
          border="3px solid"
          w="30px"
          h="30px"
          borderColor={isSelected ? '#14665B' : '#ADB8B6'}
          p="4px"
        >
          <Center
            rounded="full"
            w="full"
            h="full"
            backgroundColor={isSelected ? '#14665B' : ''}
          />
        </Center>
        <VStack align={'start'} spacing="1.4rem">
          <Box
            color="neutral.11"
            as="p"
            textStyle={{ base: 'title2', md: 'title1' }}
          >
            {round.roundName}
          </Box>
          <HStack
            bg="#ffffff10"
            rounded="8px"
            p={{ base: '0.6rem 1.2rem', md: '0.8rem 1.5rem' }}
          >
            <Box
              color="#B4B0B2"
              textTransform={'uppercase'}
              as="p"
              textStyle={{ base: 'body5', md: 'overline3' }}
            >
              Matching Pool
            </Box>
            <Box as="p" textStyle={{ base: 'body3', md: 'title4' }}>
              : {formatNumberWithK(round.matchedPool)} USDC
            </Box>
          </HStack>
        </VStack>
      </HStack>
    );
  };

  return (
    <VStack w="full" p="0px">
      <Heading w="full" textAlign={'start'} as="h2" size="lg" mb={5}>
        Select a Grant
      </Heading>
      <VStack w="full" spacing="24px">
        {roundData?.map((round: Round) => {
          return <Tile tileIndex={round.id} round={round} key={round.id} />;
        })}
      </VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Controller
          name="selectRoundId"
          control={control}
          defaultValue={selectRoundId}
          render={({ field }) => (
            <Checkbox
              display={'none'}
              isChecked={selectRoundId !== null}
              onChange={() => field.onChange(selectRoundId)}
              onBlur={field.onBlur}
              value={selectRoundId ?? undefined}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
        <HStack
          py={{ base: '24px', md: '32px' }}
          justify={'space-between'}
          align="center"
          w="full"
        >
          <Button
            variant={'outline'}
            w="8rem"
            py="8px"
            onClick={() =>
              setDrawerBodyView(drawerBodyViewEnum.PROJECT_DETAILS)
            }
            leftIcon={<Icon as={FiChevronLeft} width={5} height={5} />}
          >
            Back
          </Button>
          <Button w="8rem" variant={'apply_for_grant'} type="submit">
            Next
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default ApplyForGrant;
