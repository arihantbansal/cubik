'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import ChevronRight from '@/theme/icons/chevron_right.svg';
import UploadIcon from '@/theme/icons/upload.svg';
import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from '@/utils/chakra';
import type { FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import type {
  Control,
  FieldErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import { CategorySelect, TeamSelect } from './ChakraReactSelect';
import type { FormData } from './Form';

type StepOneProps = {
  onSubmit: (data: any) => void;
  trigger: UseFormTrigger<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setError: UseFormSetError<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  watch: UseFormWatch<FormData>;
  control: Control<FormData>;
  getFieldState: UseFormGetFieldState<FormData>;
};

const StepOne: React.FC<StepOneProps> = ({
  trigger,
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
  control,
  watch,
  getFieldState,
}) => {
  const [, setIsSubmitting] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setValue('logo', acceptedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //@ts-ignore
    accept: 'image/*',
    multiple: false, // prevent multiple file selection
    onDrop,
  });

  // const colors = [
  //   "red",
  //   "orange",
  //   "yellow",
  //   "green",
  //   "teal",
  //   "blue",
  //   "cyan",
  //   "purple",
  //   "pink",
  //   "gray",
  // ];

  // const categoryWithColors = category.map((item, index) => {
  //   return {
  //     ...item,
  //     colorScheme: "#010F0D",
  //   };
  // });
  return (
    <>
      <CardBody>
        <HStack gap="16px" align="top">
          <FormControl
            maxW="34rem"
            isRequired
            w="full"
            isInvalid={Boolean(errors.projectName)}
          >
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="projectName"
            >
              Project Name
            </FormLabel>
            <Input
              id="projectName"
              fontSize={{ base: '12px', md: '14px' }}
              placeholder="Enter your project name"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('projectName', {
                required: true,
                maxLength: { value: 36, message: 'Max length is 36' },
              })}
            />
            {errors.projectName && (
              <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
                {errors.projectName.message}
              </FormErrorMessage>
            )}
          </FormControl>{' '}
          <FormControl isRequired isInvalid={Boolean(errors.email)} w="full">
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              pb="0.5rem"
              htmlFor="email"
            >
              Contact Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Enter your email address"
              _placeholder={{
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }}
              {...register('email', {
                required: true,
              })}
            />
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            {/* {getFieldState("email")?.isDirty && (
              <FormHelperText
                fontSize={{ base: "12px", md: "14px" }}
                color="neutral.6"
              >
                This email will be used to share important information about
                your project.
              </FormHelperText>
            )} */}
          </FormControl>
        </HStack>
        <FormControl isRequired isInvalid={Boolean(errors.tagline)}>
          <HStack w="full" pb="0.5rem" justify={'space-between'}>
            <FormLabel
              fontSize={{ base: '12px', md: '14px' }}
              htmlFor="tagline"
            >
              Tagline
            </FormLabel>
            <Box
              as="p"
              fontSize={{ base: '10px', md: '12px' }}
              color={
                watch('tagline')?.length === 0
                  ? 'neutral.7'
                  : watch('tagline')?.length > 80
                  ? 'surface.red.2'
                  : 'surface.green.2'
              }
              fontWeight={'600'}
            >
              {watch('tagline') ? watch('tagline').length + '/80' : '0/80'}
            </Box>
          </HStack>
          <Textarea
            height={'100px'}
            resize="none"
            id="tagline"
            fontSize={{ base: '12px', md: '14px' }}
            placeholder="A one sentence description of the project"
            _invalid={{
              boxShadow: '0 0 0 2px #E53E3E',
            }}
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('tagline', {
              required: true,
              maxLength: { value: 240, message: 'Max length is 240' },
            })}
          />
          {errors.tagline ? (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              {errors.tagline.message}
            </FormErrorMessage>
          ) : (
            getFieldState('tagline')?.isDirty && (
              <FormHelperText
                fontSize={{ base: '12px', md: '14px' }}
                color="neutral.6"
              >
                Keep the tagline concise, engaging, and descriptive. It should
                encapsulate the essence of your project in one sentence.
              </FormHelperText>
            )
          )}
        </FormControl>
        <CategorySelect control={control} errors={errors} watch={watch} />
        <TeamSelect control={control} errors={errors} watch={watch} />
        <FormControl isRequired isInvalid={Boolean(errors.logo)} id="logo">
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="logo"
          >
            Project Logo
          </FormLabel>
          <HStack h="full" gap="1rem">
            {isDragActive ? (
              <Center
                maxW={'7xl'}
                mx="auto"
                w="full"
                py={{ base: '16px', sm: '24px' }}
                border="1px dashed"
                borderColor={'#1D1F1E'}
                rounded="12px"
              >
                <Box
                  as="p"
                  textStyle={{ base: 'body4', md: 'body3' }}
                  color={'neutral.7'}
                >
                  Drop File Here...
                </Box>
              </Center>
            ) : (
              <>
                <Center
                  border={'2px dashed'}
                  rounded="12px"
                  borderColor={errors.logo ? ' #E53E3E' : 'neutral.6'}
                  minW={{ base: '5rem', md: '6rem' }}
                  h={{ base: '5rem', md: '6rem' }}
                  position={'relative'}
                >
                  {getValues('logo') ? (
                    <Center
                      position="absolute"
                      w={{ base: '3rem', md: '5rem' }}
                      h={{ base: '3rem', md: '5rem' }}
                      rounded={'12px'}
                      overflow="hidden"
                    >
                      <Image
                        src={
                          getValues('logo') &&
                          // @ts-ignore
                          URL.createObjectURL(watch('logo')[0])
                        }
                        alt="project logo"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                      />
                    </Center>
                  ) : (
                    <Center width="20px" height="20px">
                      <UploadIcon width="20" height="20" color={'neutral.6'} />
                    </Center>
                  )}
                </Center>
                <VStack
                  align={'start'}
                  justify="space-between"
                  gap="12px"
                  height={'full'}
                >
                  <Center {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button
                      variant={'cubikFilled'}
                      size={{ base: 'cubikSmall', md: 'cubikMedium' }}
                    >
                      {getValues('logo') ? 'Upload New Image' : 'Upload Image'}
                    </Button>
                  </Center>
                  <Box
                    textAlign={'start'}
                    as="p"
                    textStyle={{ base: 'body5', md: 'body4' }}
                    color="neutral.6"
                  >
                    Upload a 1:1 aspect ration Image of size at max 5MB.
                  </Box>
                </VStack>
              </>
            )}
          </HStack>
          <FormErrorMessage pt="1rem">
            {errors.logo && errors.logo.message}
          </FormErrorMessage>
        </FormControl>
      </CardBody>
      <CardFooter>
        <CardFooter>
          <Button
            variant={'cubikText'}
            size={{ base: 'cubikSmall', md: 'cubikMedium' }}
            rightIcon={
              <Center width="20px" height="20px">
                <ChevronRight width="14" height="14" />{' '}
              </Center>
            }
            ml="auto"
            onClick={async () => {
              setIsSubmitting(true);
              const isValid = await trigger([
                'projectName',
                'tagline',
                'category',
                'team',
                'email',
                'logo',
              ]);
              if (isValid) {
                //@ts-ignore
                onSubmit();
              } else {
                setIsSubmitting(false);
              }
            }}
          >
            Next
          </Button>
        </CardFooter>
      </CardFooter>
    </>
  );
};

export { StepOne };
