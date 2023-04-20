import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ProjectsModel } from '@prisma/client';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { TiFlash } from 'react-icons/ti';
import { ListDonationFormType } from '~/interfaces/donationForm';
import { tokenGroup } from '~/interfaces/token';
import useListStore from '~/store/listStore';
import PaymentModal from '../common/payment-modal/PaymentModal';
import { ControlledSelect } from '../common/select/ControlledSelect';
import { tokens } from '../common/tokens/DonationTokens';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { ActionMeta } from 'react-select';

export const token: tokenGroup[] = tokens;

interface ProjectListCardProps {
  project: ProjectsModel;
  register: UseFormRegister<ListDonationFormType>;
  setValue: UseFormSetValue<ListDonationFormType>;
  onAmountChange: (id: string, value: number) => void;
}

const ProjectListCard: React.FC<ProjectListCardProps> = memo(
  ({ project, register, setValue, onAmountChange }) => {
    const removeProject = useListStore((state) => state.removeProject);
    return (
      <MenuItem
        p="0"
        key={project.id}
        textStyle="body3"
        color="neutral.11"
        backgroundColor={'transparent'}
        _hover={{ background: 'transparent' }}
        _focus={{ background: 'transparent' }}
        _active={{ background: 'transparent' }}
      >
        <HStack justify={'space-between'} w="full">
          <HStack justifyItems={'start'} align="center" w="full">
            <Avatar
              src={project.logo}
              name="anchor"
              borderRadius={'8px'}
              size="sm"
            />
            <Box>{project.name}</Box>
          </HStack>
          <Stack direction={'row'} alignItems={'end'} alignSelf={'end'}>
            <NumberInput
              variant="cubik"
              size="sm"
              w="10rem"
              maxW={20}
              defaultValue={15}
              min={1}
              onChange={(value) => {
                const amountValue = parseInt(value);
                setValue(`amount.${project.id}` as any, amountValue);
                onAmountChange(project.id, amountValue);
              }}
            >
              <NumberInputField
                {...register(`amount.${project.id}` as any, { required: true })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper fontSize={'12px'} width={'22'} />
                <NumberDecrementStepper fontSize={'12px'} width={'22'} />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              display={'flex'}
              alignContent={'center'}
              variant={'unstyled'}
              p="0"
              w="2rem"
              h="2rem"
              icon={<AiOutlineDelete size={22} />}
              aria-label="Delete item"
              onClick={() => {
                removeProject(project.id);
              }}
            />
          </Stack>
        </HStack>
      </MenuItem>
    );
  }
);

ProjectListCard.displayName = 'ProjectListCard';

const IconButtonBadge = () => {
  console.log('list componenet is rerendered');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const count = useListStore((state) => state.count());
  const projectList = useListStore((state) => state.projectList);
  const [listItemsCount, setListItemsCount] = useState(count);
  const [totalDonation, setTotalDonation] = useState(0);
  const [inputAmount, setInputAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string | undefined>();
  const [donationData, setDonationData] = useState<{ [id: number]: number }>(
    {}
  );

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ListDonationFormType>({});

  useEffect(() => {
    setListItemsCount(count);
  }, [count]);

  useEffect(() => {
    projectList.forEach((project) => {
      handleDonationChange(project.id, 15); // Set the default amount to 15
    });
  }, [projectList]);

  const handleDonationChange = useCallback((id: string, value: number) => {
    setDonationData((prevData) => ({ ...prevData, [id]: value }));
    const donationAmount = (): number => {
      const newTotal = Object.values({
        ...donationData,
        [id]: value,
      }).reduce((acc: number, cur: unknown) => acc + (cur as number), 0);
      return newTotal;
    };
    setTotalDonation(donationAmount());
  }, []);

  const applyAmountToAll = useCallback(() => {
    if (inputAmount !== undefined && selectedToken !== undefined) {
      projectList.forEach((project) => {
        setValue(`amount.${project.id}` as any, inputAmount);
        handleDonationChange(project.id, inputAmount);
      });
    }
  }, [inputAmount, selectedToken, setValue, handleDonationChange]);

  const onSubmit = (data: ListDonationFormType) => {
    const amounts = Object.entries(data.amount || {}).map(
      ([projectId, amount]) => ({
        projectId,
        amount,
      })
    );

    const submittedData = {
      ...data,
      projects: projectList.map((project) => ({
        ...project,
        amount: amounts.find((item) => item.projectId === project.id)?.amount,
      })),
    };

    console.log('Form submitted:', submittedData);
    onOpen();
  };

  return (
    <>
      <PaymentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Menu closeOnSelect={false} closeOnBlur={false}>
        <HStack gap={{ base: '2px', md: '16px' }}>
          <MenuButton
            color={'#A8F0E6'}
            border="1px solid"
            borderColor={{ base: 'transparent', md: '#A8F0E6' }}
            rounded="8px"
            borderRadius="8px"
            background={'transparent'}
            aria-label="list"
            p={{ base: '6px', md: '6px' }}
            fontSize={{ base: '18px', md: '22px' }}
          >
            <TiFlash />
          </MenuButton>
          {listItemsCount > 0 && (
            <Badge
              position={'absolute'}
              transform={'translate(22px, -16px)'}
              rounded="full"
              backgroundColor={'#FFE53D'}
              minW="1rem"
              minH="1rem"
              display={'flex'}
              alignItems="center"
              justifyContent={'center'}
              colorScheme="green"
            >
              <Text>{listItemsCount}</Text>
            </Badge>
          )}
        </HStack>{' '}
        <MenuList
          height="80vh"
          maxH={'70rem'}
          w="420px"
          gap="24px"
          display={'flex'}
          flexDir="column"
          alignItems={'start'}
          padding="24px"
          backgroundColor="linear-gradient(322.35deg, #000000 0%, #0F0F0F 100%)"
        >
          <VStack align={'start'}>
            <Box as="p" textStyle="title2" color="neutral.11">
              Review and Donate
            </Box>
            <Box as="p" textStyle="body4" color="neutral.8">
              Please review your donations thoroughly before proceeding to pay.
            </Box>
          </VStack>
          <Box w="full" h="1px" background={'#272929'} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              gap: '24px',
              height: '100%',
            }}
          >
            <MenuItem
              p="0"
              textStyle="body3"
              color="neutral.11"
              backgroundColor={'transparent'}
              _hover={{ background: 'transparent' }}
              _focus={{ background: 'transparent' }}
              _active={{ background: 'transparent' }}
            >
              {projectList.length > 0 && (
                <VStack w="full" gap="12px">
                  <HStack justify={'space-between'} w="full" gap="12px">
                    <Input
                      placeholder="Enter Amount"
                      type="number"
                      onChange={(e) => {
                        console.log('onchange input called - ', e.target.value);
                        setInputAmount(parseInt(e.target.value));
                      }}
                    />
                    <ControlledSelect
                      // @ts-ignore
                      control={control}
                      name="token"
                      id="token"
                      options={token}
                      label={'Token'}
                      onChange={(
                        newValue: unknown,
                        actionMeta: ActionMeta<unknown>
                      ) => {
                        setSelectedToken(newValue as string); // Handle the change event here
                      }}
                    />
                  </HStack>
                  <Button
                    variant={'connect_wallet'}
                    w="full"
                    onClick={applyAmountToAll}
                  >
                    Apply to all
                  </Button>
                </VStack>
              )}
            </MenuItem>
            <Box w="full" h="1px" background={'#272929'} />
            <VStack w="full" alignItems={'start'} h="100%" gap="24px">
              {projectList.length < 1 ? (
                <Center p="60px 4vh" w="full" minH="18vh" rounded="12px">
                  <VStack gap="16px">
                    <VStack>
                      <Box>
                        <Player
                          autoplay
                          loop
                          speed={1}
                          src={
                            'https://lottie.host/be917fc4-0f7a-44f9-bcaa-e5e7c510a0ae/Kqn7bSMJkY.json'
                          }
                          style={{ height: '150px', width: '200px' }}
                        />
                      </Box>
                      <Box
                        color="white"
                        as="p"
                        textStyle={{ base: 'title3', md: 'title1' }}
                      >
                        List is Empty
                      </Box>
                      <Box
                        maxW="22rem"
                        textAlign={'center'}
                        as="p"
                        color="neutral.8"
                        textStyle={{ base: 'body5', md: 'body4' }}
                      >
                        Looks like you have not added any projects to your
                        contribution list.
                      </Box>
                    </VStack>
                  </VStack>
                </Center>
              ) : (
                projectList.map((project) => (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    register={register}
                    setValue={setValue}
                    onAmountChange={handleDonationChange} // Pass the function here
                  />
                ))
              )}
            </VStack>
            <Box as="p" textStyle="body3" color="neutral.11" mt="auto">
              Total Donation: {totalDonation}
            </Box>
            <Box
              w="full"
              mt="auto"
              textStyle="body3"
              color="neutral.11"
              backgroundColor={'transparent'}
            >
              <VStack justify={'bottom'} w="full">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="connect_wallet"
                  w="full"
                  type="submit"
                >
                  Donate
                </Button>
              </VStack>
            </Box>
          </form>
        </MenuList>
      </Menu>
    </>
  );
};

export default IconButtonBadge;
