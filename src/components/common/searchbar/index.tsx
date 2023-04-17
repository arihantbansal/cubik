import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

type SearchBarProps = {
  display?: any;
  width: any;
};

export const SearchBar = ({ display, width }: SearchBarProps) => {
  return (
    <InputGroup
      display={display}
      rounded="8px"
      h="fit-content"
      background={'#0F0F0F'}
      border="1px solid #1B181A"
      w={width}
      zIndex="1"
    >
      <InputLeftElement
        w="3.5rem"
        h="full"
        pointerEvents="none"
        bg="transparent"
      >
        <BiSearch size="1.4rem" color="#75757530" />
      </InputLeftElement>
      <Input
        variant={'unstyled'}
        pl="3rem"
        fontSize={'md'}
        background="#05060F"
        bg="transparent"
        placeholder="Search "
        _placeholder={{
          fontcolor: '#757575',
          fontSize: 'md',
          opacity: '0.3',
          fontWeight: '400',
        }}
        h="2.5rem"
        pb={'3px'}
      />
    </InputGroup>
  );
};
