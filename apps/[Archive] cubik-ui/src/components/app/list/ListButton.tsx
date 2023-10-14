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
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ProjectsModel } from "@cubik/database";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { TiFlash } from "react-icons/ti";
import { ActionMeta } from "react-select";
import EmptyStateHOC from "~/components/HOC/EmptyState";
import { ListDonationFormType } from "~/interfaces/donationForm";
import { tokenGroup } from "~/interfaces/token";
import useListStore from "~/store/listStore";
import { ControlledSelect } from "../../common/select/ControlledSelect";
import { tokens } from "../../common/tokens/DonationTokens";

export const token: tokenGroup[] = tokens;

interface ProjectListCardProps {
  project: ProjectsModel;
  register: UseFormRegister<ListDonationFormType>;
  setValue: UseFormSetValue<ListDonationFormType>;
  onAmountChange: (id: string, value: number) => void;
  donationData: { [id: string]: number }; // Change the key type to string
}

const ProjectListCard: React.FC<ProjectListCardProps> = memo(
  ({ project, register, setValue, onAmountChange, donationData }) => {
    const removeProject = useListStore((state) => state.removeProject);
    return (
      <Box w="full" p="0" key={project.id}>
        <HStack justify={"space-between"} w="full">
          <HStack justifyItems={"start"} align="center" w="full">
            <Avatar
              src={project.logo}
              backgroundColor={"neutral.7"}
              name="anchor"
              borderRadius={"8px"}
              size="sm"
            />
            <Box>{project.name}</Box>
          </HStack>
          <Stack direction={"row"} alignItems={"end"} alignSelf={"end"}>
            <NumberInput
              id={`number-input-${project.id}`}
              variant="cubik"
              size="sm"
              w="10rem"
              maxW={20}
              value={donationData[project.id] || 15}
              min={1}
              onChange={(valueString) => {
                const amountValue = parseInt(valueString, 10);
                if (!isNaN(amountValue)) {
                  setValue(`amount.${project.id}` as any, amountValue);
                  onAmountChange(project.id, amountValue);
                }
              }}
            >
              <NumberInputField
                {...register(`amount.${project.id}` as any, { required: true })}
                onFocus={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById(`number-input-${project.id}`)
                    ?.focus();
                }}
                onBlur={(e) => {
                  e.stopPropagation();
                  document.getElementById(`number-input-${project.id}`)?.blur();
                }}
              />

              <NumberInputStepper>
                <NumberIncrementStepper fontSize={"12px"} width={"22"} />
                <NumberDecrementStepper fontSize={"12px"} width={"22"} />
              </NumberInputStepper>
            </NumberInput>
            <IconButton
              display={"flex"}
              alignContent={"center"}
              variant={"unstyled"}
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
      </Box>
    );
  }
);

ProjectListCard.displayName = "ProjectListCard";

const IconButtonBadge = () => {
  const count = useListStore((state) => state.count());
  const projectList = useListStore((state) => state.projectList);
  const [listItemsCount, setListItemsCount] = useState(count);
  const [totalDonation, setTotalDonation] = useState(0);
  const [message, setMessage] = useState("");

  const [inputAmountValue, setInputAmountValue] = useState<
    number | undefined
  >();
  const [selectedToken, setSelectedToken] = useState<string | undefined>();
  const [donationData, setDonationData] = useState<{ [id: string]: number }>(
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

  const handleDonationChange = useCallback(
    (id: string, value: number) => {
      setDonationData((prevData) => ({ ...prevData, [id]: value }));
      const donationAmount = (): number => {
        const newTotal = Object.values({
          ...donationData,
          [id]: value,
        }).reduce((acc: number, cur: unknown) => acc + (cur as number), 0);
        return newTotal;
      };
      setTotalDonation(donationAmount());
    },
    [donationData]
  );

  const applyAmountToAll = useCallback(() => {
    if (inputAmountValue !== undefined && selectedToken !== undefined) {
      let newDonationData: { [id: string]: number } = {};
      let newTotalDonation = 0;

      projectList.forEach((project) => {
        setValue(`amount.${project.id}` as any, inputAmountValue);
        newDonationData[project.id] = inputAmountValue;
        newTotalDonation += inputAmountValue;
      });

      setDonationData(newDonationData);
      setTotalDonation(newTotalDonation);
      setMessage(""); // Clear the message
    } else {
      setMessage(
        "Please enter an amount and select a token before applying to all projects."
      );
    }
  }, [inputAmountValue, selectedToken, setValue, projectList]);

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

    // todo: add transaction here for multiple projects
  };

  return (
    <>
      <Menu closeOnSelect={false} closeOnBlur={true}>
        <HStack gap={{ base: "2px", md: "16px" }}>
          <MenuButton
            color={"#A8F0E6"}
            border="1px solid"
            borderColor={{ base: "transparent", md: "#A8F0E6" }}
            rounded="8px"
            borderRadius="8px"
            background={"transparent"}
            aria-label="list"
            p={{ base: "6px", md: "6px" }}
            fontSize={{ base: "18px", md: "22px" }}
          >
            <TiFlash />
          </MenuButton>
          {listItemsCount > 0 && (
            <Badge
              position={"absolute"}
              transform={{
                base: "translate(14px, -8px)",
                md: "translate(18px, -18px)",
              }}
              rounded="full"
              backgroundColor={"#FFE53D"}
              minW={{ base: "1rem", md: "1.2rem" }}
              minH={{ base: "1rem", md: "1.2rem" }}
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              colorScheme="green"
            >
              <Text fontSize={{ base: "8px", md: "10px" }}>
                {listItemsCount}
              </Text>
            </Badge>
          )}
        </HStack>
        <MenuList
          outline={"none"}
          border="none"
          height="80vh"
          maxH={"70rem"}
          w="380px"
          gap="24px"
          display={"flex"}
          flexDir="column"
          alignItems={"start"}
          padding="24px"
          backgroundImage="linear-gradient(322.35deg, #000000 0%, #0F0F0F 100%)"
        >
          <VStack align={"start"}>
            <Box as="p" textStyle="title2" color="neutral.11">
              Review and Donate
            </Box>
            <Box as="p" textStyle="body4" color="neutral.8">
              Please review your donations thoroughly before proceeding to pay.
            </Box>
          </VStack>
          <Box w="full" h="1px" background={"#272929"} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "24px",
              height: "100%",
            }}
          >
            <Box p="0">
              {projectList.length > 0 && (
                <VStack w="full" gap="12px">
                  <HStack justify={"space-between"} w="full" gap="12px">
                    <Input
                      placeholder="Enter Amount"
                      type="number"
                      onChange={(e) => {
                        setInputAmountValue(parseInt(e.target.value));
                      }}
                    />

                    <ControlledSelect
                      // @ts-ignore
                      control={control}
                      name="token"
                      id="token"
                      options={token}
                      label={"Token"}
                      onChange={(
                        newValue: unknown,
                        actionMeta: ActionMeta<unknown>
                      ) => {
                        setSelectedToken(newValue as string); // Handle the change event here
                      }}
                    />
                  </HStack>
                  <Button
                    variant={"connect_wallet"}
                    w="full"
                    onClick={applyAmountToAll}
                  >
                    Apply to all
                  </Button>
                  {message && (
                    <Text color="red.500" fontSize="sm">
                      {message}
                    </Text>
                  )}
                </VStack>
              )}
            </Box>
            <Box w="full" h="1px" background={"#272929"} />
            <VStack w="full" alignItems={"start"} h="100%" gap="24px">
              {projectList.length < 1 ? (
                <Center w="full" minH="18vh" rounded="12px">
                  <EmptyStateHOC
                    heading={"List is Empty"}
                    subHeading={
                      "Looks like you have not added any projects to your list"
                    }
                  />
                </Center>
              ) : (
                projectList.map((project) => (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    register={register}
                    setValue={setValue}
                    onAmountChange={handleDonationChange}
                    donationData={donationData} // Pass the donationData state here
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
              backgroundColor={"transparent"}
            >
              <VStack justify={"bottom"} w="full">
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="cubikFilled"
                  loadingText="Confirming"
                  isLoading={isSubmitting}
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

const MemoizedIconButtonBadge = memo(IconButtonBadge);

export default MemoizedIconButtonBadge;
