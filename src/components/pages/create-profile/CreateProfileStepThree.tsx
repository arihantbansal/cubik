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
import React, { useState } from 'react';
import ProfilePicture from './ProfilePicture';
import FramerCarousel from './FramerNFTCarousel';
import { Controller, useForm } from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';
import { FiChevronLeft } from 'react-icons/fi';
import submitProject from '~/pages/submit-project';
import * as anchor from '@coral-xyz/anchor';
import { connection, createUser } from '~/utils/program/contract';
import { supabase, useUser } from '~/utils/supabase';
import { yupResolver } from '@hookform/resolvers/yup';
import { trpc } from '~/utils/trpc';
import { FailureToast, SuccessToast } from '~/components/common/toasts/Toasts';
import {
  TruncatedAddr,
  WalletAddress,
} from '~/components/common/wallet/WalletAdd';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { signIn } from 'next-auth/react';
import { useAuthStore } from '~/store/authStore';
import { v4 as uuidV4 } from 'uuid';

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
  console.log('user - ', user);
  const UserProfilePicture = user?.data.user?.user_metadata.picture || pfp;
  const username = user?.data.user?.user_metadata.full_name
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: username,
      ProfilePicture: UserProfilePicture,
    },
  });

  const userCreateMutation = trpc.user.create.useMutation({
    onSuccess: async () => {
      try {
        console.log('verifying wallet -3');
        if (
          key.sig &&
          key.wallet === publicKey?.toBase58() &&
          publicKey &&
          connected
        ) {
          const signInResponse = await signIn('credentials', {
            signature: key.sig,
            redirect: false,
            wallet: publicKey?.toBase58(),
          });
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
      id: uuidV4(),
      profilePicture: pfp,
      tx: sig,
      mainWallet: publicKey?.toBase58() as string,
    });
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
          //@ts-ignore
          onSubmit={handleSubmit(onsubmit)} /// @irffan this is causing trouble check once
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
              pfp={pfp}
            />
          </FormControl>
          <Collapse in={isOpen} animateOpacity>
            <FramerCarousel onClose={onClose} setPFP={setPFP} PFP={pfp} />
          </Collapse>
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
                defaultValue=""
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
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant={'cubikText'}
                leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
                onClick={() => onPrevious()}
              >
                Previous
              </Button>
              <Button
                size={{ base: 'cubikMini', md: 'cubikSmall' }}
                variant="cubikFilled"
                loadingText="Submitting"
                type="submit"
              >
                Submit Profile
              </Button>
            </CardFooter>
            {/* <Alert status="info" variant="cubik">
              <AlertIcon />
              <AlertDescription
                fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
              >
                By clicking submit, you&apos;ll initiate a profile creation
                transaction from connected wallet. Ensure you have enough SOL to
                sign the transaction.
              </AlertDescription>
            </Alert> */}
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
          overflow={'hidden'}
          position={'relative'}
          gap="40px"
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
              <VStack w="full" gap="24px">
                <Center>
                  <svg
                    width="96"
                    height="96"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.24">
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M95.9925 48.8377C95.5299 75.3433 73.6678 96.4552 47.1623 95.9925C20.6567 95.5299 -0.455195 73.6678 0.00746113 47.1623C0.470117 20.6567 22.3322 -0.455195 48.8377 0.00746113C75.3433 0.470117 96.4552 22.3322 95.9925 48.8377Z"
                        fill="url(#paint0_linear_849_10088)"
                      />
                      <path
                        d="M95.8925 48.836C95.4309 75.2863 73.6144 96.3542 47.164 95.8925C20.7137 95.4309 -0.354246 73.6144 0.107446 47.164C0.569138 20.7137 22.3856 -0.354246 48.836 0.107446C75.2863 0.569138 96.3542 22.3856 95.8925 48.836Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <g opacity="0.24">
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="#007A6A"
                      />
                      <path
                        d="M83.9942 48.6283C83.6472 68.5074 67.2507 84.3414 47.3715 83.9944C27.4924 83.6474 11.6584 67.2509 12.0054 47.3717C12.3524 27.4926 28.7489 11.6586 48.6281 12.0056C68.5073 12.3526 84.3412 28.7491 83.9942 48.6283Z"
                        fill="url(#paint1_linear_849_10088)"
                      />
                      <path
                        d="M83.8942 48.6265C83.5482 68.4505 67.1972 84.2404 47.3733 83.8944C27.5493 83.5484 11.7594 67.1974 12.1054 47.3735C12.4514 27.5495 28.8024 11.7596 48.6264 12.1056C68.4503 12.4516 84.2403 28.8026 83.8942 48.6265Z"
                        stroke="white"
                        strokeOpacity="0.18"
                        strokeWidth="0.2"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      fill="url(#paint2_linear_849_10088)"
                    />
                    <g clipPath="url(#clip0_849_10088)">
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="#14665B"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        fill="url(#paint3_linear_849_10088)"
                        fill-opacity="0.48"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="#14665B"
                        strokeWidth="0.710526"
                      />
                      <path
                        d="M55.8593 44.3091L55.8594 44.309C56.3557 43.8128 56.3557 43.0195 55.8594 42.5233C55.3632 42.027 54.5699 42.027 54.0737 42.5233L45.2499 51.3471L42.2927 48.3899C41.7965 47.8937 41.0032 47.8937 40.507 48.3899C40.0108 48.8862 40.0108 49.6794 40.507 50.1757L44.3478 54.0165C44.844 54.5127 45.6464 54.5128 46.1426 54.0166C46.1427 54.0166 46.1427 54.0166 46.1427 54.0165L55.8593 44.3091Z"
                        stroke="url(#paint4_linear_849_10088)"
                        strokeOpacity="0.48"
                        strokeWidth="0.710526"
                      />
                    </g>
                    <rect
                      x="25.0001"
                      y="25"
                      width="46"
                      height="46"
                      rx="23"
                      stroke="#001F1B"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_849_10088"
                        x1="48"
                        y1="0"
                        x2="48"
                        y2="96"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_849_10088"
                        x1="47.9998"
                        y1="12"
                        x2="47.9998"
                        y2="84"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_849_10088"
                        x1="25.0001"
                        y1="25"
                        x2="71.0001"
                        y2="71"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#B3FFF5" />
                        <stop offset="1" stopColor="#5ACCBD" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_849_10088"
                        x1="48.1832"
                        y1="42.5063"
                        x2="48.1832"
                        y2="54.0334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopOpacity="0" />
                        <stop offset="1" />
                      </linearGradient>
                      <clipPath id="clip0_849_10088">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(37.0001 37)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Center>
                <VStack spacing="8px" w="full">
                  <Box as="h1" textStyle={'headline4'}>
                    Welcome to Cubik
                  </Box>
                  <Box as="p" textStyle={'body3'} color="neutral.8">
                    You are all set to help your favorite projects.
                  </Box>
                </VStack>
                <Button
                  as={Link}
                  href={`/${userName}`}
                  size={{ base: 'sm', md: 'md' }}
                  w="12rem"
                  variant="cubikOutlined"
                >
                  Go to profile
                </Button>
              </VStack>
            ) : (
              <VStack w="full" spacing="8px" align={'center'} justify="center">
                <Box as="p" textStyle="title1" color="neutral.11">
                  Review & Sign
                </Box>
                <Box as="p" textStyle="body4" color="neutral.9">
                  Sign transaction to create Profile
                </Box>
              </VStack>
            )}
          </ModalHeader>
          {!profileCreated && (
            <>
              <ModalBody>
                <VStack align={'start'} spacing="32px">
                  <Avatar
                    outline="1px solid white"
                    src={pfp}
                    width="84px"
                    height="84px"
                    borderRadius={'8px'}
                  />
                  <VStack align={'start'} spacing="8px">
                    <Box as="p" textStyle="title5" color={'neutral.6'}>
                      Username
                    </Box>
                    <Box as="p" textStyle="title4" color={'neutral.11'}>
                      @{userName}
                    </Box>
                  </VStack>
                  <VStack align={'start'} spacing="8px">
                    <Box as="p" textStyle="title5" color={'neutral.6'}>
                      Wallet Address
                    </Box>
                    {publicKey && (
                      <Box as="p" textStyle="title4" color={'neutral.11'}>
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
                  w="8rem"
                  size={{ base: 'sm', md: 'md' }}
                  variant="cubikOutlined"
                  onClick={() => {
                    onTransactionModalClose();
                    setTransactionError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size={{ base: 'sm', md: 'md' }}
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
