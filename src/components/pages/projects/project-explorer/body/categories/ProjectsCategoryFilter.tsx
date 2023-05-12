import {
  Box,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BiCheck, BiSearch } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';
import CategoryTag from '~/components/common/tags/CategoryTags';
import { category } from '~/components/pages/create-project/projectCategories';

export type CategoryType = {
  label: string;
  value: string;
};

type ProjectsCategoryFilterProps = {
  handleCategoryFilter: (category?: CategoryType) => void;
};

export const ProjectsCategoryFilter: React.FC<ProjectsCategoryFilterProps> = ({
  handleCategoryFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
    handleCategoryFilter(category);
  };

  const isCategorySelected = (category: CategoryType) => {
    if (selectedCategory?.value === category.value) {
      return true;
    }
    return false;
  };

  const filteredCategories = category.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HStack w="full" justify={'space-between'}>
      <HStack
        ref={scrollRef}
        overflow="clip"
        w="full"
        justify="start"
        whiteSpace="nowrap"
      >
        {!selectedCategory && (
          <>
            <Center
              as="button"
              color="#ADB8B6"
              onClick={() =>
                handleCategoryClick({
                  label: 'defi',
                  value: 'defi',
                })
              }
            >
              <CategoryTag isSelected={true}>All Projects</CategoryTag>
            </Center>
            {['defi', 'Solana Infrastructure', 'Social', 'DAO'].map((cat) => (
              <Center
                key={cat}
                as="button"
                color="#ADB8B6"
                onClick={() =>
                  handleCategoryClick({
                    label: cat,
                    value: cat,
                  })
                }
              >
                <CategoryTag>{cat}</CategoryTag>
              </Center>
            ))}
          </>
        )}
        {selectedCategory && (
          <>
            <Center
              cursor="pointer"
              rounded="full"
              px="12px"
              py="12px"
              bg="#010F0D"
              color="#ADB8B6"
              _hover={{
                color: '#14665B',
                bg: '#E0FFFD',
              }}
              onClick={() => setSelectedCategory(undefined)}
            >
              <RxCross1 />
            </Center>
            <CategoryTag isSelected={true}>
              {selectedCategory.label}
            </CategoryTag>
          </>
        )}
      </HStack>
      <Center position={'relative'} w={{ base: '200px', md: '320px' }}>
        <InputGroup rounded="12px" w={{ base: '200px', md: '320px' }}>
          <InputLeftElement
            w="3rem"
            h="full"
            pointerEvents="none"
            bg="transparent"
          >
            <BiSearch size="1.4rem" color="#75757580" />
          </InputLeftElement>
          <Input
            rounded="12px"
            placeholder="Search Categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {searchTerm && (
          <VStack
            border="1px solid #A8F0E625"
            rounded="16px"
            zIndex={'100'}
            maxH="20rem"
            overflow={'scroll'}
            top="120%"
            w={{ base: '200px', md: '320px' }}
            right="0"
            bg="red"
            position={'absolute'}
            alignItems={'start'}
            p="16px"
            gap="8px"
            backgroundColor={'#0C0D0D'}
          >
            {filteredCategories.map((cat) => (
              <HStack
                as="button"
                key={cat.value}
                onClick={() => handleCategoryClick(cat)}
              >
                <Center
                  w="20px"
                  height="20px"
                  rounded="4px"
                  outline={'1px solid #A8F0E6'}
                  bg={isCategorySelected(cat) ? '#A8F0E6' : 'transparent'}
                >
                  {isCategorySelected(cat) && (
                    <BiCheck size="1rem" color="#0C0D0D" />
                  )}
                </Center>
                <Box
                  as="p"
                  textStyle={{ base: 'body6', md: 'body5' }}
                  color="white"
                >
                  {cat.label}
                </Box>
              </HStack>
            ))}
          </VStack>
        )}
      </Center>
    </HStack>
  );
};
