import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  DrawerHeader,
  useToast,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import * as anchor from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { ProjectJoinRoundStatus, ProjectsModel, ProjectVerifyStatus } from '@cubik/database';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { watch } from 'fs';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BsPlus } from 'react-icons/bs';
import { v4 as uuidV4 } from 'uuid';
import NoInformation from '~/components/common/empty-state/NoInformation';
import { SuccessToast } from '~/components/common/toasts/Toasts';
import EmptyStateHOC from '~/components/HOC/EmptyState';
import { useUserStore } from '~/store/userStore';
import { HackathonTracks } from '~/types/hackathon';
import { connection, projectJoinHackathon, ProjectJoinRound } from '~/utils/program/contract';
import { trpc } from '~/utils/trpc';
import { GroupBase, OptionsOrGroups, Select } from 'chakra-react-select';
import { track } from 'mixpanel-browser';

type FormData = {
  selectedProjectId: string | null;
  tracks: HackathonTracks[];
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hackathonId: string;
  hackathonLogo: string;
  hackathonDescription: string;
  hackathonTracks?: HackathonTracks[];
  hackathonName: string;
}
// todo make upcoming live grants separate
const SelectProjectToSubmitToHackathon = ({
  isOpen,
  onClose,
  hackathonId,
  hackathonLogo,
  hackathonDescription,
  hackathonTracks,
  hackathonName,
}: Props) => {
  console.log('hackathonTracks', hackathonTracks);
  const { user } = useUserStore();
  const toast = useToast();
  const anchorWallet = useAnchorWallet();
  const {
    control,
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
    getValues,
    setError,
    getFieldState,
  } = useForm<FormData>();

  const [signTransactionLoading, setsignTransactionLoading] = useState(false);
  const [transactionSignError, setTransactionSignError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const joinHackathonMutation = trpc.hackathon.projectJoinHackathon.useMutation({
    onSuccess: () => {
      ('success');
    },
  });

  const userProjects = trpc.project.projectsHackathonSubmit.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  // todo: update this
  const sendTransaction = async (projectUserCount: number) => {
    try {
      const tx = new anchor.web3.Transaction();
      const ix = await projectJoinHackathon(
        anchorWallet as NodeWallet,
        projectUserCount,
        1,
        'AhFfjBPCoNRDExEDFYuNK2NXCWNa1gi2VUbdA7cF19CD',
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = anchorWallet?.publicKey;
      tx.add(ix);
      const signTx = await anchorWallet?.signTransaction(tx);
      if (!signTx) throw new Error('Failed to sign transaction');
      const serialized_transaction = signTx.serialize();
      const sig = await connection.sendRawTransaction(serialized_transaction);
      if (!sig) throw new Error('Failed to send transaction');
      return sig;
    } catch (error: any) {
      setTransactionSignError(error.message || 'There was some error');
      return null;
    }
  };

  const signTransactionHandler = async () => {
    try {
      setsignTransactionLoading(true);
      if (!hackathonId) return;

      const sig = await sendTransaction(
        userProjects.data?.find(e => e.id === selectedProject)?.projectUserCount as number,
      );
      if (!sig) return;
      joinHackathonMutation.mutate({
        hackathonId: hackathonId as string,
        projectId: selectedProject as string,
        tx: sig,
        tracks: [], // add tracks here
      });
      setsignTransactionLoading(false);
      onClose();
      SuccessToast({ toast, message: 'Submission Successful' });
    } catch (error) {
      error;
      setsignTransactionLoading(false);
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    const project = userProjects?.data?.find(project => project.id === selectedProjectId);
    if (!project) return;

    setSelectedProject(project.id);
    onModalOpen();
  };

  const Tile: React.FC<{
    tileIndex: string;
    joinRoundStatus?: ProjectJoinRoundStatus | undefined;
    isHackathon: boolean | undefined;
    name: string;
    logo: string;
    status: ProjectVerifyStatus;
  }> = ({ tileIndex, logo, joinRoundStatus, isHackathon = false, name }) => {
    const isSelected = selectedProjectId === tileIndex;

    return (
      <HStack
        border={isSelected ? '2px solid' : '2px dashed'}
        borderColor={isSelected ? '#14665B' : '#ffffff10'}
        backgroundColor={isSelected ? '#010F0D' : 'transparent'}
        p={{ base: '16px', md: '32px' }}
        w="full"
        gap="24px"
        rounded="20px"
        justify={'space-between'}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        onClick={() => {
          if (isHackathon) {
            setSelectedProjectId(tileIndex);

            return;
          }
          if (status === 'VERIFIED' || !joinRoundStatus) {
            setSelectedProjectId(tileIndex);
          } else {
            return;
          }
        }}
        position="relative"
        overflow={'hidden'}
        _after={{
          content: '""',
          zIndex: '1',
          position: 'absolute',
          bottom: '50%',
          left: '0%',
          transform: 'translate(0%, -50%)',
          width: '8rem',
          height: '8rem',
          backgroundColor: isSelected ? '#14665B' : '#ffffff10',
          filter: 'blur(100px)',
          borderRadius: 'full',
        }}
      >
        <VStack align={'start'} spacing="24px">
          <VStack align="start" w="full" spacing="12px">
            <Stack
              w="full"
              direction="row"
              gap={{ base: '8px', sm: '12px', md: '16px' }}
              align="center"
            >
              <Avatar
                src={logo}
                name={name}
                borderRadius={'8px'}
                width={{ base: '36px', sm: '48px', md: '52px' }}
                height={{ base: '36px', sm: '48px', md: '52px' }}
              />
              <Box
                as="p"
                textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {name}
              </Box>
            </Stack>
          </VStack>
        </VStack>
        <Center
          rounded="full"
          border="3px solid"
          w="30px"
          h="30px"
          borderColor={isSelected ? '#14665B' : '#ADB8B6'}
          p="4px"
        >
          <Center rounded="full" w="full" h="full" backgroundColor={isSelected ? '#14665B' : ''} />
        </Center>
      </HStack>
    );
  };

  return (
    <>
      <Drawer size={'sm'} placement="bottom" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay color="rgba(0, 0, 0, 0.72)" backdropFilter="blur(8px)" />
        <DrawerContent
          borderColor={'#1D1F1E'}
          borderBottom={'none'}
          borderTopRadius={'24px'}
          background="#080808"
          maxW="50rem !important"
          mx="auto"
          p="0"
        >
          <DrawerCloseButton
            transform={'translateY(-3rem)'}
            rounded="full"
            backgroundColor="#141414"
          />
          <DrawerHeader roundedTop={'24px'} bg="neutral.3" px="40px">
            <HStack gap="18px">
              <Avatar borderRadius="8px" size="lg" src={hackathonLogo} />
              <VStack gap="8xp" align={'start'}>
                <Box as="p" textStyle="title2" color="neutral.11">
                  {hackathonName}
                </Box>
                <Box as="p" textStyle="body4" color="neutral.9" noOfLines={1} maxW="80%">
                  {hackathonDescription}
                </Box>
              </VStack>
            </HStack>{' '}
          </DrawerHeader>
          <DrawerBody px="40px" pb="40px" pt="20px" minH={'20rem'}>
            <VStack align={'start'} spacing="24px" w="full">
              <Box
                fontSize={{ base: '16px', md: '18px' }}
                as="p"
                textStyle="title2"
                color="neutral.11"
              >
                Choose Project
              </Box>
              {userProjects.isLoading ? (
                <Center w="full" height="10rem">
                  <Spinner />
                </Center>
              ) : userProjects.data && userProjects.data.length > 0 ? (
                <VStack w="full" gap="24px">
                  {userProjects.data?.map((project, index) => (
                    <Tile
                      key={project.id}
                      tileIndex={project.id}
                      logo={project.logo}
                      name={project.name}
                      status={project.status}
                      isHackathon={true}
                      joinRoundStatus={'APPROVED'}
                    />
                  ))}
                </VStack>
              ) : (
                <VStack py="4rem" justify={'center'}>
                  <EmptyStateHOC
                    heading={'No Project Found'}
                    subHeading={
                      'You have not submitted any project and you can not apply for grant'
                    }
                    margin={'1rem'}
                  />
                  <Button
                    variant="cubikFilled"
                    size={'cubikSmall'}
                    as={Link}
                    href="/submit-project"
                    leftIcon={<BsPlus width={20} height={20} />}
                  >
                    New Project
                  </Button>
                </VStack>
              )}
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Controller
                  control={control}
                  name="tracks"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { error },
                  }) => (
                    <FormControl isInvalid={Boolean(errors.tracks)} id="tracks">
                      <HStack w="full" pb="0.5rem" justify={'space-between'}>
                        <FormLabel
                          fontSize={{ base: '16px', md: '18px' }}
                          pb="0.5rem"
                          htmlFor="tracks"
                          color="neutral.11"
                        >
                          Choose Categories
                        </FormLabel>
                        <Box
                          as="p"
                          fontSize={{ base: '10px', md: '12px' }}
                          color={'neutral.7'}
                          fontWeight={'600'}
                        >
                          {watch('tracks') ? watch('tracks').length : '0'}
                        </Box>
                      </HStack>
                      <Select
                        isMulti
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        //@ts-ignore
                        options={
                          hackathonTracks?.map(track => ({
                            value: track.trackName,
                            label: track.trackName,
                          })) || []
                        }
                        placeholder="Search Categories..."
                        closeMenuOnSelect={false}
                        selectedOptionStyle="check"
                        variant="unstyled"
                        focusBorderColor="transparent"
                        chakraStyles={{
                          container: (provided, state) => ({
                            ...provided,
                            border: 'none',
                            background: 'surface.input_field',
                            outline: '0px !important',
                            borderRadius: '8px',
                            height: '40px',
                            boxShadow: errors.tracks ? '0 0 0 2px #E53E3E' : '0',
                            ps: '0rem',
                            w: 'full',
                            ':focus': {
                              outline: 'none',
                              boxShadow: '0',
                              border: 'none',
                            },
                            ':hover': {
                              outline: 'none',
                              boxShadow: '0 !important',
                              border: 'none !important',
                            },
                            ':active': {
                              outline: 'none',
                              boxShadow: '0',
                              border: 'none',
                            },
                            ':selected': {
                              outline: 'none',
                              boxShadow: '0',
                              border: 'none',
                            },
                            ':invalid': {
                              boxShadow: '0 0 0 2px #E53E3E',
                            },
                          }),
                          inputContainer: (provided, state) => ({
                            ...provided,
                            ps: '8px',
                            fontSize: { base: '12px', md: '14px' },
                            backgroundColor: 'transparent',
                            //  border: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                          }),
                          valueContainer: (provided, state) => ({
                            ...provided,
                            ps: '8px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            outline: 'none',
                          }),

                          clearIndicator: (provided, state) => ({
                            ...provided,
                            display: 'none',
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            background: '',
                            borderColor: 'transparent !important',
                            outline: '0px !important',
                            boxShadow: '0',
                            p: 0,
                            w: '60px',
                          }),
                          indicatorSeparator: (provided, state) => ({
                            ...provided,
                            display: 'none',
                          }),
                          menu: (provided, state) => ({
                            ...provided,
                            //border: 'none',
                            transform: 'translateY(-10px)',
                            backgroundColor: '#0F0F0F',
                          }),
                          menuList: (provided, state) => ({
                            ...provided,
                            backgroundColor: '#0F0F0F',
                            border: '1px solid #141414',
                            borderTop: 'none',
                            borderTopRadius: 'none',
                            boxShadow: 'none',
                            padding: '0px',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: 'neutral.11',
                            fontSize: { base: '12px', md: '14px' },
                            fontWeight: '400',
                            backgroundColor: state.isSelected
                              ? '#010F0D'
                              : state.isFocused
                              ? '#010F0D'
                              : '#0F0F0F',
                            _hover: {
                              backgroundColor: '#010F0D',
                            },
                            ':active': {
                              backgroundColor: '#0F0F0F',
                            },
                          }),
                          control: (provided, state) => ({
                            ...provided,
                            border: 'none',
                            backgroundColor: '#0F0F0F',
                            boxShadow: 'none',
                            outline: 'none',
                            ':hover': {
                              border: 'none',
                              backgroundColor: '#0F0F0F',
                            },
                          }),
                          placeholder: (provided, state) => ({
                            ...provided,
                            textAlign: 'start',
                            fontSize: { base: '12px', md: '14px' },
                            color: '#3B3D3D',
                            px: '1rem',
                          }),
                        }}
                      />
                      <FormErrorMessage>{errors.tracks && errors.tracks.message}</FormErrorMessage>
                    </FormControl>
                  )}
                />
                <VStack py="24px" w={'full'}>
                  <Button
                    w="8rem"
                    ms={'auto'}
                    variant="cubikFilled"
                    type="submit"
                    isDisabled={selectedProjectId === null}
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal variant={'cubik'} isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent
          minW={{ base: '24rem', md: '36rem' }}
          overflow={'hidden'}
          position={'relative'}
          gap={{ base: '32px', md: '48px' }}
          textAlign={'center'}
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
            <VStack w="full" spacing="8px" align={'center'} justify="center">
              <Box as="p" textStyle="title1" color="neutral.11">
                Submit Grant Application
              </Box>
              <Box as="p" textStyle="body4" color="neutral.9">
                Sign transaction to Perform the action
              </Box>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack textAlign={'start'} align={'start'} spacing="24px">
              <VStack align={'start'} spacing="16px">
                <HStack align={'start'} gap="16px">
                  <Avatar
                    src={userProjects.data?.find(e => e.id === selectedProject)?.logo}
                    name={userProjects.data?.find(e => e.id === selectedProject)?.name}
                    borderRadius="8px"
                    width={{ base: '60px', md: '80px' }}
                    height={{ base: '60px', md: '80px' }}
                  />
                  <VStack textAlign={'start'} align={'start'} gap="8px">
                    <Box as="p" textStyle={{ base: 'title3', md: 'title2' }} color="neutral.11">
                      {userProjects.data?.find(e => e.id === selectedProject)?.name}
                    </Box>
                    <Box as="p" textStyle={{ base: 'title6', md: 'title5' }} color="neutral.8">
                      {userProjects.data?.find(e => e.id === selectedProject)?.short_description}
                    </Box>
                  </VStack>
                </HStack>
              </VStack>
              <Stack justify={'start'} gap="32px" direction={{ base: 'column', md: 'row' }}>
                <VStack align={'start'} textAlign="start" spacing="8px">
                  <Box
                    as="p"
                    textStyle={{ base: 'title6', md: 'title5' }}
                    color="neutral.6"
                    textTransform={'uppercase'}
                  >
                    Applying For Grant Round
                  </Box>
                  <Box as="p" textStyle={{ base: 'title6', md: 'title5' }} color="neutral.11">
                    {hackathonName}
                  </Box>
                </VStack>
              </Stack>
              <VStack align={'start'} spacing="32px">
                {transactionSignError && (
                  <Alert status="error" variant="cubik">
                    <AlertIcon />
                    <AlertDescription
                      fontSize={{
                        base: '10px',
                        md: '11px',
                        xl: '12px',
                      }}
                      lineHeight={{
                        base: '14px',
                        md: '14px',
                        xl: '16px',
                      }}
                    >
                      {}
                    </AlertDescription>
                  </Alert>
                )}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" h={'fit-content'} justifyContent="space-between">
            <Button w="8rem" variant="cubikOutlined" size="cubikSmall" onClick={onClose}>
              Cancel
            </Button>
            <Button
              px="32px"
              variant="cubikFilled"
              size="cubikSmall"
              onClick={signTransactionHandler}
              loadingText="Verifying"
              isLoading={signTransactionLoading}
            >
              Sign Transaction
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectProjectToSubmitToHackathon;
