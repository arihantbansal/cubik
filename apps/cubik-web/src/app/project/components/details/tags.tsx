import React from 'react';
import { randomColorSet } from '@/theme/colorSet';
import { Box, HStack, VStack } from '@/utils/chakra';

interface Props {
  tags: string;
}
export const ProjectTags = (props: Props) => {
  const tags = JSON.parse(props.tags) as {
    label: string;
    value: string;
    colorScheme: string;
  }[];
  const randomColor = randomColorSet(tags.length || 0);

  return (
    <>
      <VStack align={'start'} gap={3}>
        <HStack>
          <Box>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 20L10 4M14 20L17 4M19.5 15H3.5M20.5 9L4.5 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box color={'white'} fontSize={'xl'} fontWeight={700}>
            Tags
          </Box>
        </HStack>
        <HStack flexWrap={'wrap'}>
          {tags.map((tag, index) => {
            return (
              <>
                <Box
                  py={2}
                  px={5}
                  borderRadius={8}
                  border={'1.5px solid'}
                  borderColor={randomColor[index]?.border}
                  color={randomColor[index]?.color}
                >
                  {tag.label}
                </Box>
              </>
            );
          })}
        </HStack>
      </VStack>
    </>
  );
};
