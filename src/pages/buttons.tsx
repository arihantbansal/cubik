import {
  Button,
  Center,
  Container,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

const buttons = () => {
  return (
    <Container maxW="7xl">
      <Center py="8rem">
        <TableContainer>
          <Table w="full" border="1px solid red" variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Filled</Th>
                <Th>Danger</Th>
                <Th>Warning</Th>
                <Th>Outlined</Th>
                <Th>Text</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Mini</Td>
                <Td>
                  <VStack align={'start'} h="full">
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikFilled'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <VStack align={'start'} h="full">
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikDanger'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <VStack align={'start'} h="full">
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikWarning'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <VStack align={'start'} h="full">
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikOutlined'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                  </VStack>
                </Td>
                <Td>
                  <VStack align={'start'} h="full">
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                    <HStack align={'start'} h="full">
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        loadingText={'Confirming'}
                        iconSpacing="2px"
                        rightIcon={<BsPlus size={16} />}
                        leftIcon={<BsPlus size={16} />}
                      >
                        Click me
                      </Button>
                      <Button
                        size="cubikMini"
                        variant={'cubikText'}
                        isLoading
                        loadingText={'Confirming'}
                      >
                        Click me
                      </Button>
                    </HStack>
                  </VStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Small</Td>
                <Td h="full">
                  <HStack align={'start'} h="full">
                    <Button
                      size="cubikSmall"
                      variant={'cubikFilled'}
                      loadingText={'Confirming'}
                    >
                      Click me
                    </Button>
                    <Button
                      size="cubikSmall"
                      variant={'cubikFilled'}
                      isLoading
                      loadingText={'Confirming'}
                    >
                      Click me
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  <HStack align={'start'} h="full">
                    <Button
                      size="cubikSmall"
                      variant={'cubikOutlined'}
                      loadingText={'Confirming'}
                    >
                      Click me
                    </Button>
                    <Button
                      size="cubikSmall"
                      variant={'cubikOutlined'}
                      isLoading
                      loadingText={'Confirming'}
                    >
                      Click me
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  <Button
                    size="cubikSmall"
                    variant={'cubikText'}
                    isLoading
                    loadingText={'Confirming'}
                  >
                    Click me
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>Medium</Td>
                <Td>
                  <Button
                    size="cubikMedium"
                    variant={'cubikFilled'}
                    isLoading
                    loadingText={'Confirming'}
                  >
                    Click me
                  </Button>
                </Td>
                <Td>
                  <Button size="cubikMedium" variant={'cubikOutlined'}>
                    Click me
                  </Button>
                </Td>
                <Td>
                  <Button size="cubikMedium" variant={'cubikText'}>
                    Click me
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td> Large</Td>
                <Td>
                  <Button
                    size="cubikLarge"
                    variant={'cubikFilled'}
                    isLoading
                    loadingText={'Confirming'}
                  >
                    Click me
                  </Button>
                </Td>
                <Td>
                  <Button size="cubikLarge" variant={'cubikOutlined'}>
                    Click me
                  </Button>
                </Td>
                <Td>
                  <Button size="cubikLarge" variant={'cubikText'}>
                    Click me
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Container>
  );
};

export default buttons;
