import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import {
  VStack,
  HStack,
  Box,
  Heading,
  Button,
  Checkbox,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { trpc } from '~/utils/trpc';
import { Round } from '@prisma/client';

type FormData = {
  selectRoundId: string | null;
};

const ApplyForGrant: React.FC = () => {
  const { data, isLoading, error, isError } = trpc.round.findActive.useQuery();

  const { control, handleSubmit } = useForm<FormData>();
  const [selectRoundId, setSelectRoundId] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('selected round - ', selectRoundId);
  };

  const Tile: React.FC<{ tileIndex: string; round: Round }> = ({
    tileIndex,
    round,
  }) => {
    const isSelected = selectRoundId === tileIndex;

    return (
      <Box
        as={motion.div}
        initial={{ scale: 1 }}
        animate={{ scale: isSelected ? 1.05 : 1 }}
        borderWidth={isSelected ? 2 : 1}
        borderColor={isSelected ? 'teal.500' : 'gray.200'}
        borderRadius="md"
        p={5}
        cursor="pointer"
        onClick={() => setSelectRoundId(tileIndex)}
      >
        <Heading as="h4" size="md">
          {round.roundName}
        </Heading>
      </Box>
    );
  };

  return (
    <VStack>
      <Heading as="h2" size="lg" mb={5}>
        Select a Tile
      </Heading>
      <HStack spacing={5}>
        {data?.map((round: Round) => {
          return <Tile tileIndex={round.id} round={round} key={round.id} />;
        })}
      </HStack>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Button mt={5} type="submit" colorScheme="teal">
          Next
        </Button>
      </form>
    </VStack>
  );
};

export default ApplyForGrant;
