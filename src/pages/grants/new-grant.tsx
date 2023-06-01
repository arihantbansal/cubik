import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardFooter,
  Container,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { addDays } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, UseFormGetValues } from 'react-hook-form';
import { BiChevronLeft } from 'react-icons/bi';
import * as yup from 'yup';
import GrantStepOne from '~/components/pages/grants/create-grant/GrantStepOne';
import GrantStepTwo from '~/components/pages/grants/create-grant/GrantStepTwo';
import GrantStepZero from '~/components/pages/grants/create-grant/GrantStepZero';
import { connection, createRoundIx } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import * as anchor from '@coral-xyz/anchor';

registerLocale('en-gb', enGB);

export type FormData = {
  name: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  pool: string;
  projects: string;
  colorScheme: string;
  short_description: string;
  contact_email: string;
  detailed_description: string;
  round_managers: [string];
  requirements?: string;
  sponsors?: [{ name: string; logo: string }];
};
const schema = yup.object().shape({
  name: yup.string().required('Name is required for Round'),
  startDate: yup.date().required('Round Start Date is required'),
  endDate: yup.date().required('Round End Date is required'),
  amount: yup.number().required('Amount is required'),
  pool: yup.string().required('Matching Pool for Round is Required'),
  projects: yup
    .string()
    .required('Maximum No of participating projects is required'),
  colorScheme: yup.string(),
  short_description: yup.string().required('Short Description is required'),
  detailed_description: yup
    .string()
    .required('Detailed Description is required'),
  round_managers: yup.array().of(yup.string()),
  requirements: yup.string(),
  sponsors: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      logo: yup.string().required(),
    })
  ),
});

const CardFooterData = ({ step }: { step: number }) => {
  return (
    <>
      <Box
        display={step === 0 ? 'block' : 'none'}
        px="56px"
        pb="24px"
        textStyle={{ base: 'body4', md: 'body3' }}
        color={'neutral.9'}
      >
        For more detailed instructions on how to deploy a Grant Round,{' '}
        <Link style={{ color: '#8FFFF0' }} href="/about/grant">
          click here.
        </Link>
      </Box>
      <CardFooter
        display={step === 0 ? 'block' : 'none'}
        px="56px"
        py="32px"
        borderBottomRadius="16px"
        backgroundColor={'#141414'}
      >
        <Box
          as="p"
          textStyle={{ base: 'body4', md: 'body3' }}
          color="neutral.9"
        >
          <b>Note:</b> Multiple grant managers can be added to facilitate round
          management. By initiating a grant round, you do more than support
          projects - you cultivate an innovative community, contributing
          significantly to the future of Web3.
        </Box>
      </CardFooter>
    </>
  );
};

const CreateGrantRound = () => {
  const toast = useToast();
  const tomorrow = addDays(new Date(), 1);
  const anchorWallet = useAnchorWallet();
  const [step, setStep] = useState(0);
  const [endDate, setEndDate] = useState(tomorrow);
  const [startDate, setStartDate] = useState(tomorrow);
  const [editorData, setEditorData] = useState();
  const createRoundMutation = trpc.round.create.useMutation();
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [signTransactionLoading, setSignTransactionLoading] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      onOpen();
    }
  };

  const createRound = async (
    anchorWallet: any, // Add the specific type here
    name: string,
    pool: string,
    project: string,
    colorScheme: string,
    description: string,
    start: moment.Moment | null,
    end: moment.Moment | null,
    onClose: () => void,
    setTransactionError: (error: string | null) => void
  ) => {
    try {
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
        description: description,
        manager: (session?.user.username as string) ?? '',
      });
      onClose();
    } catch (error: any) {
      setTransactionError(error.message || 'Error while signing transaction');
    }
  };

  const onSignTransaction = async (
    startDate: Date,
    endDate: Date,
    description: string | undefined,
    getValues: UseFormGetValues<FormData>,
    setSignTransactionLoading: (_loading: boolean) => void,
    setTransactionError: (_error: string | null) => void,
    anchorWallet: any, // Add the specific type here
    onClose: () => void
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
        setTransactionError
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
      px={{ base: '1rem', sm: '1rem', md: '1rem', lg: '1rem' }}
      py={{ base: '2rem', md: '3rem' }}
    >
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
        <Card
          maxW="7xl"
          align="start"
          mx="auto"
          w={'full'}
          gap={{ base: '24px', md: step == 0 ? '24px' : '40px' }}
          padding={{ base: '24px', md: step === 0 ? '0px' : '40px' }}
        >
          {step === 0 ? (
            <GrantStepZero />
          ) : step === 1 ? (
            <GrantStepOne
              errors={errors}
              register={register}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          ) : step === 2 ? (
            <GrantStepTwo
              editorData={editorData}
              setEditorData={setEditorData}
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
            />
          ) : (
            <></>
          )}
          <HStack
            w="full"
            pt={{ base: '12px', md: step === 0 ? '0px' : '24px' }}
            px={{ base: '12px', md: step === 0 ? '56px' : '24px' }}
            justify={'space-between'}
          >
            {step > 0 && (
              <Button
                type="button" // make it explicit this doesn't submit
                variant={'cubikText'}
                leftIcon={<BiChevronLeft width={32} height={32} />}
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <Button
              type={step < 2 ? 'button' : 'submit'} // this will trigger form submission only at the last step
              variant="cubikFilled"
              size={{
                base: 'cubikMini',
                md: step === 0 ? 'cubikMedium' : 'cubikSmall',
              }}
              onClick={onSubmit} // onClick handler is needed for step 0 and 1
            >
              {step === 0 ? 'Get Started' : step === 1 ? 'Next Step' : 'Submit'}
            </Button>
          </HStack>
          <CardFooterData step={step} />
        </Card>
      </form>
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
                Sign Transaction
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
                Confirm all the information provided is correct and sign the
                transaction to create a grant round
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
            <Button
              w="8rem"
              variant="close_modal"
              onClick={() => {
                onClose();
                setTransactionError(null);
                setSignTransactionLoading(false);
              }}
            >
              Cancel
            </Button>
            <Button
              px="32px"
              variant="apply_for_grant"
              onClick={() =>
                onSignTransaction(
                  startDate,
                  endDate,
                  editorData,
                  getValues,
                  setSignTransactionLoading,
                  setTransactionError,
                  anchorWallet,
                  onClose
                )
              }
              isLoading={signTransactionLoading}
              loadingText="Confirming"
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
