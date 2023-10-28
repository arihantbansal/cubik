'use client';

import React, { useState } from 'react';
import { Box, Button, VStack } from '@/utils/chakra';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'chakra-react-select';

import { Tile } from './ActiveTile';
import { handleEvent } from './fetchEvents';
import { createJoinHackathon } from './joinEvent';

interface Props {
  projectId: string;
}
export const ActiveEvent = ({ projectId }: Props) => {
  const event = useQuery({
    queryFn: () => handleEvent(),
    queryKey: ['event'],
  });
  const [value, setValue] = useState([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const handleEventSubmit = async () => {
    try {
      const selectedEvent = event.data?.find((e) => e.id === selectedEventId);

      if (!selectedEvent) return;
      const res = await createJoinHackathon(selectedEvent.id, projectId, value);
      console.log(res);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
  };
  return (
    <>
      {submitted ? (
        <>submitted</>
      ) : (
        <VStack w="full" h={'max-content'}>
          {event.isLoading && <Box>loading...</Box>}
          {event.data?.map((el) => (
            <>
              <Tile
                key={el.id}
                selectedEventId={selectedEventId}
                tileIndex={el.id}
                name={el.name}
                setSelectedEventId={setSelectedEventId}
              />
              <Select
                isMulti
                onChange={(e) => setValue(e as any)}
                value={value}
                placeholder="Search Categories..."
                closeMenuOnSelect={false}
                selectedOptionStyle="check"
                variant="unstyled"
                //@ts-ignore
                options={el.tracks}
                focusBorderColor="transparent"
                chakraStyles={{
                  container: (provided) => ({
                    ...provided,
                    border: 'none',
                    background: 'surface.input_field',
                    outline: '0px !important',
                    borderRadius: '8px',
                    height: '40px',
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
              ></Select>
            </>
          ))}
          <Button
            w="full"
            isDisabled={event.isError || event.isLoading}
            variant={'cubikFilled'}
            mt={10}
            onClick={handleEventSubmit}
          >
            Apply
          </Button>
        </VStack>
      )}
    </>
  );
};
