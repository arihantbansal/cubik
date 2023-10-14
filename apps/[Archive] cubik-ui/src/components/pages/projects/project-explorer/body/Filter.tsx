import { useRef } from "react";
import { CategoryType } from "./ProjectListWithFilter";
import { Box, Center, HStack, Stack, VStack } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { InputGroup, InputRightElement, Input } from "@chakra-ui/input";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Skeleton } from "@chakra-ui/skeleton";
import { Collapse } from "@chakra-ui/transition";
import { BiChevronDown, BiCheck } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { RiFilter3Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import CategoryTag from "~/components/common/tags/CategoryTags";
import { Select } from "@chakra-ui/react";

const showCasedCategories = [
  { value: "defi", label: "defi" },
  { value: "solana_infrastructure", label: "Solana Infrastructure" },
  { value: "sdk", label: "SDK" },
  { value: "consumer", label: "Consumer" },
  { value: "developer_tools", label: "Developer Tools" },
];

export const Filters = ({
  filteredProjectsLoading,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  handleCategoryClick,
  isCategorySelected,
  filteredCategories,
  handleRoundClick,
  isRoundSelected,
}: {
  filteredProjectsLoading: boolean;
  selectedCategory: CategoryType | null | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryType | null | undefined>
  >;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleCategoryClick: (_category?: CategoryType | undefined) => void;
  isCategorySelected: (_category: CategoryType) => boolean;
  filteredCategories: {
    label: string;
    value: string;
  }[];
  handleRoundClick: (_roundId: string) => void;
  isRoundSelected: (_roundId: string) => boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle } = useDisclosure();

  const CategoryFilters = () => {
    return (
      <HStack
        ref={scrollRef}
        overflow="clip"
        w="full"
        justify="start"
        whiteSpace="nowrap"
        position={"relative"}
        _after={{
          content: '""',
          position: "absolute",
          top: "45%",
          right: "0%",
          transform: "translateY(-50%)",
          height: { base: "2.2rem", md: "3rem" },
          width: "3rem",
          background: "linear-gradient(90deg, #0C0D0D00 0%, #000 80%)",
        }}
      >
        {selectedCategory ? (
          <>
            <Center
              cursor="pointer"
              rounded="full"
              px="12px"
              py="12px"
              bg="#010F0D"
              color="#ADB8B6"
              _hover={{
                color: "#14665B",
                bg: "#E0FFFD",
              }}
              onClick={() => {
                setSelectedCategory(undefined);
                setSearchTerm("");
              }}
            >
              <Box
                as={RxCross1}
                boxSize={["12px", "14px", "18px"]}
                color="#626665"
              />
            </Center>
            <CategoryTag isSelected={true}>
              {selectedCategory.label}
            </CategoryTag>
          </>
        ) : (
          <>
            <Center
              as="button"
              color="#ADB8B6"
              onClick={() => handleCategoryClick()}
            >
              <CategoryTag isSelected={true}>All Projects</CategoryTag>
            </Center>
            {showCasedCategories.map((cat) => (
              <Center
                key={cat.value}
                as="button"
                color="#ADB8B6"
                onClick={() => handleCategoryClick(cat)}
              >
                <CategoryTag>{cat.label}</CategoryTag>
              </Center>
            ))}
          </>
        )}
      </HStack>
    );
  };

  return (
    <VStack w="full" spacing="0px">
      <HStack w="full" justify={"space-between"}>
        <CategoryFilters />
        <HStack w="fit-content">
          <Button
            aria-label="Options"
            rounded="12px"
            onClick={onToggle}
            p={{ base: "8px", md: "10px 16px" }}
            height="100%"
            backgroundColor={"neutral.3"}
            color="#626665"
            _hover={{
              backgroundColor: "neutral.4",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            leftIcon={
              <Box as={RiFilter3Fill} boxSize={["20px"]} color="#626665" />
            }
          >
            Filter
          </Button>
        </HStack>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "16px", md: "32px" }}
          pt={{ base: "16px", md: "32px" }}
          w="92vw"
          maxW="7xl"
          justify="space-between"
          zIndex={1}
          overflow={"visible"}
        >
          {/* Category */}
          <VStack w="full" zIndex={1000} gap="8px">
            <Box w="full" textStyle={"body4"} color="neutral.8">
              Categories
            </Box>
            <InputGroup
              position={"relative"}
              rounded="12px"
              w={{ base: "full", md: "full" }}
            >
              <InputRightElement
                h={{ base: "2.2rem", md: "2.5rem" }}
                w={{ base: "2.2rem", md: "2.5rem" }}
                pointerEvents="none"
                bg="transparent"
              >
                <Box
                  as={BiChevronDown}
                  boxSize={["14px", "16px", "18px"]}
                  color="#626665"
                />
              </InputRightElement>
              <Input
                rounded="12px"
                h={{ base: "2.2rem", md: "2.5rem" }}
                outline="none"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                _hover={{
                  boxShadow: "none !important",
                  borderColor: "#ffffff10 !important",
                  outline: "#ffffff10 !important",
                }}
                _focus={{
                  boxShadow: "none !important",
                  borderColor: "#ffffff10 !important",
                  outline: "#ffffff10 !important",
                }}
                _focusVisible={{
                  boxShadow: "none !important",
                  borderColor: "none !important",
                  outline: "none !important",
                }}
                _active={{
                  boxShadow: "none !important",
                  borderColor: "none !important",
                  outline: "none !important",
                }}
                _placeholder={{
                  fontSize: { base: "12px", md: "14px" },
                  lineHeight: { base: "18px", md: "20px" },
                  color: "#75757580",
                }}
              />
              hello
              {searchTerm && (
                <VStack w="full" position={"absolute"} zIndex={1000}>
                  <VStack
                    border="1px solid #A8F0E625"
                    rounded="16px"
                    zIndex={"100"}
                    maxH="13rem"
                    overflow={"scroll"}
                    w={{ base: "full", md: "320px" }}
                    bg="red"
                    alignItems={"start"}
                    p="0"
                    backgroundColor={"#0C0D0D"}
                  >
                    <HStack
                      px="16px"
                      pt="12px"
                      pb="8px"
                      w="full"
                      justify={"space-between"}
                      backgroundColor={"#0C0D0D"}
                      color="neutral.7"
                    >
                      <Box w="100%" zIndex="9" as="p" textStyle={"body4"}>
                        Categories
                      </Box>
                      <Box
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory(undefined);
                        }}
                        as={MdClear}
                        boxSize={["10px", "12px", "14px"]}
                      />
                    </HStack>
                    {filteredCategories?.length === 0 ? (
                      <Center w="full" p="12px" pt="0">
                        <Skeleton w="full" height={"2rem"} opacity="12px" />
                      </Center>
                    ) : (
                      filteredCategories?.map((cat) => (
                        <HStack
                          px="24px"
                          py="6px"
                          as="button"
                          key={cat.value}
                          onClick={() => handleCategoryClick(cat)}
                        >
                          <Center
                            w="20px"
                            height="20px"
                            rounded="4px"
                            outline={"1px solid #A8F0E6"}
                            bg={
                              isCategorySelected(cat)
                                ? "#A8F0E6"
                                : "transparent"
                            }
                          >
                            {isCategorySelected(cat) && (
                              <Box
                                as={BiCheck}
                                boxSize={["10px", "12px", "16px"]}
                                color="#0C0D0D"
                              />
                            )}
                          </Center>
                          <Box
                            as="p"
                            textStyle={{ base: "body6", md: "body5" }}
                            color="white"
                          >
                            {cat.label}
                          </Box>
                        </HStack>
                      ))
                    )}
                  </VStack>
                </VStack>
              )}
            </InputGroup>
          </VStack>
          {/* Rounds */}
          <VStack w="full" gap="8px">
            <Box w="full" textStyle={"body4"} color="neutral.8">
              Rounds
            </Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                w="full"
                as={IconButton}
                aria-label="Options"
                rounded="12px"
                p={{ base: "8px", md: "10px" }}
                height="100%"
                backgroundColor={"neutral.3"}
                _hover={{
                  backgroundColor: "neutral.4",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                _active={{
                  backgroundColor: "neutral.4",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                icon={
                  <Box as={RiFilter3Fill} boxSize={["20px"]} color="#626665" />
                }
              />
              <MenuList
                w="full"
                outline="0px"
                border="1px solid #A8F0E625"
                rounded="16px"
                zIndex={"99"}
                maxH="20rem"
                overflow={"scroll"}
                // w={{ base: '200px', md: '320px' }}
                bg="red"
                alignItems={"start"}
                gap="8px"
                p="16px"
                backgroundColor={"#0C0D0D"}
              >
                <Box
                  pb="12px"
                  as="p"
                  textStyle={{ base: "body5", md: "body4" }}
                  color="neutral.7"
                >
                  Ongoing Rounds
                </Box>
                {filteredProjectsLoading ? (
                  <VStack w="full" gap="8px">
                    <Skeleton width="full" height="1.4rem" opacity="0.5" />
                    <Skeleton width="full" height="1.4rem" opacity="0.5" />
                    <Skeleton width="full" height="1.4rem" opacity="0.5" />
                  </VStack>
                ) : (
                  [
                    {
                      id: "934kc83jcnejke93u4h",
                      colorScheme: "pink",
                      roundName: "Climate Round",
                    },
                    {
                      id: "lwe9o2mncvites",
                      colorScheme: "teal",
                      roundName: "Dev tooling Round",
                    },
                  ]?.map((round) => (
                    <MenuItem
                      backgroundColor={"#0C0D0D"}
                      _hover={{
                        backgroundColor: `surface.${round.colorScheme}.3`,
                      }}
                      rounded="8px"
                      key={round.id}
                    >
                      <HStack
                        as="button"
                        onClick={() => handleRoundClick(round.id)}
                      >
                        <Center
                          w="20px"
                          height="20px"
                          rounded="4px"
                          border={"1px solid"}
                          borderColor={`surface.${round.colorScheme}.1`}
                          bg={
                            isRoundSelected(round?.id)
                              ? `surface.${round?.colorScheme}.1`
                              : "transparent"
                          }
                        >
                          {isRoundSelected(round?.id) && (
                            <BiCheck size="1rem" color="#0C0D0D" />
                          )}
                        </Center>
                        <Box
                          as="p"
                          textStyle={{ base: "body6", md: "body5" }}
                          color={`surface.${round?.colorScheme}.1`}
                        >
                          {round?.roundName}
                        </Box>
                      </HStack>
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>
          </VStack>
          {/* Sort by */}
          <VStack w="full" gap="8px">
            <Box w="full" textStyle={"body4"} color="neutral.8">
              Sort by
            </Box>
            <Select
              defaultValue={1}
              rounded="12px"
              h={{ base: "2.2rem", md: "2.5rem" }}
              textStyle={{ base: "body5", md: "body4" }}
              color="neutral.7"
              outline="none"
              w="full"
              border={"none"}
              boxShadow="none"
              _hover={{
                boxShadow: "none !important",
                borderColor: "#ffffff10 !important",
                outline: "#ffffff10 !important",
              }}
              _focus={{
                boxShadow: "none !important",
                borderColor: "#ffffff10 !important",
                outline: "#ffffff10 !important",
              }}
              _focusVisible={{
                boxShadow: "none !important",
                borderColor: "none !important",
                outline: "none !important",
              }}
              _active={{
                boxShadow: "none !important",
                borderColor: "none !important",
                outline: "none !important",
              }}
              _placeholder={{
                fontSize: { base: "12px", md: "14px" },
                lineHeight: { base: "18px", md: "20px" },
                color: "#75757580",
              }}
            >
              <option value="option1">Est. Funds Raised ( Low to how )</option>
              <option value="option1">Est. Funds Raised ( High to low )</option>
              <option value="option1">
                Contributors ( Highest to lowest )
              </option>
              <option value="option2">
                Contributors ( Lowest to highest )
              </option>
            </Select>
          </VStack>
        </Stack>
      </Collapse>
    </VStack>
  );
};
function useDisclosure(): { isOpen: any; onToggle: any } {
  throw new Error("Function not implemented.");
}
