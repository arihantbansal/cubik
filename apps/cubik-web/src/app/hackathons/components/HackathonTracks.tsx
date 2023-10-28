import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Box,
  Center,
  HStack,
  VStack,
} from '@/utils/chakra';
import { formatNumberWithK } from '@/utils/helpers/formatWithK';

type PropsType = {
  tracks: {
    name: string;
    description: string;
    sponsorOrganizations: [
      {
        name: string;
        logo: string;
        url: string;
      },
    ];
    prize: {
      unit: string;
      value: number;
    }[];
    prizeBreakdown: [{}];
    ownerOfTrack: [
      {
        name: string;
        userId?: string;
        position?: string;
        url?: string;
      },
    ];
    judges: [
      {
        name: string;
        userId?: string;
        position?: string;
        url?: string;
      },
    ];
  }[];
};

const HackathonTracks = ({ tracks }: PropsType) => {
  return (
    <Accordion m="0" border="none" gap="1rem" width="full" allowToggle>
      {tracks &&
        tracks?.reverse().map((track) => (
          <>
            <AccordionItem
              id={track.name}
              my="32px"
              rounded="16px"
              border="1px solid"
              borderColor="neutral.3"
              backgroundColor="neutral.2"
            >
              <>
                <AccordionButton
                  p={{ base: '16px', md: '24px' }}
                  rounded="16px"
                  backgroundColor="neutral.2"
                >
                  <HStack w="full" align="start" gap="24px">
                    <AvatarGroup size="lg" spacing={`-50px`} max={6}>
                      {track.sponsorOrganizations
                        ? track.sponsorOrganizations?.map((org) => (
                            <Avatar
                              key={org.name}
                              borderRadius="12px"
                              name={org.name}
                              src={org.logo}
                            />
                          ))
                        : ''}
                    </AvatarGroup>
                    <VStack color="neutral.11" align="start" spacing="12px">
                      <Box as="p" textStyle={'title2'} textAlign="left">
                        {track.name}
                      </Box>
                      <Box
                        as="p"
                        textStyle={'body4'}
                        fontWeight={'500 !important'}
                        textAlign="left"
                        color="neutral.9"
                        maxW={'90%'}
                        noOfLines={1}
                      >
                        {track.description}
                      </Box>
                    </VStack>
                    <Center ml="auto" p="4px" bg="neutral.4" rounded="full">
                      <AccordionIcon />
                    </Center>
                  </HStack>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="start" gap="16px">
                    <VStack color="white" align="start" gap="18px" p="12px">
                      <Box as="p" textStyle={'body4'} textAlign="left">
                        {track.description}
                      </Box>
                      {/*  <HStack gap="8px">
                     {track.links.map((link) => (
                          <Tag
                            as="a"
                            cursor={"pointer"}
                            href={link.link}
                            target="_blank"
                            p="8px 12px"
                          >
                            <TagLabel fontWeight="700">{link.title}</TagLabel>
                            <TagRightIcon boxSize="12px" as={CgExternal} />
                          </Tag>
                        ))}   
                    </HStack>*/}
                    </VStack>
                    <VStack align="start" gap="16px" px="16px">
                      <Box
                        color="white"
                        as="p"
                        textStyle={'title2'}
                        textAlign="left"
                      >
                        Prize
                      </Box>
                      <HStack gap="16px">
                        {track.prize.map((prize, index) => (
                          <HStack
                            key={index}
                            bg="#ffffff08"
                            rounded="8px"
                            shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                            outline="1px solid #ffffff16"
                            p={{
                              base: '8px',
                              md: '12px 24px',
                            }}
                            align={'flex-end'}
                            gap="8px"
                          >
                            <Box
                              as="p"
                              textTransform="uppercase"
                              color="neutral.11"
                              textStyle={{ base: 'body6', md: 'title5' }}
                            >
                              {formatNumberWithK(prize.value)}
                            </Box>{' '}
                            <Box
                              color="#B4B0B2"
                              textTransform={'uppercase'}
                              as="p"
                              textStyle={{
                                base: 'body6',
                                md: 'overline3',
                              }}
                            >
                              ${prize.unit}
                            </Box>
                          </HStack>
                        ))}
                      </HStack>
                    </VStack>
                    {/* <VStack align="start" gap="16px" px="16px">
                      <Box
                        color="white"
                        as="p"
                        textStyle={"title2"}
                        textAlign="left"
                      >
                        Judges
                      </Box>
                      <HStack gap="16px">
                        {track.judges.map((judge, index) => (
                          <HStack
                            rounded="full"
                            key={index}
                            bg="#ffffff08"
                            shadow="0px 4px 24px rgba(0, 0, 0, 0.08)"
                            //   outline="1px solid #ffffff16"
                            p={{
                              base: "8px",
                              md: "4px 16px 4px 4px",
                            }}
                            align={"center"}
                            gap="8px"
                          >
                            <Avatar
                              size="sm"
                              name={judge.name}
                              src={judge.url}
                            />
                            <Box
                              as="p"
                              textTransform="lowercase"
                              color="neutral.11"
                              pb="0.2rem"
                              textStyle={{ base: "body6", md: "title5" }}
                            >
                              @{judge.name}
                            </Box>{" "}
                          </HStack>
                        ))}
                      </HStack>
                    </VStack> */}
                  </VStack>
                </AccordionPanel>
              </>
            </AccordionItem>
          </>
        ))}
    </Accordion>
  );
};

export default HackathonTracks;
