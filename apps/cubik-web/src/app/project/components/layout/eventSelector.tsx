'use client';

import React, { useEffect } from 'react';
import type { ProjectPageEventType } from '@/types/project';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@/utils/chakra';
import {
  isFutureAndHowMuch,
  isPastAndHowMuch,
  parseDateISO,
} from '@/utils/helpers/date';
import { daysInWeek, isFuture, isPast } from 'date-fns';
import { DateTime } from 'luxon';

import { useProjectEventStore } from '../store';

interface Props {
  events: ProjectPageEventType[];
}
export const EventSelector = ({ events }: Props) => {
  const { event, setEvent } = useProjectEventStore();

  useEffect(() => {
    const handleDefaultEvent = () => {
      const findFutureTime = events.find(
        (event) =>
          isFuture(parseDateISO(event.endTime.toISOString())) &&
          isPast(parseDateISO(event.startTime.toISOString())),
      );
      if (events[0] && !event && findFutureTime) {
        setEvent(findFutureTime);
      }
    };
    handleDefaultEvent();
  }, []);

  return (
    <>
      <Menu>
        <MenuButton
          mt={1}
          as={Button}
          color={'#9A9A9A'}
          variant={'ghost'}
          _hover={{
            bg: 'transparent',
          }}
          _active={{
            bg: 'transparent',
          }}
          rightIcon={
            <svg
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5C2.46033 3.32735 4.17223 4.9641 6.09042 6.36775C6.33138 6.54408 6.66862 6.54408 6.90958 6.36775C8.82777 4.9641 10.5397 3.32735 12 1.5"
                stroke="#9A9A9A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {event ? event.name : 'No Active Grants Round'}
        </MenuButton>
        <MenuList borderRadius={8} bg={'#212121'}>
          <MenuItem
            bg="#212121"
            onClick={() => setEvent(null)}
            _hover={{
              bg: 'transparent',
            }}
            _focus={{
              bg: 'transparent',
            }}
            _active={{
              bg: 'transparent',
            }}
          >
            Tip Project Team
          </MenuItem>
          {events.map((event) => {
            return (
              <MenuItem
                bg="#212121"
                key={event.eventId}
                onClick={() => setEvent(event)}
                _hover={{
                  bg: 'transparent',
                }}
                _focus={{
                  bg: 'transparent',
                }}
                _active={{
                  bg: 'transparent',
                }}
              >
                {event.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
