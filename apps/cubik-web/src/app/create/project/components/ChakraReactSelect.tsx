/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
} from '@/utils/chakra';
import { useQuery } from '@tanstack/react-query';
import type { GroupBase, OptionsOrGroups } from 'chakra-react-select';
import { Select } from 'chakra-react-select';
import type { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { category } from './categories';
import type { FormData } from './Form';
import { searchTeam } from './search';

export const CategorySelect = ({
  control,
  errors,
  watch,
}: {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}) => {
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

  const categoryWithColors = category.map((item) => {
    return {
      ...item,
      colorScheme: '#010F0D',
    };
  });
  return (
    <Controller
      control={control}
      name="category"
      rules={{ required: 'Please enter at least 1 Tag.' }}
      render={() => (
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Please enter at least 1 Tag.' }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <FormControl
              isRequired
              isInvalid={Boolean(errors.category)}
              id="category"
            >
              <HStack w="full" pb="0.5rem" justify={'space-between'}>
                <FormLabel
                  fontSize={{ base: '12px', md: '14px' }}
                  pb="0.5rem"
                  htmlFor="category"
                >
                  Choose Categories
                </FormLabel>
                <Box
                  as="p"
                  fontSize={{ base: '10px', md: '12px' }}
                  color={
                    watch('category')?.length > 3
                      ? 'surface.red.2'
                      : watch('category')?.length > 0
                      ? 'surface.green.2'
                      : 'neutral.7'
                  }
                  fontWeight={'600'}
                >
                  {watch('category') ? watch('category').length + '/3' : '0/3'}
                </Box>
              </HStack>
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
                  container: (provided) => ({
                    ...provided,
                    border: 'none',
                    // background: `surface.${}`,
                    outline: '0px !important',
                    borderRadius: '8px',
                    height: '40px',
                    boxShadow: errors.category ? '0 0 0 2px #E53E3E' : '0',
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
                    height: '40px',
                    fontSize: { base: '12px', md: '14px' },
                    backgroundColor: 'transparent',
                    //  border: 'none',
                    boxShadow: 'none',
                    outline: 'none',
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    ps: '8px',
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
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
      )}
    />
  );
};

export const TeamSelect = ({
  control,
  errors,
}: {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  watch: UseFormWatch<FormData>;
}) => {
  const [currentTeammateName, setCurrentTeammateName] = useState<
    string | undefined
  >(undefined);

  const { data: teamSearch, isLoading } = useQuery({
    queryFn: ({ queryKey }) => searchTeam(queryKey[1] as string),
    queryKey: ['searchTeam', currentTeammateName],
    enabled: currentTeammateName?.length! > 3 ? true : false,
  });
  return (
    <Controller
      control={control}
      name="team"
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <FormControl isInvalid={Boolean(errors.team)} id="team">
          <FormLabel
            fontSize={{ base: '12px', md: '14px' }}
            pb="0.5rem"
            htmlFor="team"
          >
            Add Team
          </FormLabel>
          <Select
            isMulti
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value as any}
            options={
              teamSearch as unknown as OptionsOrGroups<
                string,
                GroupBase<string>
              >
            }
            formatOptionLabel={({ label, icon }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px',
                }}
              >
                <img
                  src={icon}
                  alt={label}
                  style={{
                    marginRight: '10px',
                    borderRadius: '100%',
                    width: '16px',
                    height: '16px',
                  }}
                />
                {label}
              </div>
            )}
            menuIsOpen={!!currentTeammateName && currentTeammateName.length > 0}
            isLoading={isLoading && currentTeammateName?.length! > 2}
            loadingMessage={() => 'Searching...'}
            placeholder="Search @username"
            closeMenuOnSelect={true}
            selectedOptionStyle="check"
            variant="unstyled"
            focusBorderColor="transparent"
            onInputChange={(inputValue) => {
              setCurrentTeammateName(inputValue);
            }}
            chakraStyles={{
              container: (provided) => ({
                ...provided,
                border: 'none',
                background:
                  currentTeammateName?.length! > 3
                    ? 'surface.input_field'
                    : 'transparent',
                outline: '0px !important',
                borderRadius: '8px',
                height: '40px',
                boxShadow: errors.team ? '0 0 0 2px #E53E3E' : '0',
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
              inputContainer: (provided) => ({
                ...provided,
                ps: '8px',
                height: '40px',
                fontSize: { base: '12px', md: '14px' },
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
              }),
              valueContainer: (provided) => ({
                ...provided,
                ps: '8px',
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
                fontSize: { base: '12px', md: '14px' },
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
                px: '1rem',
                fontSize: { base: '12px', md: '14px' },
                color: '#3B3D3D',
              }),
            }}
          />
          <FormErrorMessage pt="1rem">
            {errors.team && errors.team.message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
};
