import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';
import FramerCarousel from './FramerNFTCarousel';
import { Controller, useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { FiChevronLeft } from 'react-icons/fi';
import * as anchor from '@coral-xyz/anchor';
import { connection, createUser } from '~/utils/program/contract';
import { supabase, useUser } from '~/utils/supabase';
import { yupResolver } from '@hookform/resolvers/yup';
import { trpc } from '~/utils/trpc';
import { FailureToast, SuccessToast } from '~/components/common/toasts/Toasts';
import { TruncatedAddr } from '~/components/common/wallet/WalletAdd';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useAuthStore } from '~/store/authStore';
import { v4 as uuidV4 } from 'uuid';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useUserStore } from '~/store/userStore';
import { UserModel } from '@prisma/client';
import { Player } from '@lottiefiles/react-lottie-player';

type CreateProfileStepThreeTypes = {
  handleSubmit: any;
  onOpen: any;
  onClose: any;
  isOpen: any;
  onPrevious: () => void;
};

const CreateProfileStepThree = ({
  onOpen,
  onClose,
  isOpen,
  onPrevious,
}: CreateProfileStepThreeTypes) => {
  const {
    isOpen: isTransactionModalOpen,
    onOpen: onTransactionModalOpen,
    onClose: onTransactionModalClose,
  } = useDisclosure();
  const [userName, setUsername] = useState<string>('');
  const { publicKey, connected } = useWallet();
  const [loadingUserName, setLoadingUserName] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [signingTransaction, setSigningTransaction] = useState(false);
  const [userNameIsAvailable, setUserNameIsAvailable] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [pfp, setPFP] = useState<string>(
    `https://source.boringavatars.com/marble/120/${publicKey?.toBase58()}?square&?colors=05299E,5E4AE3,947BD3,F0A7A0,F26CA7,FFFFFF,CAF0F8,CCA43B`
  );
  const anchorWallet = useAnchorWallet();
  const toast = useToast();
  const { user } = useUser(supabase);
  const { setUser, user: Users } = useUserStore();

  const UserProfilePicture = user?.data.user?.user_metadata.picture || pfp;
  const UserUserName = user?.data.user?.user_metadata.full_name
    .replace(/\s/g, '')
    .toLowerCase();

  const { key } = useAuthStore();

  const checkUsernameMutation = trpc.user.checkUsername.useMutation();
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(0, 'Username must be at least 4 characters')
      .max(15)
      .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric and no spaces')
      .test(
        'is-unique',
        // @ts-ignore
        async function (username: string) {
          setLoadingUserName(true); // Set loading state
          try {
            const usercheck = await checkUsernameMutation.mutateAsync({
              username: username,
            });

            setUsername(username);
            // await refetch();

            if (usercheck) {
              throw new yup.ValidationError(
                username + ' is not available',
                null,
                'username'
              );
            } else {
              return true;
            }
          } finally {
            setLoadingUserName(false); // Clear loading state
          }
        }
      ),
  });

  const {
    handleSubmit,
    trigger,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // todo: add user profile picture from google later
  });

  useEffect(() => {
    // reset error on open
    console.log('⛔️ clear error called');
    setTransactionError(null);
  }, [isTransactionModalOpen]);

  const userCreateMutation = trpc.user.create.useMutation({
    onSuccess: async () => {
      try {
        if (publicKey && connected) {
          const { data } = await axios.post('/api/me/login', {
            id: localStorage.getItem('anon_id'),
            signature: localStorage.getItem('anon_sig'),
          });
          localStorage.setItem('wallet_auth', data.data.access_token);
          setUser(data.data.user as UserModel);
          setProfileCreated(true);
          SuccessToast({ toast, message: 'Profile Created Successfully' });
          setSigningTransaction(false);
        } else {
          throw new Error('No signature found');
        }
      } catch (error: any) {
        FailureToast({ toast, message: error.message || 'Failed to Sign in' });
      }
    },
    onError: (error: any) => {
      FailureToast({ toast, message: error.message || 'Failed to Sign in' });
    },
  });

  const signTransaction = async (username: string) => {
    try {
      setSigningTransaction(true);
      const tx = new anchor.web3.Transaction();
      const ix = await createUser(anchorWallet as NodeWallet, username);
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signTx = await anchorWallet?.signTransaction(tx);
      if (!signTx) return null;
      const serialized_transaction = signTx.serialize();
      const sig = await connection.sendRawTransaction(serialized_transaction);
      setSigningTransaction(false);
      return sig;
    } catch (error) {
      // @ts-ignore
      setTransactionError(`${error.message}`);
      setSigningTransaction(false);
      return null;
    }
  };

  const handleTransactionSign = async ({
    data,
  }: {
    data: { username: string };
  }) => {
    setSigningTransaction(true);
    const sig = await signTransaction(data.username);
    if (!sig) return;
    userCreateMutation.mutate({
      username: data.username,
      id: localStorage.getItem('anon_id') ?? '',
      profilePicture: pfp,
      tx: sig,
      mainWallet: publicKey?.toBase58() as string,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    onTransactionModalOpen();
  };
  return (
    <>
      {' '}
      <CardBody>
        <form
          style={{
            gap: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            w="full"
            variant={'outline'}
            colorScheme={'pink'}
            isRequired
          >
            <FormLabel
              fontSize={{ base: 'xs', md: 'sm' }}
              htmlFor="profilePicture"
            >
              Profile Picture
            </FormLabel>
            <ProfilePicture
              onOpen={onOpen}
              onClose={onClose}
              isOpen={isOpen}
              pfp={UserProfilePicture}
            />
          </FormControl>
          <Collapse in={isOpen} animateOpacity>
            <FramerCarousel onClose={onClose} setPFP={setPFP} PFP={pfp} />
          </Collapse>{' '}
          <FormControl
            variant={'outline'}
            colorScheme={'pink'}
            isInvalid={!!errors.username}
            isRequired
          >
            <FormLabel fontSize={{ base: 'xs', md: 'sm' }} htmlFor="username">
              Username
            </FormLabel>

            <InputGroup>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ...field } }: { field: any }) => (
                  <Input
                    {...field}
                    autoComplete="false"
                    placeholder="@username"
                    onChange={({ target: { value } }) => {
                      setUserNameIsAvailable(false);
                      onChange(value);
                      if (value.length > 3)
                        trigger('username')
                          .then((res: boolean) => {
                            if (res) {
                              setUserNameIsAvailable(true);
                            }
                          })
                          .catch(
                            (e: any) =>
                              new Error(e.message || 'there was an error')
                          );
                    }}
                  />
                )}
              />
              {
                <InputRightElement fontSize="18px">
                  {loadingUserName && <Spinner size={'xs'} thickness="1px" />}
                  {!errors.username && userNameIsAvailable && (
                    <HiCheck color={'#A8F0E6'} />
                  )}
                </InputRightElement>
              }
            </InputGroup>
            <FormErrorMessage textAlign={'start'}>
              {errors.username && <>{errors.username.message}</>}
            </FormErrorMessage>
          </FormControl>
          <VStack
            p="0"
            pt={{ base: '24px', md: '56px' }}
            w="full"
            align={'start'}
            justify="start"
            gap={{ base: '8px', md: '18px' }}
          >
            {' '}
            <CardFooter>
              <Button
                w="full"
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant="cubikFilled"
                loadingText="Submitting"
                type="submit"
                isDisabled={!userNameIsAvailable}
              >
                Submit Profile
              </Button>
            </CardFooter>
            <Alert status="info" variant="cubik">
              <AlertIcon />
              <AlertDescription
                fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
              >
                By clicking submit, you&apos;ll initiate a profile creation
                transaction from connected wallet. Ensure you have enough SOL to
                sign the transaction.
              </AlertDescription>
            </Alert>
          </VStack>
        </form>
      </CardBody>
      <Modal
        closeOnOverlayClick={!profileCreated}
        variant={'cubik'}
        isOpen={isTransactionModalOpen}
        onClose={onTransactionModalClose}
      >
        <ModalOverlay />
        <ModalContent
          mx={{ base: '1rem', md: '0rem' }}
          overflow={'hidden'}
          position={'relative'}
          gap={{ base: '28px', md: '40px' }}
          _before={{
            content: '""',
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            rounded: '50%',
            filter: 'blur(80px)',
            width: '6rem',
            height: '6rem',
            background: 'linear-gradient(180deg, #A8F0E6 0%, #A8F0E6 100%)',
            borderRadius: '8px 8px 0px 0px',
            zIndex: '-1',
          }}
        >
          <ModalHeader>
            {profileCreated ? (
              <VStack w="full" gap={{ base: '18px', md: '24px' }}>
                <Center>
                  <Player
                    autoplay
                    keepLastFrame
                    loop={false}
                    src={
                      'https://lottie.host/79be0c13-acc1-4b37-b8f1-766b93fb0b1d/6Orce6R84W.json'
                    }
                    style={{ height: `150px`, width: `150px` }}
                  />
                </Center>
                <VStack spacing={{ base: '4px', md: '8px' }} w="full">
                  <Box as="p" textStyle={{ base: 'title2', md: 'headline4' }}>
                    Welcome to Cubik
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: 'title4', md: 'body3' }}
                    color="neutral.8"
                  >
                    You are all set to help your favorite projects.
                  </Box>
                </VStack>
                <Button
                  as={Link}
                  href={`/${userName}`}
                  size={{ base: 'cubikMini', md: 'cubikSmall' }}
                  variant="cubikOutlined"
                >
                  Go to profile
                </Button>
              </VStack>
            ) : (
              <VStack
                w="full"
                spacing={{ base: '4px', md: '8px' }}
                align={'center'}
                justify="center"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'title2', md: 'title1' }}
                  color="neutral.11"
                >
                  Review & Sign
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: 'body5', md: 'body4' }}
                  color="neutral.9"
                >
                  Sign transaction to create Profile
                </Box>
              </VStack>
            )}
          </ModalHeader>
          {!profileCreated && (
            <>
              <ModalBody>
                <VStack align={'start'} spacing={{ base: '16px', md: '32px' }}>
                  <Avatar
                    outline="1px solid white"
                    src={pfp}
                    width={{ base: '64px', md: '84px' }}
                    height={{ base: '64px', md: '84px' }}
                    borderRadius={'8px'}
                  />
                  <VStack align={'start'} spacing={{ base: '4px', md: '8px' }}>
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title5' }}
                      color={'neutral.6'}
                    >
                      Username
                    </Box>
                    <Box
                      as="p"
                      textStyle={{ base: 'title5', md: 'title4' }}
                      color={'neutral.11'}
                    >
                      @{userName}
                    </Box>
                  </VStack>
                  <VStack align={'start'} spacing={{ base: '4px', md: '8px' }}>
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title5' }}
                      color={'neutral.6'}
                    >
                      Wallet Address
                    </Box>
                    {publicKey && (
                      <Box
                        as="p"
                        textStyle={{ base: 'title5', md: 'title4' }}
                        color={'neutral.11'}
                      >
                        {TruncatedAddr({
                          walletAddress: publicKey?.toBase58(),
                        })}
                      </Box>
                    )}
                  </VStack>
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
              <ModalFooter
                display="flex"
                h={'fit-content'}
                justifyContent={profileCreated ? 'center' : 'space-between'}
                w="full"
              >
                <Button
                  size={{ base: 'cubikMini', md: 'cubikSmall' }}
                  variant="cubikOutlined"
                  onClick={() => {
                    onTransactionModalClose();
                    setTransactionError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size={{ base: 'cubikMini', md: 'cubikSmall' }}
                  variant="cubikFilled"
                  px="32px"
                  loadingText="Confirming"
                  onClick={() =>
                    handleTransactionSign({ data: { username: userName } })
                  }
                  isLoading={signingTransaction}
                >
                  Sign Transaction
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProfileStepThree;
