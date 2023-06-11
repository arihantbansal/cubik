import {
  Table,
  Button,
  Thead,
  Tr,
  Th,
  Tbody,
  Checkbox,
  Td,
  Avatar,
  Box,
  HStack,
  Center,
} from '@chakra-ui/react';
import {
  Contribution,
  ProjectJoinRound,
  ProjectsModel,
  UserModel,
} from '@prisma/client';
import React, { ReactElement, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

type TFormValues = Record<string, boolean>;

const defaultValues = {};

const ProjectsFundsPayout = ({
  isLoading,
  ProjectJoinRound,
}: {
  isLoading?: boolean;
  ProjectJoinRound: (ProjectJoinRound & {
    project: ProjectsModel & {
      owner: UserModel;
    };
  })[];
}) => {
  const checkBoxArray = [
    'value one',
    'value two',
    'value three',
    'value four',
    'value five',
    'value six',
    'value seven',
  ];

  const [isAllChecked, setAllChecked] = useState(false);

  const { handleSubmit, control, reset, setValue, getValues } =
    useForm<TFormValues>({
      defaultValues,
    });

  const handleCheckAll = (isChecked: boolean) => {
    checkBoxArray.forEach((name) => {
      setValue(name, isChecked);
    });
    setAllChecked(isChecked);
  };

  const onSubmit = handleSubmit((data) => {
    console.log('submit data', data);
  });

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Table
        w="full"
        minW={{ base: '28rem', md: '34rem' }}
        overflowX="scroll"
        variant="unstyled"
        mt="16px"
      >
        <Thead
          w="full"
          h="1rem"
          color="neutral.8"
          fontFamily={'Plus Jakarta Sans, sans-serif'}
        >
          <Tr>
            <Th w={'5%'} p={{ base: '10px', md: '4px 16px' }}>
              <Center>
                <Checkbox
                  colorScheme="teal"
                  isChecked={isAllChecked}
                  onChange={(e) => handleCheckAll(e.target.checked)}
                />
              </Center>
            </Th>
            <Th w={'25%'} p={{ base: '10px', md: '4px 16px' }}>
              Project
            </Th>
            <Th w={'40%'} p={{ base: '10px', md: '4px 16px' }}>
              Public Address
            </Th>
            <Th w={'15%'} p={{ base: '10px', md: '4px 16px' }}>
              Contributors
            </Th>
            <Th w={'15%'} p={{ base: '10px', md: '4px 16px' }}>
              Matching
            </Th>
          </Tr>
        </Thead>
        {isLoading ? null : ( // <TableLoading />
          <Tbody>
            {ProjectJoinRound.map((projectjoinround): ReactElement => {
              return (
                <Tr key={projectjoinround?.id}>
                  <Td h="100%">
                    <Center>
                      <Controller
                        control={control}
                        name={projectjoinround.project.name}
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            colorScheme="teal"
                            onChange={(e) => {
                              onChange(e.target.checked);
                              setAllChecked(
                                checkBoxArray.every((name) => getValues()[name])
                              );
                            }}
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
                        src="https://pbs.twimg.com/profile_images/1628722617334267905/s7UFpQtX_400x400.jpg"
                      />
                      <Box as="p" textStyle={'title4'} color="neutral.11">
                        {projectjoinround.project.name}
                      </Box>
                    </HStack>
                  </Td>
                  <Td px="12px">
                    <Box textStyle={'body4'} color="neutral.8">
                      {projectjoinround.project.mutliSigAddress}
                    </Box>
                  </Td>
                  <Td px="12px">2</Td>
                  <Td px="12px">40%</Td>
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
