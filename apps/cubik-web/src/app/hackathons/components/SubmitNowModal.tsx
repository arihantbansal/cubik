'use client';

import React, { useState } from 'react';
import { EmptyStateHOC } from '@/app/components/common/empty-state/EmptyStateHOC';
import { SuccessToast } from '@/app/components/toasts/Toasts';
import { useUser } from '@/app/context/user';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tag,
  useToast,
  VStack,
} from '@/utils/chakra';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'chakra-react-select';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import type {
  ProjectJoinRoundStatus,
  ProjectVerifyStatus,
} from '@cubik/database';

import {
  createJoinHackathon,
  getUserProjects,
  isValidProject,
} from './userProjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hackathonId: string;
  hackathonLogo: string;
  hackathonDescription: string;
  hackathonTracks?: {
    value: string;
    label: string;
  }[];
  hackathonName: string;
}
type FormData = {
  mainTrack: string;
  selectedProjectId: string | null;
  tracks: {
    value: string;
    label: string;
  }[];
};
export const SubmitNowModal = ({
  isOpen,
  hackathonId,
  hackathonName,
  onClose,
  hackathonTracks,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      mainTrack: 'fully_on_chain_game',
    },
  });

  const [step, setStep] = useState(0);
  const [signTransactionLoading, setsignTransactionLoading] = useState(false);
  const [transactionSignError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const { user } = useUser();
  const toast = useToast();
  const userProjects = useQuery({
    queryKey: ['userProjects', user?.mainWallet],
    queryFn: ({ queryKey }) => getUserProjects(queryKey[1] as string),
    enabled: user ? true : false,
  });

  const selectedArray = useQuery({
    queryKey: ['selectArray', user?.mainWallet],
    queryFn: ({ queryKey }) => isValidProject(queryKey[1] as string),
    enabled: user ? true : false,
  });

  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const signTransactionHandler = async () => {
    try {
      setsignTransactionLoading(true);
      if (!hackathonId) return;

      // const sig = await sendTransaction(
      //   userProjects.data?.find((e) => e.id === selectedProject)
      //     ?.projectUserCount as number
      // );
      await createJoinHackathon(
        hackathonId,
        selectedProjectId as string,
        getValues('tracks'),
      );
      setsignTransactionLoading(false);
      onClose();
      setStep(0);
      SuccessToast({ toast, message: 'Submission Successful' });
    } catch (error) {
      error;
      setsignTransactionLoading(false);
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FormData> = async () => {
    const project = userProjects?.data?.find(
      (project) => project.id === selectedProjectId,
    );
    if (!project) return;

    setSelectedProject(project.id);
    setStep(1); // proceed to the second step instead of opening the modal
  };

  const Tile: React.FC<{
    isSelectAble: boolean;
    tileIndex: string;
    joinRoundStatus?: ProjectJoinRoundStatus | undefined;
    isHackathon: boolean | undefined;
    name: string;
    logo: string;
    status: ProjectVerifyStatus;
  }> = ({
    tileIndex,
    logo,
    joinRoundStatus,
    isHackathon = false,
    name,
    isSelectAble = true,
  }) => {
    const isSelected = selectedProjectId === tileIndex;

    return (
      <HStack
        border={isSelectAble && isSelected ? '2px solid' : '2px dashed'}
        borderColor={isSelectAble && isSelected ? '#14665B' : '#ffffff10'}
        backgroundColor={isSelectAble && isSelected ? '#010F0D' : 'transparent'}
        p={{ base: '16px', md: '18px' }}
        w="full"
        minH="5rem"
        gap="24px"
        rounded="16px"
        justify={'space-between'}
        align="center"
        direction={{ base: 'column', md: 'row' }}
        onClick={() => {
          if (isHackathon && isSelectAble) {
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
          backgroundColor: isSelectAble && isSelected ? '#14665B' : '#ffffff10',
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
                width={{ base: '36px', sm: '48px' }}
                height={{ base: '36px', sm: '48px' }}
              />
              <HStack gap="8px">
                <Box
                  as="p"
                  textStyle={{ base: 'title4', sm: 'title3', md: 'title2' }}
                  noOfLines={1}
                  textAlign="left"
                  color="white"
                >
                  {name}
                </Box>
                {!isSelectAble && <Tag>Submitted</Tag>}
              </HStack>
            </Stack>
          </VStack>
        </VStack>
        {isSelectAble && (
          <Center
            rounded="full"
            border="2px solid"
            w="22px"
            h="22px"
            borderColor={isSelectAble && isSelected ? '#14665B' : '#ADB8B6'}
            p="4px"
          >
            <Center
              rounded="full"
              w="full"
              h="full"
              backgroundColor={isSelectAble && isSelected ? '#14665B' : ''}
            />
          </Center>
        )}
      </HStack>
    );
  };
  return (
    <>
      <Modal
        variant={'cubik'}
        isOpen={isOpen}
        onClose={() => {
          reset(undefined, { keepValues: false });
          setSelectedProjectId(null);
          setStep(0);
          onClose();
        }}
      >
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
                {step === 0 ? 'Submit Project' : 'Sign Transaction'}
              </Box>
              <Box as="p" textStyle="body4" color="neutral.9">
                {step === 0
                  ? 'Select Project and tracks for the hackathon'
                  : 'Confirm and Sign transaction to submit project'}
              </Box>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <ModalBody>
              {step === 0 ? (
                <VStack
                  pb="4rem"
                  align={'start'}
                  spacing={{ base: '24px', md: '32px' }}
                  w="full"
                >
                  {userProjects.isLoading ? (
                    <Center w="full" height="10rem">
                      <Spinner />
                    </Center>
                  ) : userProjects.data && userProjects.data.length > 0 ? (
                    <VStack
                      align={'start'}
                      w="full"
                      spacing={{ base: '24px', md: '32px' }}
                    >
                      <VStack align="start" gap="12px" w="full">
                        <Box
                          as="p"
                          fontSize={{ base: '12px', md: '14px' }}
                          pb="0.5rem"
                          color="neutral.11"
                        >
                          Projects
                        </Box>
                        <VStack
                          maxH="20rem"
                          overflow="scroll"
                          gap="12px"
                          w="full"
                        >
                          {userProjects.data?.map((project) => (
                            <Tile
                              isSelectAble={
                                selectedArray.data?.find(
                                  (e) => e.project.id === project.id,
                                )
                                  ? false
                                  : true
                              }
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
                      </VStack>

                      <Controller
                        control={control}
                        name="tracks"
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                        }) => (
                          <FormControl
                            isInvalid={Boolean(errors.tracks)}
                            id="tracks"
                            gap="12px"
                          >
                            <HStack
                              w="full"
                              // pb="0.5rem"
                              justify={'space-between'}
                            >
                              <FormLabel
                                fontSize={{ base: '12px', md: '14px' }}
                                pb="0.5rem"
                                htmlFor="tracks"
                                color="neutral.11"
                              >
                                Hackathon Tracks
                              </FormLabel>
                              <Box
                                as="p"
                                fontSize={{ base: '10px', md: '12px' }}
                                color={'neutral.7'}
                                fontWeight={'600'}
                              >
                                {watch('tracks') ? watch('tracks').length : ''}
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
                              options={hackathonTracks || []}
                              placeholder="Search for Track"
                              closeMenuOnSelect={false}
                              selectedOptionStyle="check"
                              variant="unstyled"
                              focusBorderColor="transparent"
                              chakraStyles={{
                                container: (provided) => ({
                                  ...provided,
                                  border: 'none',
                                  background: 'surface.input_field',
                                  outline: '0px !important',
                                  borderRadius: '8px',
                                  minH: '40px',
                                  boxShadow: errors.tracks
                                    ? '0 0 0 2px #E53E3E'
                                    : '0',
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
                                inputContainer: (provided) => ({
                                  ...provided,
                                  ps: '8px',
                                  fontSize: { base: '12px', md: '14px' },
                                  backgroundColor: 'transparent',
                                  //  border: 'none',
                                  boxShadow: 'none',
                                  outline: 'none',
                                }),
                                valueContainer: (provided) => ({
                                  ...provided,
                                  ps: '8px',
                                  minH: '40px',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  boxShadow: 'none',
                                  outline: 'none',
                                }),

                                clearIndicator: (provided) => ({
                                  ...provided,
                                  display: 'none',
                                }),
                                dropdownIndicator: (provided) => ({
                                  ...provided,
                                  background: '',
                                  borderColor: 'transparent !important',
                                  outline: '0px !important',
                                  boxShadow: '0',
                                  p: 0,
                                  w: '60px',
                                }),
                                indicatorSeparator: (provided) => ({
                                  ...provided,
                                  display: 'none',
                                }),
                                menu: (provided) => ({
                                  ...provided,
                                  //border: 'none',
                                  transform: 'translateY(-10px)',
                                  backgroundColor: '#0F0F0F',
                                }),
                                menuList: (provided) => ({
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
                                control: (provided) => ({
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
                                placeholder: (provided) => ({
                                  ...provided,
                                  textAlign: 'start',
                                  fontSize: { base: '12px', md: '14px' },
                                  color: '#3B3D3D',
                                  px: '1rem',
                                }),
                              }}
                            />
                            <FormErrorMessage>
                              {errors.tracks && errors.tracks.message}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      />
                    </VStack>
                  ) : (
                    <VStack
                      border="1px dashed"
                      borderColor="neutral.4"
                      rounded="8px"
                      w="full"
                      pb="3rem"
                      justify={'center'}
                    >
                      <EmptyStateHOC
                        heading={'No Project Found'}
                        subHeading={
                          'To submit a project in a hackathon you have to create a project first'
                        }
                        margin={'1rem'}
                      />
                      <Link href="/create/project">
                        <Button variant="cubikFilled" size={'cubikSmall'}>
                          Create Project
                        </Button>
                      </Link>
                    </VStack>
                  )}
                </VStack>
              ) : (
                <VStack textAlign={'start'} align={'start'} gap={'24px'}>
                  <VStack align={'start'} spacing="16px">
                    <Box
                      as="p"
                      textStyle={{ base: 'title6', md: 'title5' }}
                      color="neutral.6"
                      textTransform={'uppercase'}
                    >
                      Project
                    </Box>
                    <HStack align={'start'} gap="16px">
                      <Avatar
                        src={
                          userProjects.data?.find(
                            (e) => e.id === selectedProject,
                          )?.logo
                        }
                        name={
                          userProjects.data?.find(
                            (e) => e.id === selectedProject,
                          )?.name
                        }
                        borderRadius="8px"
                        width={{ base: '60px', md: '80px' }}
                        height={{ base: '60px', md: '80px' }}
                      />
                      <VStack textAlign={'start'} align={'start'} gap="8px">
                        <Box
                          as="p"
                          textStyle={{ base: 'title3', md: 'title2' }}
                          color="neutral.11"
                        >
                          {
                            userProjects.data?.find(
                              (e) => e.id === selectedProject,
                            )?.name
                          }
                        </Box>
                        <Box
                          as="p"
                          textStyle={{ base: 'title6', md: 'title5' }}
                          color="neutral.8"
                        >
                          {
                            userProjects.data?.find(
                              (e) => e.id === selectedProject,
                            )?.shortDescription
                          }
                        </Box>
                      </VStack>
                    </HStack>
                  </VStack>
                  <Stack
                    pb="3rem"
                    justify={'start'}
                    gap="32px"
                    direction={{ base: 'column', md: 'column' }}
                  >
                    <VStack align={'start'} textAlign="start" spacing="8px">
                      <Box
                        as="p"
                        textStyle={{ base: 'title6', md: 'title5' }}
                        color="neutral.6"
                        textTransform={'uppercase'}
                      >
                        Tracks
                      </Box>
                      {getValues('tracks') ? (
                        <HStack flexWrap={'wrap'}>
                          {getValues('tracks').map((track) => {
                            return <Tag key={track.value}>{track.label}</Tag>;
                          })}
                        </HStack>
                      ) : (
                        <Box
                          as="p"
                          textStyle={{ base: 'title6', md: 'title5' }}
                          color="neutral.11"
                        >
                          No Track Selected
                        </Box>
                      )}
                    </VStack>
                    <VStack align={'start'} textAlign="start" spacing="8px">
                      <Box
                        as="p"
                        textStyle={{ base: 'title6', md: 'title5' }}
                        color="neutral.6"
                        textTransform={'uppercase'}
                      >
                        Submitting to
                      </Box>
                      <Box
                        as="p"
                        textStyle={{ base: 'title6', md: 'title5' }}
                        color="neutral.11"
                      >
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
              )}{' '}
            </ModalBody>
            <ModalFooter
              display="flex"
              h={'fit-content'}
              justifyContent="space-between"
            >
              <Button
                w="8rem"
                variant="cubikOutlined"
                size="cubikSmall"
                onClick={() => {
                  reset(undefined, { keepValues: false });
                  setSelectedProjectId(null);
                  setStep(0);
                  onClose();
                }}
              >
                Cancel
              </Button>
              {step === 1 ? (
                <Button
                  px="32px"
                  variant="cubikFilled"
                  size="cubikSmall"
                  onClick={signTransactionHandler}
                  loadingText="Submitting"
                  isLoading={signTransactionLoading}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  w="8rem"
                  ms={'auto'}
                  variant="cubikFilled"
                  type="submit"
                  isDisabled={selectedProjectId === null}
                >
                  Next
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
