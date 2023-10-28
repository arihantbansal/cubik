'use client';

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/user';
import {
  Box,
  Button,
  Card,
  HStack,
  useDisclosure,
  VStack,
} from '@/utils/chakra';
import { useUploadThing } from '@/utils/helpers/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

import type { Team } from '@cubik/database';

import { Cardheader } from './CardHeader';
import { ConfirmUpdateModal } from './ConfirmUpdateModal';
import { handleUpdate } from './handleUpdate';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { StepTwo } from './StepTwo';

export type FormData = {
  projectName: string;
  tagline: string;
  category: { label: string; value: string; colorScheme: string }[];
  logo: File[];
  twitter: string;
  github: string;
  projectLink: string;
  telegram: string;
  discord: string;
  description: string;
  email: string;
  team: {
    label: string;
    value: string;
    icon?: string;
  }[];
};

interface Props {
  formState: Partial<FormData>;
  _imageURL: string | null;
  _editorData: string | null;
  ownerPubkey: string;
  projectId: string;
}
const Form = ({
  formState,
  _imageURL,
  _editorData,
  ownerPubkey,
  projectId,
}: Props) => {
  const { user } = useUser();
  const { setVisible } = useWalletModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [increasedSize, setIncreasedSize] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(_imageURL);
  const [editorData, setEditorData] = useState<string | null>(_editorData);
  const [LoadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const goToNextStep = () => setStep(step + 1);

  const handleStepOneSubmit = async () => {
    // check if there was an error in submitting the form
    goToNextStep();
  };
  const router = useRouter();
  const goToPreviousStep = () => setStep(step - 1);

  const handleStepTwoSubmit = async () => {
    goToNextStep();
  };

  const {
    isOpen: isConfirmModalOpen,
    onOpen: onConfirmModalOpen,
    onClose: onConfirmModalClose,
  } = useDisclosure();

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
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: formState,
    resolver: zodResolver(
      z.object({
        projectName: z
          .string()
          .nonempty({ message: "Project name can't be empty" })
          .min(1)
          .max(36, {
            message: 'Must be at most 36 characters',
          }),

        tagline: z
          .string()
          .nonempty({ message: "Tagline can't be empty" })
          .max(80, {
            message: 'Tagline can not be more than 80 characters',
          }),

        logo: z.custom<File[]>(),

        email: z.string().nonempty({ message: "Email can't be empty" }),
        category: z
          .array(
            z.object({
              label: z.string().nonempty(),
              value: z.string().nonempty(),
              colorScheme: z.string().nonempty(),
            }),
          )
          .max(3, { message: 'Must be at most 3 categories' })
          .nonempty({ message: 'Must select at least one category' }),

        twitter: z
          .string()
          .nonempty({ message: "Twitter handle can't be empty" }),

        projectLink: z
          .string()
          .nonempty({ message: "Project link can't be empty" }),
        telegram: z.string(),
        discord: z.string(),
        description: z
          .string()
          .nonempty({ message: "Description can't be empty" })
          .max(30000, {
            message: 'Description can not be more than 30000 characters',
          }),
      }),
    ),
  });

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      if (res) {
        setImageUrl(res[0]?.url as string);
        onConfirmModalOpen();
      } else {
        setError('logo', {
          message: 'uploading error. Please try again',
        });
      }
    },

    onUploadError: (e) => {
      console.log('error', e);
    },
  });

  const handleStepThreeSubmit = async (editorData: string) => {
    try {
      if (watch('logo')) {
        startUpload(watch('logo'));
      } else {
        setImageUrl(_imageURL);
        onConfirmModalOpen();
      }
      setEditorData(editorData);
    } catch (e) {
      console.error('There was an error uploading the image', e);
    } finally {
      setLoadingSubmit(false);
    }
  };
  const onUpdate = async () => {
    try {
      setIsLoading(true);
      let team: Team[] = [];
      if (getValues('team') && getValues('team').length > 0) {
        team = getValues()
          ?.team?.map((member) => member.value)
          .map((teamId) => {
            return {
              id: uuidV4(),
              projectId: projectId,
              userId: teamId,
              createdAt: new Date(),
              isActive: true,
              isArchive: false,
              updatedAt: new Date(),
              hackathonId: null,
            };
          });
      }
      const finalTeam: Team[] = [
        {
          id: uuidV4(),
          projectId: projectId,
          userId: user?.id || '',
          createdAt: new Date(),
          isActive: true,
          isArchive: false,
          updatedAt: new Date(),
          hackathonId: null,
        },
      ];
      team.forEach((team) => {
        if (!finalTeam.find((t) => t.userId === team.userId)) {
          finalTeam.push(team);
        }
      });
      const res = await handleUpdate(
        {
          email: getValues('email'),
          discordLink: getValues('discord'),
          githubLink: getValues('github'),
          industry: JSON.stringify(getValues('category')),
          longDescription: editorData as string,
          logo: imageUrl as string,
          name: getValues('projectName'),
          projectLink: getValues('projectLink'),
          shortDescription: getValues('tagline'),
          telegramLink: getValues('telegram'),
          twitterHandle: getValues('twitter'),
          id: projectId,
        },
        // finalTeam
      );
      if (res) {
        router.push(`/project/${projectId}`);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Box>
        <HStack
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          spacing="4rem"
        >
          <VStack spacing="1rem">
            <Box fontSize="2rem" fontWeight="bold">
              You are not logged in
            </Box>
            <Box>
              <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
            </Box>
          </VStack>
        </HStack>
      </Box>
    );
  }
  if (user?.mainWallet !== ownerPubkey) {
    return (
      <Box>
        <HStack
          w="full"
          h="full"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          spacing="4rem"
        >
          <VStack spacing="1rem">
            <Box fontSize="2rem" fontWeight="bold">
              {"You don't have access to this edit"}
            </Box>
          </VStack>
        </HStack>
      </Box>
    );
  }

  return (
    <>
      <Suspense fallback={<>loading</>}>
        <Card
          maxW={{
            base: !increasedSize ? '28rem' : '98%',
            md: !increasedSize ? 'full' : '3xl',
          }}
          minW={{ base: 'full', md: '48rem' }}
          w="full"
          mx="auto"
          padding={{ base: '24px', md: '38px' }}
        >
          {!(step === 4) && <Cardheader step={step} />}
          <form
            onSubmit={handleSubmit(() => {})}
            style={{
              width: 'full',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '2rem',
            }}
          >
            {step === 1 && (
              <StepOne
                imageURL={imageUrl}
                trigger={trigger}
                onSubmit={handleStepOneSubmit}
                register={register}
                errors={errors}
                setError={setError}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                control={control}
                getFieldState={getFieldState}
              />
            )}
            {step === 2 && (
              <StepTwo
                trigger={trigger}
                onSubmit={handleStepTwoSubmit}
                register={register}
                onPrevious={goToPreviousStep}
                errors={errors}
                setError={setError}
              />
            )}
            {step === 3 && (
              <StepThree
                _editorData={editorData}
                isUploading={isUploading}
                setIncreasedSize={setIncreasedSize}
                onPrevious={goToPreviousStep}
                onSubmit={handleStepThreeSubmit}
                setLoadingSubmit={setLoadingSubmit}
                LoadingSubmit={LoadingSubmit}
              />
            )}
            {step === 4 && <>done...</>}
          </form>
        </Card>
        <ConfirmUpdateModal
          isLoading={isLoading}
          setLoading={setIsLoading}
          getValues={getValues}
          imageURL={imageUrl as string}
          onUpdate={onUpdate}
          isOpen={isConfirmModalOpen}
          onClose={onConfirmModalClose}
        />
      </Suspense>
    </>
  );
};

export default Form;
