import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { addDays } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import DatePickerInput from '~/components/common/inputs/DatePickerInput';
import { connection, createRoundIx } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

registerLocale('en-gb', enGB);

const CreateGrantRound = () => {
  const toast = useToast();
  const router = useRouter();
  const tomorrow = addDays(new Date(), 1);
  const anchorWallet = useAnchorWallet();
  const [endDate, setEndDate] = useState(tomorrow);
  const [startDate, setStartDate] = useState(tomorrow);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createRoundMutation = trpc.round.create.useMutation();
  const [transactionError, setTransactionError] = useState(null);
  const [signTransactionLoading, setSignTransactionLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const createRound = async (
    name: string,
    pool: number,
    project: number,
    colorScheme: string,
    description: string,
    start: moment.Moment | null,
    end: moment.Moment | null
  ) => {
    try {
      const ix = await createRoundIx(
        anchorWallet as NodeWallet,
        name,
        pool,
        project
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
      const createdRound = createRoundMutation.mutate({
        matchingPool: pool,
        name: name,
        notionPage: 'https://www.notion.so/round1',
        projectCount: project,
        tx: txid,
        colorScheme: colorScheme,
        short_description: description,
        startTime: start?.toISOString() as string,
        endtime: end?.toISOString() as string,
      });
      console.log('created round data - ', createdRound);
      onClose();
    } catch (error: any) {
      setTransactionError(error.message || 'Error while signing transaction');
    }
  };

  const onSubmit = async () => {
    onOpen();
  };

  const onSignTransaction = async () => {
    setSignTransactionLoading(true);
    try {
      const startMoment = moment(startDate);
      const endMoment = moment(endDate);
      console.log('get values - ', getValues(), startMoment, endMoment);
      createRound(
        getValues().name,
        getValues().pool,
        getValues().projects,
        getValues().colorScheme,
        getValues().short_description,
        startMoment,
        endMoment
      );
    } catch (error: any) {
      setTransactionError(error.message || 'there was an error');
    } finally {
      setSignTransactionLoading(false);
    }
  };

  return (
    <Container
      transition="all .25s ease"
      maxW="full"
      p={{ base: '1rem', md: '0' }}
      my={{ base: '2rem', md: '5rem', lg: '8rem', xl: '10rem' }}
    >
      <Card
        maxW={{ base: '28rem', md: '36rem' }}
        mx="auto"
        padding={{ base: '24px', md: '40px' }}
      >
        <CardHeader>
          <Box
            as="h1"
            color="neutral.11"
            textStyle={{ base: 'title2', md: 'title1' }}
          >
            Create Grant Round
          </Box>
          <Box
            as="p"
            textStyle={{ base: 'body5', md: 'body4' }}
            color="neutral.9"
          >
            Help projects in the community sustain by providing them grants
            through quadratic funding and community voting
          </Box>
        </CardHeader>
        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '24px',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            isRequired
            w="full"
            isInvalid={Boolean(errors.projectName)}
          >
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="name"
            >
              Round Name
            </FormLabel>
            <Input
              id="name"
              placeholder="Enter your rounds name"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('name', {
                required: true,
                maxLength: { value: 36, message: 'Max length is 36' },
              })}
            />
            {errors.name && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                <>{errors.name.message}</>
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            w="full"
            isInvalid={Boolean(errors.projectName)}
          >
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="pool"
            >
              Matching Pool Amount
            </FormLabel>
            <Input
              id="pool"
              placeholder="Matching Pool"
              type="number"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('pool', {
                required: true,
              })}
            />
            {errors.pool && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                <>{errors.pool.message}</>
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            w="full"
            isInvalid={Boolean(errors.projectName)}
          >
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="projects"
            >
              Maximum Number of Participating Projects
            </FormLabel>
            <Input
              id="projects"
              placeholder="Participating Projects"
              type="number"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('projects', {
                required: true,
              })}
            />
            {errors.projects && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                <>{errors.projects.message}</>
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack w="full" gap="24px">
            <FormControl variant="withAddOn" isRequired w="full">
              <FormLabel fontSize={{ base: '12px', md: '14px' }} pb="0.5rem">
                Start Date
              </FormLabel>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                customInput={<DatePickerInput />}
                locale="en-gb"
                minDate={tomorrow} // restrict past and today's date selection
              />
            </FormControl>
            <FormControl variant="withAddOn" isRequired w="full">
              <FormLabel fontSize={{ base: '12px', md: '14px' }} pb="0.5rem">
                End Date
              </FormLabel>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                customInput={<DatePickerInput />}
                locale="en-gb"
                minDate={tomorrow} // restrict past and today's date selection
              />
            </FormControl>
          </HStack>
          <FormControl isRequired isInvalid={Boolean(errors.tagline)}>
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="short_description"
            >
              Description
            </FormLabel>
            <Textarea
              height={'100px'}
              resize="none"
              id="short_description"
              placeholder="A one sentence description of the Round"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('short_description', {
                required: true,
              })}
            />
            {errors.short_description && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                <>{errors.short_description.message}</>
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl w="full" isInvalid={Boolean(errors.colorScheme)}>
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="colorScheme"
            >
              Color Scheme
            </FormLabel>
            <Select
              borderColor="#141414"
              defaultValue={1}
              id="colorScheme"
              placeholder="Select color scheme"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('colorScheme')}
            >
              <option value="light">Teal</option>
              <option value="dark">Yellow</option>
              <option value="dark">Blue</option>
              <option value="dark">Green</option>
              <option value="dark">Purple</option>
            </Select>
            {errors.colorScheme && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                <>{errors.colorScheme.message}</>
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack w="full" pt="24px" justify={'space-between'}>
            <Button variant={'outline'}>Cancel</Button>
            <Button variant="apply_for_grant" type="submit">
              Submit Grant
            </Button>
          </HStack>
        </form>
      </Card>
      <Modal variant={'cubik'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <Box
                as="p"
                textStyle={{ base: 'title3', md: 'title2' }}
                color="neutral.11"
              >
                Approve from Wallet
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack pt="16px" align={'start'} gap="16px">
              <Box
                as="p"
                textStyle={{ base: 'body5', md: 'body3' }}
                color="white"
              >
                Sign the transaction to create a grant round
              </Box>
              {transactionError && (
                <Alert status="error" variant="cubik">
                  <AlertIcon />
                  <AlertDescription
                    fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                    lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                  >
                    {transactionError}
                  </AlertDescription>
                </Alert>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button w="8rem" variant="close_modal" onClick={() => {}}>
              Cancel
            </Button>
            <Button
              px="32px"
              variant="apply_for_grant"
              onClick={onSignTransaction}
              isLoading={signTransactionLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default CreateGrantRound;
