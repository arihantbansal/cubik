import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { addDays } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import DatePickerInput from '~/components/common/inputs/DatePickerInput';

registerLocale('en-gb', enGB);

type GrantsStepOneProps = {
  onSubmit: (_grant: any) => void;
  errors: FieldErrors<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
};

const GrantStepOne = ({
  onSubmit,
  errors,
  handleSubmit,
  register,
}: GrantsStepOneProps) => {
  const tomorrow = addDays(new Date(), 1);
  const [endDate, setEndDate] = useState(tomorrow);
  const [startDate, setStartDate] = useState(tomorrow);
  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '24px',
      }}
      onSubmit={handleSubmit(onSubmit)}
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
      <FormControl isRequired w="full" isInvalid={Boolean(errors.projectName)}>
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
      <FormControl isRequired w="full" isInvalid={Boolean(errors.projectName)}>
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
      <FormControl isRequired w="full" isInvalid={Boolean(errors.projectName)}>
        <FormLabel
          fontSize={{ base: '12px', md: '14px' }}
          pb="0.5rem"
          htmlFor="projects"
        >
          Maximum Number of Participating Projects
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
      <HStack w="full" gap="24px">
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
      <FormControl isRequired isInvalid={Boolean(errors.tagline)}>
        <FormLabel
          fontSize={{ base: '12px', md: '14px' }}
          pb="0.5rem"
          htmlFor="short_description"
        >
          Description
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
            fontSize: { base: '12px', md: '14px' },
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
      <HStack w="full" pt="24px" justify={'space-between'}>
        <Button variant={'outline'}>Cancel</Button>
        <Button variant="apply_for_grant" type="submit">
          Submit Grant
        </Button>
      </HStack>
    </form>
  );
};

export default GrantStepOne;
