import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { GroupBase, OptionsOrGroups, Select } from 'chakra-react-select';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { FiChevronRight } from 'react-icons/fi';
import { RxImage } from 'react-icons/rx';
import { FormData } from '~/pages/submit-project';
import { trpc } from '~/utils/trpc';
import { category } from './projectCategories';

type StepOneProps = {
  onSubmit: (data: any) => void;
  trigger: UseFormTrigger<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  watch: UseFormWatch<FormData>;
  control: Control<FormData>;
};

const StepOne: React.FC<StepOneProps> = ({
  trigger,
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
  control,
}) => {
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentTeammateName, setCurrentTeammateName] = useState<
    string | undefined
  >(undefined);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setValue('logo', acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    onDrop,
  });

  const teamSearch = trpc.user.searchUser.useQuery({
    username: currentTeammateName || '',
  });

  const teamWithNames =
    teamSearch.data?.map((item) => {
      return {
        value: item.id,
        label: item.username,
      };
    }) || [];

  console.log('team search ', teamSearch.data);
  // create an arry of random colors
  const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
    'gray',
  ];

  const categoryWithColors = category.map((item, index) => {
    return {
      ...item,
      colorScheme: colors[Math.floor(Math.random() * colors.length)],
    };
  });

  const isFormValid = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasValues =
      !!getValues('projectName') &&
      !!getValues('tagline') &&
      !!getValues('category');
    return !hasErrors && hasValues;
  };

  useEffect(() => {
    setDisableButton(!isFormValid() || isSubmitting);
  }, [errors, isSubmitting]);

  useEffect(() => {
    setDisableButton(!isFormValid());
  }, [errors]);

  return (
    <>
      <CardBody>
        <FormControl
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
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(errors.tagline)}>
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="tagline"
          >
            Tagline
          </FormLabel>
          <Textarea
            height={'100px'}
            resize="none"
            id="tagline"
            placeholder="A one sentence description of the project"
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('tagline', {
              required: true,
              maxLength: { value: 240, message: 'Max length is 240' },
            })}
          />
          {errors.tagline && (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              {errors.tagline.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Please enter at least 1 Tag.' }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={!!error} id="category">
              <FormLabel
                fontSize={{ base: '12px', md: '14px' }}
                pb="0.5rem"
                htmlFor="category"
              >
                Choose Categories
              </FormLabel>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={categoryWithColors}
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
                    boxShadow: '0',
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
                  }),
                  inputContainer: (provided, state) => ({
                    ...provided,
                    ps: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
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
                    fontSize: '14px',
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
              <FormErrorMessage pt="1rem">
                {error && error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="team"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isRequired isInvalid={!!error} id="team">
              <FormLabel
                fontSize={{ base: '12px', md: '14px' }}
                pb="0.5rem"
                htmlFor="team"
              >
                Search Team
              </FormLabel>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value as any}
                options={
                  teamWithNames as unknown as OptionsOrGroups<
                    string,
                    GroupBase<string>
                  >
                }
                menuIsOpen={
                  !!currentTeammateName && currentTeammateName.length > 0
                }
                placeholder="Search Team..."
                closeMenuOnSelect={true}
                selectedOptionStyle="check"
                variant="unstyled"
                focusBorderColor="transparent"
                onInputChange={(inputValue) => {
                  setCurrentTeammateName(inputValue);
                }}
                chakraStyles={{
                  container: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    background: 'surface.input_field',
                    outline: '0px !important',
                    borderRadius: '8px',
                    height: '40px',
                    boxShadow: '0',
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
                  }),
                  inputContainer: (provided, state) => ({
                    ...provided,
                    ps: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
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
                    fontSize: { base: '12px', md: '14px' },
                    borderTop: 'none',
                    borderTopRadius: 'none',
                    boxShadow: 'none',
                    padding: '0px',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: 'neutral.11',
                    border: '1px solid red',
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
                    px: '1rem',
                    fontSize: { base: '12px', md: '14px' },
                    color: '#3B3D3D',
                  }),
                }}
              />
              <FormErrorMessage pt="1rem">
                {error && error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
        <FormControl>
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="logo"
          >
            Project Logo
          </FormLabel>
          <HStack h="full" gap="1rem">
            {isDragActive ? (
              <Text>Drop the file here ...</Text>
            ) : (
              <Center
                border={'2px dashed'}
                rounded="20px"
                borderColor={'brand.teal6'}
                w="6rem"
                h="6rem"
                position={'relative'}
              >
                {getValues('logo') ? (
                  <Center
                    position="absolute"
                    w="5rem"
                    h="5rem"
                    rounded={'18px'}
                    overflow="hidden"
                  >
                    <Image
                      src={
                        getValues('logo') &&
                        // @ts-ignore
                        URL.createObjectURL(getValues('logo'))
                      }
                      alt="project logo"
                      fill={true}
                      style={{ objectFit: 'cover' }}
                    />
                  </Center>
                ) : (
                  <RxImage size={44} color={'#A8F0E6'} />
                )}
              </Center>
            )}
            <VStack
              align={'start'}
              justify="space-between"
              gap="0.5rem"
              height={'full'}
            >
              <Center {...getRootProps()}>
                <input {...getInputProps()} />{' '}
                <Button variant={'primary'}>Upload Image</Button>{' '}
              </Center>
              <Box
                textAlign={'start'}
                as="p"
                textStyle={'body4'}
                color="neutral8"
              >
                Upload a 1:1 aspect ration Image of size at max 5MB.
              </Box>
            </VStack>
          </HStack>
        </FormControl>
      </CardBody>
      <CardFooter>
        <CardFooter>
          <Button
            disabled={disableButton}
            variant={'outline'}
            ml="auto"
            onClick={async () => {
              setIsSubmitting(true);
              const isValid = await trigger([
                'projectName',
                'tagline',
                'category',
              ]);

              if (isValid) {
                //@ts-ignore
                onSubmit();
              } else {
                setIsSubmitting(false);
              }
            }}
            rightIcon={<Icon as={FiChevronRight} width={5} height={5} />}
          >
            Next
          </Button>
        </CardFooter>
      </CardFooter>
    </>
  );
};

export { StepOne };
