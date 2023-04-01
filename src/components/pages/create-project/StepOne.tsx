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
import { Select } from 'chakra-react-select';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FiChevronRight } from 'react-icons/fi';
import { RxImage } from 'react-icons/rx';
import { FormData } from '~/pages/submit-project';

const category = [
  {
    label: 'NFT',
    value: 'nft',
    colorScheme: 'red',
  },
  {
    label: 'DeFi',
    value: 'defi',
    colorScheme: 'yellow',
  },
  {
    label: 'Infrastructure',
    value: 'infrastructure',
    colorScheme: 'blue',
  },
  {
    label: 'SDK',
    value: 'sdk',
    colorScheme: 'black',
  },
  {
    label: 'Wallet',
    value: 'wallet',
    colorScheme: 'orange',
  },
  {
    label: 'DAO',
    value: 'dao',
    colorScheme: 'white',
  },
  {
    label: 'Analytics',
    value: 'analytics',
    colorScheme: 'purple',
  },
  {
    label: 'dAPP',
    value: 'dapp',
    colorScheme: 'yellow',
  },
  {
    label: 'Oracles',
    value: 'oracles',
    colorScheme: 'pink',
  },
  {
    label: 'SPL',
    value: 'spl',
    colorScheme: 'blue',
  },
  {
    label: 'Tools',
    value: 'tool',
    colorScheme: 'green',
  },
];

type StepOneProps = {
  onSubmit: (data: any) => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
  watch: UseFormWatch<FormData>;
  control: Control<FormData>;
};
const StepOne: React.FC<StepOneProps> = ({
  onSubmit,
  register,
  errors,
  setValue,
  getValues,
  control,
}) => {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    setValue('logo', acceptedFiles[0]);
  }, []);

  // @ts-ignore

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    onDrop,
  });
  console.log('error - ', errors);
  return (
    <>
      <CardBody>
        <FormControl w="full" isInvalid={Boolean(errors.projectName)}>
          <FormLabel pb="0.5rem" htmlFor="projectName">
            Project Name
          </FormLabel>
          <Input
            id="projectName"
            placeholder="Enter your project name"
            {...register('projectName', {
              required: true,
              maxLength: { value: 36, message: 'Max length is 36' },
            })}
          />
          {errors.projectName && (
            <FormErrorMessage>{errors.projectName.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(errors.tagline)}>
          <FormLabel pb="0.5rem" htmlFor="tagline">
            Tagline
          </FormLabel>
          <Textarea
            height={'100px'}
            resize="none"
            id="tagline"
            placeholder="A one sentence description of the project"
            {...register('tagline', {
              required: true,
              maxLength: { value: 240, message: 'Max length is 240' },
            })}
          />
          {errors.tagline && (
            <FormErrorMessage>{errors.tagline.message}</FormErrorMessage>
          )}
        </FormControl>
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Please enter at least Tag.' }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl py={4} isInvalid={!!error} id="category">
              <FormLabel pb="0.5rem" htmlFor="category">
                Choose Categories
              </FormLabel>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={category}
                placeholder="Search Categories..."
                closeMenuOnSelect={false}
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
                    ps: '1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
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
                    border: 'none',
                    backgroundColor: 'surface.input_field',
                  }),
                  menuList: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'surface.input_field',
                    border: '1px solid',
                    borderColor: 'surface.stoke_white',
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: 'neutral.7',
                    fontSize: '14px',
                    backgroundColor: state.isSelected
                      ? 'surface.stoke_white'
                      : state.isFocused
                      ? 'transparent'
                      : 'surface.input_field',
                    ':active': {
                      backgroundColor: 'surface.input_field',
                    },
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    border: 'none',
                    backgroundColor: 'surface.input_field',
                    boxShadow: 'none',
                    outline: 'none',
                    ':hover': {
                      border: 'none',
                      backgroundColor: 'surface.input_field',
                    },
                  }),
                  placeholder: (provided, state) => ({
                    ...provided,
                    textAlign: 'start',
                    fontSize: '14px',
                    px: '1rem',
                    color: '#636666',
                  }),
                }}
              />
              <FormErrorMessage>{error && error.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <FormControl>
          <FormLabel pb="0.5rem" htmlFor="logo">
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
        <Button
          variant={'outline'}
          ml="auto"
          onClick={onSubmit}
          rightIcon={<Icon as={FiChevronRight} width={5} height={5} />}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export { StepOne };
