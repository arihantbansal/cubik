import {
  Button,
  Card,
  Center,
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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWallet } from '@solana/wallet-adapter-react';
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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [userNameIsAvailable, setUserNameIsAvailable] =
    useState<boolean>(false);
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

  const {
    isLoading: usernameStatusLoading,
    isError: usernameStatusError,
    data: usernameStatusResponse,
    refetch,
  } = trpc.user.checkUsername.useQuery(
    {
      username: userName as string,
    },
    {
      cacheTime: 0,
      enabled: false,
      onSuccess,
      onError,
    }
  );

  console.log(
    '5. usernameStatusResponse - ',
    usernameStatusLoading,
    usernameStatusError,
    usernameStatusResponse
  );

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
          console.log('1. refetching username -', username);
          setLoadingUserName(true); // Set loading state
          try {
            await refetch();
            setUsername(username);
            console.log('2. setUsername - ', username);
            if (usernameStatusError) {
              console.log('3. return error');
              throw new yup.ValidationError('trpc error');
            } else if (usernameStatusResponse) {
              console.log('3. return - error');
              throw new yup.ValidationError(
                username + ' is not available',
                null,
                'username'
              );
            } else {
              console.log('3. return - true');
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
    await userCreateMutation.mutate({
      username: data.username,
      id: uuidV4(),
      profilePicture: pfp,
      tx: 'afsdsdad',
      mainWallet: publicKey?.toBase58() as string,
    });
  };

  if (creatingNewProfileLoadingState || !publicKey) {
    return (
      <Card
        overflow="hidden"
        w="full"
        maxW={'24rem'}
        mx="auto"
        my="10rem"
        gap="1rem"
      >
        <Center w="full" h="full">
          <Spinner />
        </Center>
      </Card>
    );
  }

  if (!connected) {
    return <>404</>;
  }
  if (session.status === 'authenticated') {
    console.log('session user', session.data.user);
    router.push({
      pathname: '/[username]',
      query: { username: session.data.user.username },
    });
  }
  console.log('session status', session.status);

  return (
    <Container maxW="full" py={{ base: '2rem', md: '4rem' }}>
      <Card
        overflow="hidden"
        maxW={'24rem'}
        mx="auto"
        gap="1rem"
        p={{ base: '22px', md: '32px' }}
      >
        <FormControl
          w="full"
          pb="1rem"
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
          <ProfilePicture onOpen={onOpen} pfp={pfp} />
        </FormControl>
        <Collapse in={isOpen} animateOpacity>
          <FramerCarousel onClose={onClose} setPFP={setPFP} PFP={pfp} />
        </Collapse>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            pb="1rem"
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
                    onChange={({ target: { value } }) => {
                      setUserNameIsAvailable(false);
                      onChange(value);
                      if (value.length > 3)
                        trigger('username')
                          .then((res: boolean) => {
                            console.log(
                              '6. Validation returned response -',
                              res
                            );
                            if (res) {
                              setUserNameIsAvailable(true);
                            }
                          })
                          .catch((e) =>
                            console.log('6. validation error - ', e)
                          )
                          .finally(() => console.log('7. Validation ended'));
                    }}
                  />
                )}
              />
              {
                <InputRightElement fontSize="18px">
                  {loadingUserName && <Spinner size={'xs'} thickness="1px" />}
                  {!errors.username && userNameIsAvailable && (
                    <HiCheck color={'green'} />
                  )}
                </InputRightElement>
              }
            </InputGroup>
            <FormErrorMessage textAlign={'start'}>
              {errors.username && <>{errors.username.message}</>}
            </FormErrorMessage>
          </FormControl>
          {/* ---- wallet ---- */}
          <FormControl pb="1rem" isRequired>
            <FormLabel fontSize={{ base: 'xs', md: 'sm' }} htmlFor="publickey">
              Wallet Address
            </FormLabel>
            <HStack gap="0.5rem">
              <Center
                rounded="4px"
                bg="#242424"
                height="2.5rem"
                px="1.3rem"
                outline="1px solid #242424"
                w="full"
              >
                <WalletAddress
                  walletAddress={publicKey?.toBase58() as string}
                  size="xs"
                />
              </Center>
            </HStack>
            <FormErrorMessage>
              {errors.publickey ? <>{errors.publickey.message}</> : <></>}
            </FormErrorMessage>
          </FormControl>
          <Button
            variant={'connect_wallet'}
            mt={'3rem'}
            w="full"
            type="submit"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreateProfile;
