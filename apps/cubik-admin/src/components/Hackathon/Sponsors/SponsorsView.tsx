"use client";
import {
  Box,
  Center,
  VStack,
  Progress,
  Tag,
  Avatar,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Spinner,
  Skeleton,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Select,
} from "@/utils/chakra";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowModel,
  Table,
} from "@tanstack/react-table";
import Image from "next/image";
import { sponsorsData } from "./sponsors";
import { useMemo, useState, Fragment, useEffect } from "react";

type InnerTableProps = {
  projectId: string;
  onProjectSelect: (projectId: string) => void;
};
type projectDataType = {
  index: number;
  project: { id: string; name: string; image: string };
  contributions: number;
  voters: number;
  owner: string;
  status: string;
};

const SponsorSubmissionBar = ({ value }: { value: number }) => {
  return (
    <HStack gap="8px">
      // make sure the value is normalized to 100 before passing it to the
      progress bar
      <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
        {value}
      </Text>
      <Progress
        value={value}
        size="xs"
        colorScheme="yellow"
        bg="#292929"
        w="5rem"
      />
    </HStack>
  );
};

const ProjectStatusModal = ({
  status,
  projectId,
  projectName,
  projectImage,
  projectDescription,
  trackName,
  prizeBreakdown,
}: {
  status: string;
  projectId: string;
  projectName: string;
  projectImage: string;
  projectDescription: string;
  trackName: string;
  prizeBreakdown: [{ title: string; value: string; amount: string }];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getValues(arg0: string): import("react").ReactNode {
    throw new Error("Function not implemented.");
  }
  console.log("prize breakdown - ", prizeBreakdown);
  return (
    <>
      <HStack>
        <Box
          bg={status === "WINNER" ? "#0D2F00" : "#181818"}
          color={status === "WINNER" ? "#31F579" : "#828282"}
          borderColor={status === "WINNER" ? "#31F579" : "#828282"}
          border="1px solid"
          fontSize="12px"
          padding="6px 18px"
          height="fit-content"
          rounded={"full"}
          textTransform={"capitalize"}
        >
          {status}
        </Box>
        // only show it to admin
        <Center
          onClick={onOpen}
          width={{ base: "16px", sm: "18px", md: "20px" }}
          height={{ base: "16px", sm: "18px", md: "20px" }}
          position="relative"
          right="auto"
          bottom="auto"
          transition="all 0.2s ease-in-out"
        >
          <Image
            src="/icons/chevron/down.svg"
            alt="Solana"
            width={"100"}
            height={"100"}
          />
        </Center>
      </HStack>
      <Modal id={projectId} variant="cubik" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Winners</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              w="full"
              align={"start"}
              spacing={{ base: "16px", md: "24px" }}
            >
              <HStack
                bg="neutral.3"
                w="full"
                rounded="12px"
                p="12px"
                align={"start"}
                gap={{ base: "14px", md: "16px" }}
              >
                <Avatar
                  src={projectImage as string}
                  name={projectName}
                  borderRadius="8px"
                  width={{ base: "60px", md: "66px" }}
                  height={{ base: "60px", md: "66px" }}
                />
                <VStack textAlign={"start"} align={"start"} spacing={"8px"}>
                  <Box
                    as="p"
                    textStyle={{ base: "title4", md: "title3" }}
                    color="neutral.11"
                  >
                    {projectName}
                  </Box>
                  <Box
                    as="p"
                    textStyle={{ base: "title7", md: "title6" }}
                    color="neutral.8"
                  >
                    {projectDescription}
                  </Box>
                </VStack>
              </HStack>
              <HStack w="full" justify={"space-between"}>
                <Box
                  as="p"
                  textStyle={{ base: "title4", md: "title2" }}
                  color="neutral.11"
                >
                  Track
                </Box>
                <Box
                  as="p"
                  textStyle={{ base: "title7", md: "title5" }}
                  color="neutral.8"
                  bg="neutral.3"
                  rounded="full"
                  p="12px 16px"
                >
                  {trackName}
                </Box>
              </HStack>
              <HStack w="full" justify={"space-between"}>
                <Box
                  as="p"
                  textStyle={{ base: "title4", md: "title2" }}
                  color="neutral.11"
                >
                  Prize
                </Box>
                <Center rounded="full">
                  <Select
                    fontSize="14px"
                    fontWeight={"600"}
                    bg="neutral.3"
                    rounded="full"
                    color="neutral.8"
                    border="none"
                    placeholder="Select Prize"
                    _hover={{
                      border: "none",
                      boxShadow: "none",
                      outline: "none",
                    }}
                  >
                    {prizeBreakdown.map((prize) => (
                      <option value={prize.value}> {prize.title}</option>
                    ))}
                  </Select>
                </Center>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              variant={"cubikOutlined"}
              onClick={async () => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button variant={"cubikFilled"} loadingText="Verifying">
              Verify Wallet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProjectDetailsMenu = ({}) => {
  return (
    <Menu>
      <MenuButton bg="none">
        {" "}
        <Center
          width={{ base: "16px", md: "20px" }}
          position="relative"
          right="auto"
          bottom="auto"
        >
          <Image
            src="/icons/vertical.svg"
            alt="Solana"
            width={"100"}
            height={"100"}
          />
        </Center>
      </MenuButton>
      <MenuList
        rounded="lg"
        backgroundColor="neutral.3"
        outline="none"
        border="1px solid #212121"
        gap="12px"
        color="white"
      >
        <MenuItem p="12px 16px" backgroundColor="neutral.3" rounded="lg">
          View Project
        </MenuItem>
        <MenuItem p="12px 16px" backgroundColor="neutral.3" rounded="lg">
          Visit Profile
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const EmptyState = () => {
  return (
    <VStack
      border="1px dashed"
      borderColor="#212121"
      rounded="12px"
      p={{ base: "32px", md: "80px" }}
    >
      <Center
        width={{ base: "200px", sm: "22px", md: "300px" }}
        height={{ base: "140px", sm: "22px", md: "200px" }}
        position="relative"
        right="auto"
        bottom="auto"
      >
        <Image
          src="/illustrations/table_empty_state.svg"
          alt="cubik hackathon sponsors empty state"
          width={"400"}
          height={"400"}
        />
      </Center>
      <VStack h="full" align="center" spacing={["4px", "6px", "8px"]}>
        <Box
          color="white"
          as="p"
          fontWeight={"800"}
          textStyle={{ base: "title3", md: "title1" }}
        >
          No Data Available
        </Box>
        <Box
          textAlign={"center"}
          maxW="16rem"
          color="#ADB8B6"
          as="p"
          textStyle={{ base: "body6", md: "body5" }}
        >
          Once the voting period starts the data will be available to view here
        </Box>
      </VStack>
    </VStack>
  );
};

const fetchInnerTableData = async (rowId: string) => {
  // Replace this with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          index: 1,
          project: {
            id: 1,
            name: "TinyDancer",
            image:
              "https://pbs.twimg.com/profile_images/1628722617334267905/s7UFpQtX_400x400.jpg",
            description: "First Light Client on Solana",
          },
          contributions: 134.5,
          voters: 69,
          owner: "@anoushk",
          status: "WINNER",
        },
        {
          index: 2,
          project: {
            id: 1,
            name: "Anchor",
            image: "https://www.anchor-lang.com/logo.png",
            description: "Sealevel runtime for solana",
          },
          contributions: 2094.1,
          voters: 398,
          owner: "@armani",
          status: "Not Set",
        },
        {
          index: 3,
          project: {
            id: 1,
            name: "Solana Unity SDK",
            image:
              "https://camo.githubusercontent.com/67b4157acd8cf062d897adb3828d76b31a2721b18e396cdb52f8745a0f37fdc7/68747470733a2f2f736f6c616e612e756e6974792d73646b2e67672f6c6f676f2e706e67",
            description: "SDK for development of games on solana using Unity",
          },
          contributions: 223,
          voters: 46,
          owner: "@dhruv",
          status: "Not Set",
        },
      ]);
    }, 1000);
  });
};

const InnerTable = ({
  rowId,
  prizeBreakdown,
  trackName,
}: {
  rowId: string;
  prizeBreakdown: [{ title: string; value: string; amount: string }];
  trackName: string;
}) => {
  const [innerTableData, setInnerTableData] = useState<projectDataType[]>([]);
  useEffect(() => {
    // Fetch data when the component is mounted
    fetchInnerTableData(rowId).then((data) =>
      setInnerTableData(data as unknown as projectDataType[])
    );
  }, [rowId]);

  const innerTableColumns = useMemo(
    () => [
      {
        header: "",
        accessorKey: "index",
      },
      {
        header: "Project",
        accessorKey: "project",
        cell: (props: any) => {
          return (
            <HStack gap="8px">
              <Avatar
                src={props.getValue().image}
                name={props.getValue().name}
                width={8}
                height={8}
              />
              <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
                {props.getValue().name}
              </Text>
            </HStack>
          );
        },
      },
      {
        header: "Contributions",
        accessorKey: "contributions",
      },
      {
        header: "Voters",
        accessorKey: "voters",
      },
      {
        header: "Owner",
        accessorKey: "owner",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props: any) => {
          const projectData = props.row.original.project;
          return (
            <ProjectStatusModal
              status={props.getValue()}
              projectId={projectData.id}
              projectName={projectData.name}
              projectImage={projectData.image}
              projectDescription={projectData.description}
              prizeBreakdown={prizeBreakdown}
              trackName={trackName}
            />
          );
        },
      },
    ],
    []
  );

  const innerTableInstance = useReactTable({
    data: innerTableData,
    columns: innerTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (innerTableData.length === 0)
    return (
      <ChakraTable px="4rem" size="sm" variant="unstyled">
        <Tbody>
          {Array.from({ length: 6 }, (_, index) => (
            <Tr>
              <Td p="16px">
                <Skeleton w="2rem" height="10px" />
              </Td>
              <Td p="16px">
                <Skeleton w="6rem" height="10px" />
              </Td>
              <Td p="16px">
                <Skeleton w="2rem" height="10px" />
              </Td>
              <Td p="16px">
                <Skeleton w="2rem" height="10px" />
              </Td>
              <Td p="16px">
                <Skeleton w="4rem" height="10px" />
              </Td>
              <Td p="16px">
                <Skeleton w="2rem" height="10px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    );

  return (
    <ChakraTable px="4rem" size="sm" variant="unstyled">
      <Thead color="neutral.8" fontFamily={"Plus Jakarta Sans, sans-serif"}>
        {innerTableInstance.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th
                p="16px"
                fontWeight="500"
                color="#636666"
                fontSize={{ base: "12px", md: "14px" }}
                textTransform={"capitalize"}
                id={header.id}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {innerTableInstance.getRowModel().rows.map((innerRow, rowIndex) => (
          <Fragment key={innerRow.id}>
            <Tr>
              {innerRow.getVisibleCells().map((cell, cellIndex) => (
                <Td
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight="600"
                  p="16px"
                  id={cell.id}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              <Td
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight="600"
                p="16px"
              >
                <ProjectDetailsMenu />
              </Td>
            </Tr>
          </Fragment>
        ))}
      </Tbody>
    </ChakraTable>
  );
};

const HackathonSponsorsView = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  if (sponsorsData.length === 0) return <EmptyState />;
  const data = useMemo(() => {
    return sponsorsData.map((sponsor) => {
      return {
        track: sponsor.name,
        prizePool: sponsor?.prize.map(
          (prize: { value: number; unit: string }) => {
            return `${prize.value} ${prize.unit}`;
          }
        ),
        // these are random numbers @dhruv fix this also
        submissions: Math.floor(Math.random() * 100),
        contributions: Math.floor(Math.random() * 100),
        prizeBreakdown: sponsor.prizeBreakdown,
      };
    });
  }, []);
  const columns = useMemo(
    () => [
      {
        header: "Track",
        accessorKey: "track",
      },
      {
        PrizePool: "Prize Pool",
        accessorKey: "prizePool",
      },
      {
        submissions: "Submissions",
        accessorKey: "submissions",
        cell: (props: any) => {
          return <SponsorSubmissionBar value={props.getValue()} />;
        },
      },
      {
        contributions: "Contributions",
        accessorKey: "contributions",
      },
    ],
    []
  );

  const tableInstance = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <TableContainer>
        <ChakraTable
          w="100%"
          minW="34rem"
          overflowX="scroll"
          variant="unstyled"
        >
          <Thead color="#636666" fontFamily={"Plus Jakarta Sans, sans-serif"}>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                <Th
                  w="3rem"
                  p="16px"
                  fontWeight="600"
                  fontSize={{ base: "12px", md: "14px" }}
                  textTransform={"capitalize"}
                ></Th>
                {headerGroup.headers.map((header) => (
                  <Th
                    p="16px"
                    fontWeight="600"
                    fontSize={{ base: "12px", md: "14px" }}
                    textTransform={"capitalize"}
                    id={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {tableInstance.getRowModel().rows.map((row, rowIndex) => (
              <Fragment key={row.id}>
                <Tr bg={expandedRows[row.id] ? "#080808" : "transparent"}>
                  <Td
                    w="3rem"
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight="600"
                    p="16px"
                  >
                    {rowIndex + 1}
                  </Td>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <Td
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="600"
                      id={cell.id}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  <Td w="3rem">
                    <button onClick={() => toggleRowExpanded(row.id)}>
                      <Center
                        width={{ base: "16px", sm: "18px", md: "20px" }}
                        height={{ base: "16px", sm: "18px", md: "20px" }}
                        position="relative"
                        right="auto"
                        bottom="auto"
                        transition="all 0.2s ease-in-out"
                        transform={
                          expandedRows[row.id] ? "rotate(-180deg)" : "none"
                        }
                      >
                        <Image
                          src="/icons/chevron/down.svg"
                          alt="Solana"
                          width={"100"}
                          height={"100"}
                        />
                      </Center>
                    </button>
                  </Td>
                </Tr>
                {expandedRows[row.id] && (
                  <Tr
                    w="full"
                    bg={"#080808"}
                    borderTop="4px solid black"
                    borderBottom="4px solid black"
                  >
                    <Td w="3rem" bg={"#080808"}></Td>
                    <Td colSpan={columns.length}>
                      <InnerTable
                        rowId={row.id}
                        //@ts-ignore
                        prizeBreakdown={row.original.prizeBreakdown}
                        trackName={row.original.track}
                      />
                    </Td>
                    <Td w="3rem" bg={"#080808"}></Td>
                  </Tr>
                )}
              </Fragment>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </div>
  );
};

export default HackathonSponsorsView;
