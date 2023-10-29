'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectPageLayoutType } from '@/types/project';
import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  VStack,
} from '@/utils/chakra';
import { InterFont } from '@/utils/fonts/inter';
import { parseDateISO } from '@/utils/helpers/date';
import { isFuture } from 'date-fns';

import { useProjectEventStore } from '../store';
import { EventSelector } from './eventSelector';

interface Props {
  projectWithEvent: ProjectPageLayoutType;
}
export const ProjectHeader = ({ projectWithEvent }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const { event } = useProjectEventStore();
  return (
    <>
      <Stack
        className={InterFont.className}
        direction={{ base: 'column', md: 'row' }}
        gap={12}
        width={'full'}
        alignItems={{
          base: 'center',
          md: 'end',
        }}
        py={{
          base: 8,
          md: 10,
        }}
        h="full"
        justifyContent={'center'}
      >
        <Stack
          direction={{ base: 'row', md: 'row' }}
          gap={{
            base: 4,
            md: 6,
          }}
          width={'full'}
          align={'start'}
          flexDirection={'column'}
        >
          <Box position={'relative'} width={24} height={24}>
            <Image
              src={projectWithEvent.logo}
              alt={projectWithEvent.name}
              priority
              fill
              style={{
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </Box>
          <VStack
            justify={'center'}
            gap={{ base: 3, md: 5 }}
            alignItems={'start'}
            justifyContent="center"
            w="full"
          >
            <HStack align="center" spacing="1px">
              <Box
                textStyle={{ base: 'title2', sm: 'title1', md: 'headline3' }}
                fontSize={{ base: '1.5rem', md: '2rem' }}
                textTransform="capitalize"
                color="neutral.11"
                noOfLines={1}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {projectWithEvent.name}
              </Box>
            </HStack>

            <Box
              color="cubik.grey.100"
              noOfLines={2}
              fontSize={{ base: '1rem', md: '1.25rem' }}
              fontWeight={600}
              textOverflow="ellipsis"
            >
              {projectWithEvent.shortDescription}
            </Box>
          </VStack>
        </Stack>
        <Box
          minW={{
            base: 'full',
            md: '20rem',
          }}
          maxW={'30rem'}
          w={'full'}
          minH={20}
          gap={{
            base: 10,
            md: 0,
          }}
          alignItems={'end'}
          display={'flex'}
          flexDirection={'column'}
        >
          <HStack
            w="full"
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
            h={{
              base: 28,
              md: 14,
            }}
            gap={{
              base: 4,
              md: 6,
            }}
          >
            <Button
              leftIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0001 10.8334V8.33342M10.0001 8.33342V5.83341M10.0001 8.33342H7.50008M10.0001 8.33342H12.5001M15.8334 18.3334V7.50008C15.8334 5.94901 15.8334 5.17348 15.6295 4.54584C15.2173 3.27735 14.2228 2.28284 12.9543 1.87068C12.3267 1.66675 11.5511 1.66675 10.0001 1.66675C8.44901 1.66675 7.67348 1.66675 7.04584 1.87068C5.77735 2.28284 4.78284 3.27735 4.37068 4.54584C4.16675 5.17348 4.16675 5.94901 4.16675 7.50008V18.3334L5.66147 17.0522C7.20136 15.7323 7.9713 15.0724 8.83479 14.8208C9.59583 14.5992 10.4043 14.5992 11.1654 14.8208C12.0289 15.0724 12.7988 15.7323 14.3387 17.0522L15.8334 18.3334Z"
                    stroke="#848484"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              color={'#848484'}
              borderRadius={5}
              h={'full'}
              variant="ghost"
              w="full"
              minH={10}
              _hover={{
                bg: 'white',
                color: 'black',
              }}
            >
              Collect
            </Button>
            <Link
              style={{
                width: '100%',
                height: '100%',
              }}
              href={projectWithEvent.projectLink}
            >
              <Button
                borderRadius={5}
                h={'full'}
                minH={10}
                variant="cubikOutlined"
                w="full"
              >
                Visit
              </Button>
            </Link>

            {event && isFuture(parseDateISO(event.endTime.toISOString())) ? (
              <Popover
                isOpen={isHovered}
                onClose={() => setIsHovered(false)}
                placement={'top'}
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Button
                    minH={10}
                    leftIcon={
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8609 11.6733H16.8105C18.0156 11.6733 19.8747 13.1738 18.5343 14.3389C14.6952 17.8994 8.51028 17.8994 4.53425 14.2642M4.53425 14.2642V14.3416C4.53425 14.8134 4.34807 15.2659 4.01667 15.5995C3.68527 15.9331 3.23579 16.1205 2.76712 16.1205C2.29845 16.1205 1.84898 15.9331 1.51758 15.5995C1.18618 15.2659 1 14.8134 1 14.3416V9.89441C1.00078 9.43262 1.17991 8.98923 1.49954 8.65798C1.81917 8.32673 2.25423 8.13358 2.71275 8.11938C3.17128 8.10517 3.61732 8.27101 3.95658 8.58185C4.29584 8.89268 4.50173 9.32414 4.53071 9.78501M4.53425 14.2642V9.89441C4.53425 9.85883 4.53425 9.82147 4.53071 9.78501M8.0685 13.4522H12.3432C13.0182 13.4522 13.4565 12.7379 13.1552 12.1305C12.9542 11.7257 12.6453 11.3853 12.2629 11.1475C11.8805 10.9096 11.4399 10.7837 10.9904 10.7838H9.99908C9.89171 10.7837 9.78585 10.7584 9.68983 10.71C8.09471 9.90737 6.30305 9.58613 4.53071 9.78501M16.4623 2.44712C16.9718 2.80401 17.3627 3.30696 17.5844 3.89055C17.8061 4.47414 17.8481 5.11137 17.7052 5.71936C17.5622 6.32735 17.2408 6.87797 16.7828 7.2996C16.3248 7.72124 15.7513 7.99438 15.137 8.08351M14.2534 4.11304C14.2534 4.93867 13.9276 5.73049 13.3477 6.3143C12.7677 6.8981 11.9811 7.22608 11.161 7.22608C10.3408 7.22608 9.55421 6.8981 8.97426 6.3143C8.39431 5.73049 8.0685 4.93867 8.0685 4.11304C8.0685 3.28741 8.39431 2.4956 8.97426 1.91179C9.55421 1.32798 10.3408 1 11.161 1C11.9811 1 12.7677 1.32798 13.3477 1.91179C13.9276 2.4956 14.2534 3.28741 14.2534 4.11304Z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    borderRadius={5}
                    h={'full'}
                    w={'full'}
                    fontWeight={600}
                    fontFamily={'Inter'}
                    variant={'cubikFilled'}
                  >
                    Contribute
                  </Button>
                </PopoverTrigger>

                <Portal>
                  <PopoverContent
                    display={{
                      base: 'none',
                      md: 'block',
                    }}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton color={'black'} />
                    <PopoverBody
                      p={4}
                      borderRadius={5}
                      bg={'#FFD600'}
                      minH={32}
                    >
                      <Box color={'black'} fontSize={'sm'} fontWeight={600}>
                        WTF is Contribute?
                      </Box>
                      <Box
                        my={2}
                        color={'black'}
                        fontSize={'xs'}
                        fontWeight={500}
                      >
                        When you contribute to a project your contribution
                        matches a portion from the matching pool based on the
                        amount of your donation.
                      </Box>
                      <Button
                        fontSize={'sm'}
                        py={0}
                        px={3}
                        borderRadius={'full'}
                        color={'white'}
                        bg={'black'}
                        _hover={{
                          bg: 'black',
                        }}
                        onClick={() => setIsHovered(false)}
                      >
                        Dismiss
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            ) : (
              <Popover
                isOpen={isHovered}
                onClose={() => setIsHovered(false)}
                placement={'top'}
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Button
                    minH={10}
                    leftIcon={
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.5 4.5835V5.31683C5.5 6.34359 5.5 6.85697 5.30018 7.24914C5.12441 7.59411 4.84395 7.87457 4.49898 8.05034C4.10681 8.25016 3.59343 8.25016 2.56667 8.25016H1.83333M16.5 17.4168V16.6835C16.5 15.6567 16.5 15.1434 16.6998 14.7512C16.8756 14.4062 17.1561 14.1258 17.501 13.95C17.8932 13.7502 18.4066 13.7502 19.4333 13.7502H20.1667M16.5 4.5835V5.31683C16.5 6.34359 16.5 6.85697 16.6998 7.24914C16.8756 7.59411 17.1561 7.87457 17.501 8.05034C17.8932 8.25016 18.4066 8.25016 19.4333 8.25016H20.1667M5.5 17.4168V16.6835C5.5 15.6567 5.5 15.1434 5.30018 14.7512C5.12441 14.4062 4.84395 14.1258 4.49898 13.95C4.10681 13.7502 3.59343 13.7502 2.56667 13.7502H1.83333M4.76667 17.4168H17.2333C18.2601 17.4168 18.7735 17.4168 19.1656 17.217C19.5106 17.0412 19.7911 16.7608 19.9668 16.4158C20.1667 16.0236 20.1667 15.5103 20.1667 14.4835V7.51683C20.1667 6.49007 20.1667 5.97668 19.9668 5.58451C19.7911 5.23955 19.5106 4.95909 19.1656 4.78332C18.7735 4.5835 18.2601 4.5835 17.2333 4.5835H4.76667C3.7399 4.5835 3.22652 4.5835 2.83435 4.78332C2.48939 4.95909 2.20892 5.23955 2.03316 5.58451C1.83333 5.97668 1.83333 6.49007 1.83333 7.51683V14.4835C1.83333 15.5103 1.83333 16.0236 2.03316 16.4158C2.20892 16.7608 2.48939 17.0412 2.83435 17.217C3.22652 17.4168 3.7399 17.4168 4.76667 17.4168ZM11 13.7502C9.48122 13.7502 8.25 12.5189 8.25 11.0002C8.25 9.48138 9.48122 8.25016 11 8.25016C12.5188 8.25016 13.75 9.48138 13.75 11.0002C13.75 12.5189 12.5188 13.7502 11 13.7502Z"
                          stroke="black"
                          strokeWidth="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    }
                    borderRadius={5}
                    h={'full'}
                    w={'full'}
                    px={10}
                    fontWeight={600}
                    fontFamily={'Inter'}
                    variant={'cubikFilled'}
                  >
                    Send Donation
                  </Button>
                </PopoverTrigger>

                <Portal>
                  <PopoverContent
                    display={{
                      base: 'none',
                      md: 'block',
                    }}
                    bg={'white'}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton color={'black'} />
                    <PopoverBody p={4} borderRadius={5} minH={32}>
                      <Box color={'black'} fontSize={'sm'} fontWeight={600}>
                        WTF is Donation?
                      </Box>
                      <Box
                        my={2}
                        color={'black'}
                        fontSize={'xs'}
                        fontWeight={500}
                      >
                        {`Currently, the project isn't in a active grants round.
                        Contributions done now go directly to the project
                        without any matching with any additional funds.`}
                      </Box>
                      <Button
                        fontSize={'sm'}
                        py={0}
                        px={3}
                        borderRadius={'full'}
                        color={'black'}
                        bg={'#FFD600'}
                        _hover={{
                          bg: '#FFD600',
                        }}
                        onClick={() => setIsHovered(false)}
                      >
                        Dismiss
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            )}
          </HStack>
          <EventSelector events={projectWithEvent.events} />
        </Box>
      </Stack>
    </>
  );
};
