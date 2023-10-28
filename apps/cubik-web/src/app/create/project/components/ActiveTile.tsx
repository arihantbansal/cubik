import type { Dispatch, SetStateAction } from 'react';
import { Box, Center, HStack, VStack } from '@/utils/chakra';

interface Props {
  tileIndex: string;
  selectedEventId: string;
  setSelectedEventId: Dispatch<SetStateAction<string>>;
  name: string;
}
export const Tile = ({
  tileIndex,
  selectedEventId,
  setSelectedEventId,
  name,
}: Props) => {
  const isSelected = selectedEventId === tileIndex;

  return (
    <HStack
      border={'2px solid'}
      borderColor={isSelected ? '#14665B' : '#ffffff10'}
      backgroundColor={isSelected ? '#010F0D' : '#000000'}
      p={4}
      w="full"
      gap="24px"
      rounded="20px"
      justify={'space-between'}
      align="center"
      direction={{ base: 'column', md: 'row' }}
      onClick={() => {
        setSelectedEventId(tileIndex);
      }}
      position="relative"
      overflow={'hidden'}
      _after={{
        content: '""',
        zIndex: '1',
        position: 'absolute',
        bottom: '50%',
        left: '0%',
        transform: 'translate(0%, -50%)',
        width: '8rem',
        height: '8rem',
        backgroundColor: isSelected ? '#14665B' : '#ffffff10',
        filter: 'blur(100px)',
        borderRadius: 'full',
      }}
    >
      <VStack align="start" w="full" spacing="12px">
        <Box
          as="p"
          fontSize={'sm'}
          //   textStyle={{ base: "title4", sm: "title3", md: "title2" }}
          noOfLines={1}
          textAlign="left"
          color="white"
        >
          {name}
        </Box>
      </VStack>
      <Center
        rounded="full"
        border="3px solid"
        w="30px"
        h="30px"
        borderColor={isSelected ? '#14665B' : '#ADB8B6'}
        p="4px"
      >
        <Center
          rounded="full"
          w="full"
          h="full"
          backgroundColor={isSelected ? '#14665B' : ''}
        />
      </Center>
    </HStack>
  );
};
