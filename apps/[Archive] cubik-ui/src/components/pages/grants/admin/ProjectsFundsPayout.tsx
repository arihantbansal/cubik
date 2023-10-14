import {
  Avatar,
  Box,
  Center,
  Checkbox,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Contribution,
  ProjectJoinRound,
  ProjectsModel,
  UserModel,
} from "@cubik/database";
import React, { ReactElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type TFormValues = Record<string, boolean>;

const defaultValues = {};

const ProjectsFundsPayout = ({
  isLoading,
  contributions,
  matchingPoolAmount,
  ProjectJoinRound,
}: {
  isLoading?: boolean;
  contributions:
    | (Contribution & {
        user: UserModel;
      })[]
    | undefined;
  matchingPoolAmount?: number;
  ProjectJoinRound: (ProjectJoinRound & {
    project: ProjectsModel & {
      owner: UserModel;
    };
  })[];
}) => {
  const [isAllChecked, setAllChecked] = useState(false);
  const { handleSubmit, control, setValue, getValues } = useForm<TFormValues>({
    defaultValues,
  });

  const handleCheckAll = (isChecked: boolean) => {
    ProjectJoinRound.forEach((project) => {
      setValue(String(project.id), isChecked);
    });
    setAllChecked(isChecked);
  };

  const handleSingleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(id, e.target.checked);
      const formValues = getValues();
      const isEveryChecked = ProjectJoinRound.every(
        (project) => formValues[String(project.id)]
      );
      setAllChecked(isEveryChecked);
    };

  const onSubmit = handleSubmit((data) => {
    // console.log('submit data', data);
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Table
        w="full"
        minW={{ base: "28rem", md: "34rem" }}
        overflowX="scroll"
        variant="unstyled"
        mt="16px"
      >
        <Thead
          w="full"
          h="1rem"
          color="neutral.8"
          fontFamily={"Plus Jakarta Sans, sans-serif"}
        >
          <Tr>
            <Th w={"5%"} p={{ base: "10px", md: "4px 16px" }}>
              <Center>
                <Checkbox
                  colorScheme="teal"
                  isChecked={isAllChecked}
                  onChange={(e) => handleCheckAll(e.target.checked)}
                />
              </Center>
            </Th>
            <Th w={"25%"} p={{ base: "10px", md: "4px 16px" }}>
              Project
            </Th>
            <Th w={"40%"} p={{ base: "10px", md: "4px 16px" }}>
              Public Address
            </Th>
            <Th w={"15%"} p={{ base: "10px", md: "4px 16px" }}>
              Contributors
            </Th>
            <Th w={"15%"} p={{ base: "10px", md: "4px 16px" }}>
              Matching
            </Th>
          </Tr>
        </Thead>
        {isLoading ? null : ( // <TableLoading />
          <Tbody>
            {ProjectJoinRound.sort(
              (a, b) =>
                (b.amountRaise || 0) / (matchingPoolAmount || 1) -
                (a.amountRaise || 0) / (matchingPoolAmount || 1)
            ).map((projectJoinRound): ReactElement => {
              return (
                <Tr key={projectJoinRound?.id}>
                  <Td h="100%">
                    <Center>
                      <Controller
                        control={control}
                        name={String(projectJoinRound.id)}
                        defaultValue={false}
                        render={({ field: { value, ref } }) => (
                          <Checkbox
                            colorScheme="teal"
                            onChange={handleSingleCheck(
                              String(projectJoinRound.id)
                            )}
                            ref={ref}
                            isChecked={value}
                          />
                        )}
                      />
                    </Center>
                  </Td>
                  <Td px="12px">
                    <HStack spacing="12px">
                      <Avatar
                        width="40px"
                        height="40px"
                        src={projectJoinRound.project.logo}
                      />
                      <Box as="p" textStyle={"title4"} color="neutral.11">
                        {projectJoinRound.project.name}
                      </Box>
                    </HStack>
                  </Td>
                  <Td px="12px">
                    <Box textStyle={"body4"} color="neutral.8">
                      {projectJoinRound.project.mutliSigAddress}
                    </Box>
                  </Td>
                  <Td px="12px">
                    {contributions
                      ? new Set(
                          contributions
                            .filter(
                              (c) => c.projectId === projectJoinRound.project.id
                            )
                            .map((c) => c.user.id)
                        ).size
                      : 0}
                  </Td>
                  <Td px="12px">
                    {projectJoinRound?.amountRaise &&
                    matchingPoolAmount &&
                    matchingPoolAmount !== 0
                      ? (
                          (projectJoinRound.amountRaise / matchingPoolAmount) *
                          100
                        ).toFixed(1) + "%"
                      : "0%"}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>
      {/*       
      <Center p="16px" width="full">
        <Button ml="auto" variant="cubikFilled" type="submit">
          Payout Funds
        </Button>
      </Center> */}
    </form>
  );
};

export default ProjectsFundsPayout;
