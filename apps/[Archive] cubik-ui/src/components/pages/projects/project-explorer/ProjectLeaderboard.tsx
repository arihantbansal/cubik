import { Avatar } from "@chakra-ui/avatar";
import { HStack, Text } from "@chakra-ui/layout";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { ProjectExplorerType } from "@cubik/common-types";
import React from "react";

export const ProjectLeaderboard = ({
  explorerProjects,
}: {
  explorerProjects: ProjectExplorerType[];
}) => {
  return (
    <>
      <TableContainer>
        <Table
          bg={""}
          w="full"
          minW="34rem"
          overflowX="scroll"
          variant="unstyled"
        >
          <Thead bg="neutral.3">
            <Tr>
              <Th width="10%" textAlign={"center"}>
                Rank
              </Th>
              <Th width="15%" textAlign={"center"}>
                Name
              </Th>
              <Th width="15%" textAlign={"center"}>
                Unique Contributors
              </Th>
              <Th width="15%" textAlign={"center"}>
                Estimated Match
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {explorerProjects
              .sort((a, b) => b.projectEvent.amount - a.projectEvent.amount)
              .map((item, index) => {
                return (
                  <>
                    <Tr>
                      <Td textAlign="center" width={"10rem"}>
                        {index + 1}
                      </Td>
                      <Td>
                        <HStack
                          align={"center"}
                          gap={{ base: "8px", md: "16px" }}
                        >
                          <Avatar
                            width={{ base: "36px", md: "44px" }}
                            height={{ base: "36px", md: "44px" }}
                            src={item.logo}
                          />

                          <Text>{item.title}</Text>
                        </HStack>
                      </Td>
                      <Td textAlign={"center"}>{item.contributorCount + 3}</Td>
                      <Td textAlign={"center"}>
                        {item.projectEvent.amount.toLocaleString()}
                      </Td>
                    </Tr>
                  </>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
