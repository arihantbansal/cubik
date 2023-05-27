import {
  Box,
  Center,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiInfo } from 'react-icons/fi';

export const InfoPopover = () => {
  return (
    <Center position="relative">
      <Popover variant="cubik">
        <PopoverTrigger>
          <Center>
            <FiInfo size={16} color="#3B3D3D" />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Box
              as="p"
              textStyle={{ base: 'title5', md: 'title4' }}
              color="white"
            >
              Verified Projects
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <Box as="p" textStyle={{ base: 'body6', md: 'body5' }}>
              You are now eligible for{' '}
              <Box as={Link} href={'/grants'} color="#FFD83D">
                grant round
              </Box>{' '}
              and hackathons. Make the most of{' '}
              <Box as={Link} href={'/qf'} color="#A8F0E6">
                Quadratic Funding
              </Box>{' '}
              to optimize your fundraising efforts.
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};
