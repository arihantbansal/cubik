"use client";
"use client";
import {
  Box,
  Center,
  VStack,
  Progress,
  Avatar,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Text,
} from "@/utils/chakra";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import Image from "next/image";
import { useMemo, useState, Fragment, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProjects } from "../Sponsors/data";

const HackathonProjectsView = () => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleRowExpanded = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const projectsInfo = useQuery({
    queryKey: ["projectsInfo"],
    queryFn: async () => fetchProjects(),
  });

  const data = useMemo(() => {
    const response = projectsInfo.data?.map((data) => {
      const NoOfProjectCreators = data.project;
      data.project;
      return {
        project: {
          name: data.project.name,
          logo: data.project.logo,
          owner: {
            username: data.project.owner.username,
          },
        },
        contributions: 0,
        voters: 0,
        matching: 0,
        status: data.project.status,
        tracks: data.tracks,
      };
    });

    return response;
  }, [projectsInfo.data]);

  const columns = useMemo(
    () => [
      {
        header: "Project",
        accessorKey: "project",
        cell: (props: any) => {
          return (
            <HStack gap="16px">
              <Avatar
                src={props.getValue().logo}
                name={props.getValue().name}
                width={"48px"}
                height={"48px"}
              />
              <VStack gap="8px" align="start">
                <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600">
                  {props.getValue().name}
                </Text>
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  color="neutral.7"
                  fontWeight="600"
                >
                  by @{props.getValue().owner.username}
                </Text>
              </VStack>
            </HStack>
          );
        },
      },
      {
        PrizePool: "Contribution",
        accessorKey: "contributions",
      },
      {
        submissions: "Voters",
        accessorKey: "voters",
      },
      {
        contributions: "Status",
        accessorKey: "status",
        cell: (props: any) => {
          return (
            <Box
              w="fit-content"
              bg={props.getValue() === "VERIFIED" ? "#0D2F00" : "#181818"}
              color={props.getValue() === "VERIFIED" ? "#31F579" : "#828282"}
              borderColor={
                props.getValue() === "VERIFIED" ? "#31F579" : "#828282"
              }
              border="1px solid"
              fontSize="12px"
              padding="6px 18px"
              height="fit-content"
              rounded={"full"}
              textTransform={"capitalize"}
            >
              {props.getValue()}
            </Box>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useReactTable({
    data: data || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("projects - ", projectsInfo.data);
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
                {headerGroup.headers?.map((header, index) => (
                  <Th
                    key={index}
                    p="16px"
                    fontWeight="600"
                    fontSize={{ base: "12px", md: "14px" }}
                    textTransform={"capitalize"}
                    id={header.id}
                    cursor={"pointer"}
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
                  {" "}
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
                    <Td colSpan={columns.length}></Td>
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

export default HackathonProjectsView;
