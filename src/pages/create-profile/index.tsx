import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Collapse,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useDisclosure,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CardBody,
  CardHeader,
} from '@chakra-ui/react';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import * as anchor from '@coral-xyz/anchor';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  useWalletModal,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { HiCheck } from 'react-icons/hi';

import { v4 as uuidV4 } from 'uuid';
import * as yup from 'yup';
import { WalletAddress } from '~/components/common/wallet/WalletAdd';
import FramerCarousel from '~/components/pages/connect-wallet/create-profile/FramerNFTCarousel';
import ProfilePicture from '~/components/pages/connect-wallet/create-profile/ProfilePicture';
import { createUser, connection } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';

const onSuccess = () => {
  console.log('React query success');
};

const onError = () => {
  console.log('React query failure');
};

const CreateProfile = () => {
  const router = useRouter();
  const session = useSession();
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const anchorWallet = useAnchorWallet();
  const [userNameIsAvailable, setUserNameIsAvailable] = useState(false);
  const [pfp, setPFP] = useState<string>(
    `https://source.boringavatars.com/marble/120/${publicKey?.toBase58()}?square&?colors=05299E,5E4AE3,947BD3,F0A7A0,F26CA7,FFFFFF,CAF0F8,CCA43B`
  );
  const [userName, setUsername] = useState<string>('');
  const [creatingNewProfileLoadingState, setCreatingNewProfileLoadingState] =
    useState(false);
  const [loadingUserName, setLoadingUserName] = useState(false);

  console.log('4. create-profile rendered ', userName);
  const userCreateMutation = trpc.user.create.useMutation({
    onSuccess: (data) => {
      signIn('credentials', {
        callbackUrl: '',
        redirect: false,
        wallet: publicKey?.toBase58(),
      });
      //todo: redirecting
      router.push({
        pathname: '/[username]',
        query: { username: data.username },
      });
    },
  });

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
            console.log(usercheck, 's');

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setCreatingNewProfileLoadingState(true);

    const tx = new anchor.web3.Transaction();
    const ix = await createUser(anchorWallet as NodeWallet, data.username);
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = anchorWallet?.publicKey;
    tx.add(ix);
    const signTx = await anchorWallet?.signTransaction(tx);
    if (!signTx) return;
    const sig = await connection.sendRawTransaction(signTx?.serialize());
    console.log(sig);

    if (!sig) return;
    //todo: put transaction here
    userCreateMutation.mutate({
      username: data.username,
      id: uuidV4(),
      profilePicture: pfp,
      tx: sig,
      mainWallet: publicKey?.toBase58() as string,
    });
    if (session.status === 'authenticated') {
      setCreatingNewProfileLoadingState(false);
      console.log('user is authenticated');
      router.push({
        pathname: '/[username]',
        query: { username: session.data.user.username },
      });
    }
  };

  if (!connected) {
    <Card
      overflow="hidden"
      w="full"
      maxW={'24rem'}
      mx="auto"
      my="10rem"
      gap="1rem"
    >
      <Center w="full" h="full">
        <WalletMultiButton />
      </Center>
    </Card>;
  }

  // if (creatingNewProfileLoadingState) {
  //   return (
  //     <Card
  //       overflow="hidden"
  //       w="full"
  //       maxW={'24rem'}
  //       mx="auto"
  //       my="10rem"
  //       gap="1rem"
  //     >
  //       <Center w="full" h="full">
  //         <Spinner />
  //       </Center>
  //     </Card>
  //   );
  // }

  return (
    <Container maxW="full" py={{ base: '2rem', md: '4vh' }}>
      <Card
        background={'#080808'}
        borderRadius={'12px'}
        borderColor={'#141414'}
        overflow="hidden"
        maxW={'32rem'}
        mx="auto"
        gap={{ base: '36px', md: '56px' }}
        p={{ base: '22px', md: '32px' }}
        position="relative"
      >
        <Box
          as="svg"
          position="absolute"
          top="0%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={0}
          width="6rem"
          height="6rem"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'blur(100px)',
          }}
        >
          <circle cx="50" cy="50" r="50" fill="#C8F6F6" />
        </Box>
        <>
          <CardHeader gap="8px">
            <Box
              as="p"
              textStyle={{ base: 'title2', md: 'title1' }}
              color="neutral.11"
            >
              Create your account
            </Box>
            <Box
              as="p"
              textStyle={{ base: 'body5', md: 'body4' }}
              color="neutral.9"
            >
              Add details below to create your profile
            </Box>
          </CardHeader>
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
                <FormLabel
                  fontSize={{ base: 'xs', md: 'sm' }}
                  htmlFor="username"
                >
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
                    render={({
                      field: { onChange, ...field },
                    }: {
                      field: any;
                    }) => (
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
                              .catch((e) =>
                                console.log('6. validation error - ', e)
                              )
                              .finally(() =>
                                console.log('7. Validation ended')
                              );
                        }}
                      />
                    )}
                  />
                  {
                    <InputRightElement fontSize="18px">
                      {loadingUserName && (
                        <Spinner size={'xs'} thickness="1px" />
                      )}
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
              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: 'xs', md: 'sm' }}
                  htmlFor="publickey"
                >
                  Wallet Address
                </FormLabel>
                <HStack>
                  <Center
                    rounded="4px"
                    backgroundColor="#0F0F0F"
                    height="2.5rem"
                    px="1.3rem"
                    outline="1px solid #141414"
                    w="full"
                    m="0"
                  >
                    <WalletAddress
                      walletAddress={publicKey?.toBase58() as string}
                      size="xs"
                    />
                  </Center>
                  <Button
                    variant={'unstyled'}
                    border="1px solid #A8F0E630"
                    w="10rem"
                    lineHeight={{ base: '14px', md: '16px' }}
                    fontSize={'14px'}
                    fontWeight="400"
                    background="#A8F0E610"
                    color="#A8F0E6"
                    height="2.5rem"
                    _hover={{
                      background: '#A8F0E630',
                    }}
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    Change
                  </Button>
                </HStack>
                <FormErrorMessage>
                  {errors.publickey ? <>{errors.publickey.message}</> : <></>}
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
                <FormControl>
                  <Checkbox
                    px="4px"
                    gap={'4px'}
                    colorScheme="teal"
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  >
                    <Box
                      as="p"
                      textStyle={{ base: 'body5', md: 'body4' }}
                      color="neutral.9"
                    >
                      Accept{' '}
                      <Box as="span" color={'#A8F0E6'}>
                        Terms and Conditions
                      </Box>
                    </Box>
                  </Checkbox>
                </FormControl>
                <Button
                  variant={'create_account'}
                  w="full"
                  type="submit"
                  isLoading={creatingNewProfileLoadingState}
                  isDisabled={!isTermsAccepted}
                >
                  Create my account
                </Button>
                <Alert status="info" variant="cubik">
                  <AlertIcon />
                  <AlertDescription
                    fontSize={{ base: '10px', md: '11px', xl: '12px' }}
                    lineHeight={{ base: '14px', md: '14px', xl: '16px' }}
                  >
                    By clicking submit, you&apos;ll initiate a profile creation
                    transaction from connected wallet. Ensure you have enough
                    SOL to sign the transaction.
                  </AlertDescription>
                </Alert>
              </VStack>
            </form>
          </CardBody>
        </>
      </Card>
    </Container>
  );
};

export default CreateProfile;
