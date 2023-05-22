import {
  Box,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { addDays } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from 'react-datepicker';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import DatePickerInput from '~/components/common/inputs/DatePickerInput';
import { FormData } from '~/pages/grants/new-grant';

registerLocale('en-gb', enGB);

type GrantsStepOneProps = {
  errors: FieldErrors<FormData>;
  register: UseFormRegister<FormData>;
  startDate: Date;
  setStartDate: (_date: Date) => void;
  endDate: Date;
  setEndDate: (_date: Date) => void;
};

const GrantStepOne = ({
  errors,
  register,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: GrantsStepOneProps) => {
  const tomorrow = addDays(new Date(), 1);

  return (
    <CardBody
      rounded={'8px'}
      gap="40px"
      backgroundColor={'transparent'}
      minH="70vh"
    >
      <VStack alignItems={'start'}>
        <Box
          as="h1"
          color="neutral.11"
          textStyle={{ base: 'title2', md: 'title1' }}
        >
          Create a Grants Round
        </Box>
        <Box
          as="p"
          textStyle={{ base: 'body5', md: 'body4' }}
          color="neutral.9"
          textAlign="start"
        >
          Help projects in the community sustain by providing them grants
          through quadratic funding and community voting
        </Box>
      </VStack>
      <Stack
        w="full"
        gap={{ base: '32px', md: '32px' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <FormControl isRequired w="full" isInvalid={Boolean(errors.name)}>
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="name"
          >
            Round Name
          </FormLabel>
          <Input
            id="name"
            placeholder="Enter your rounds name"
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('name', {
              required: true,
              maxLength: { value: 36, message: 'Max length is 36' },
            })}
          />
          {errors.name && (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              <>{errors.name.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl w="full">
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="name"
          >
            Round managers
          </FormLabel>
          <Input
            id="round_managers"
            placeholder="Search Username"
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('round_managers', {
              required: false,
            })}
          />
          {errors.name && (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              <>{errors.name.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <Stack
        w="full"
        gap={{ base: '24px', md: '32px' }}
        direction={{ base: 'row', md: 'row' }}
      >
        <FormControl isRequired w="full" isInvalid={Boolean(errors.pool)}>
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="pool"
          >
            Matching Pool Amount
          </FormLabel>
          <Input
            id="pool"
            placeholder="Matching Pool"
            type="number"
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('pool', {
              required: true,
            })}
          />
          {errors.pool && (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              <>{errors.pool.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired w="full" isInvalid={Boolean(errors.projects)}>
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="projects"
          >
            Number of Projects
          </FormLabel>
          <Input
            id="projects"
            placeholder="Participating Projects"
            type="number"
            _placeholder={{
              fontSize: { base: '12px', md: '14px' },
              color: '#3B3D3D',
            }}
            {...register('projects', {
              required: true,
            })}
          />
          {errors.projects && (
            <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
              <>{errors.projects.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      <HStack w="full" gap={{ base: '24px', md: '32px' }}>
        <FormControl variant="withAddOn" isRequired w="full">
          <FormLabel fontSize={{ base: '12px', md: '14px' }} pb="0.5rem">
            Start Date
          </FormLabel>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            customInput={<DatePickerInput />}
            locale="en-gb"
            minDate={tomorrow} // restrict past and today's date selection
          />
        </FormControl>
        <FormControl variant="withAddOn" isRequired w="full">
          <FormLabel fontSize={{ base: '12px', md: '14px' }} pb="0.5rem">
            End Date
          </FormLabel>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            customInput={<DatePickerInput />}
            locale="en-gb"
            minDate={tomorrow} // restrict past and today's date selection
          />
        </FormControl>
      </HStack>
      <FormControl isRequired isInvalid={Boolean(errors.short_description)}>
        <FormLabel
          fontSize={{ base: '12px', md: '14px' }}
          pb="0.5rem"
          htmlFor="short_description"
        >
          Tagline
        </FormLabel>
        <Textarea
          height={'100px'}
          resize="none"
          id="short_description"
          placeholder="A one sentence description of the Round"
          _placeholder={{
            fontSize: { base: '12px', md: '14px' },
            color: '#3B3D3D',
          }}
          {...register('short_description', {
            required: true,
          })}
        />
        {errors.short_description && (
          <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
            <>{errors.short_description.message}</>
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl w="full" isInvalid={Boolean(errors.colorScheme)}>
        <FormLabel
          fontSize={{ base: '12px', md: '14px' }}
          pb="0.5rem"
          htmlFor="colorScheme"
        >
          Color Scheme
        </FormLabel>
        <Select
          borderColor="#141414"
          defaultValue={1}
          id="colorScheme"
          placeholder="Select color scheme"
          _placeholder={{
            fontSize: { base: '10px', md: '12px' },
            color: '#3B3D3D',
          }}
          {...register('colorScheme')}
        >
          <option value="light">Teal</option>
          <option value="dark">Yellow</option>
          <option value="dark">Blue</option>
          <option value="dark">Green</option>
          <option value="dark">Purple</option>
        </Select>
        {errors.colorScheme && (
          <FormErrorMessage fontSize={{ base: '12px', md: '14px' }}>
            <>{errors.colorScheme.message}</>
          </FormErrorMessage>
        )}
      </FormControl>
    </CardBody>
  );
};

export default GrantStepOne;
