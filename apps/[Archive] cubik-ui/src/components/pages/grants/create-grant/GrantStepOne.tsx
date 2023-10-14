import {
  Box,
  CardBody,
  Select as ChakraSelect,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { GroupBase, OptionsOrGroups, Select } from "chakra-react-select";
import { addDays } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import DatePickerInput from "~/components/common/inputs/DatePickerInput";
import useTeamSearch from "~/hooks/useTeamSearch";
import { NewGrantsApplicationFormData } from "~/pages/grants/new-grant";

registerLocale("en-gb", enGB);

type GrantsStepOneProps = {
  control: Control<NewGrantsApplicationFormData>;
  errors: FieldErrors<NewGrantsApplicationFormData>;
  register: UseFormRegister<NewGrantsApplicationFormData>;
  setValue: UseFormSetValue<NewGrantsApplicationFormData>;
  getValues: UseFormGetValues<NewGrantsApplicationFormData>;
};

const GrantStepOne = ({
  control,
  errors,
  register,
  setValue,
  getValues,
}: GrantsStepOneProps) => {
  const tomorrow = addDays(new Date(), 1);
  const [currentTeammateName, setCurrentTeammateName] = useState<
    string | undefined
  >(undefined);
  const {
    data: teamSearch,
    isLoading: teamSearchLoading,
    error: teamSearchError,
  } = useTeamSearch(currentTeammateName);
  const teamWithNames =
    teamSearch?.map((item) => {
      return {
        id: item.id,
        username: item.username,
      };
    }) || [];
  return (
    <CardBody minH="70vh" gap={{ base: "24px", md: "40px" }}>
      <VStack alignItems={"start"}>
        <Box
          as="h1"
          color="neutral.11"
          textStyle={{ base: "title2", md: "title1" }}
        >
          Create a Grants Round
        </Box>
        <Box
          as="p"
          textStyle={{ base: "body5", md: "body4" }}
          color="neutral.9"
          textAlign="start"
        >
          Help projects in the community sustain by providing them grants
          through quadratic funding and community voting
        </Box>
      </VStack>
      <Stack
        w="full"
        gap={{ base: "24px", md: "32px" }}
        direction={{ base: "column", md: "row" }}
      >
        <FormControl isRequired w="full" isInvalid={Boolean(errors.name)}>
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="name"
          >
            Round Name
          </FormLabel>
          <Input
            id="name"
            placeholder="Alpha Grants Round"
            fontSize={{ base: "12px", md: "14px" }}
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("name", {
              required: true,
              maxLength: { value: 36, message: "Max length is 36" },
            })}
          />
          {errors.name && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.name.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <Controller
          control={control}
          name="team"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FormControl isInvalid={!!error} id="team">
              <FormLabel
                fontSize={{ base: "12px", md: "14px" }}
                pb="0.5rem"
                htmlFor="team"
              >
                Search Team
              </FormLabel>
              <Select
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value as any}
                options={
                  teamWithNames as unknown as OptionsOrGroups<
                    string,
                    GroupBase<string>
                  >
                }
                menuIsOpen={
                  !!currentTeammateName && currentTeammateName.length > 0
                }
                placeholder="Search Username"
                closeMenuOnSelect={true}
                selectedOptionStyle="check"
                variant="unstyled"
                focusBorderColor="transparent"
                onInputChange={(inputValue) => {
                  setCurrentTeammateName(inputValue);
                }}
                chakraStyles={{
                  container: (provided, state) => ({
                    ...provided,
                    border: "none",
                    background: "surface.input_field",
                    outline: "0px !important",
                    borderRadius: "8px",
                    height: "40px",
                    boxShadow: "0",
                    ps: "0rem",
                    w: "full",
                    ":focus": {
                      outline: "none",
                      boxShadow: "0",
                      border: "none",
                    },
                    ":hover": {
                      outline: "none",
                      boxShadow: "0 !important",
                      border: "none !important",
                    },
                    ":active": {
                      outline: "none",
                      boxShadow: "0",
                      border: "none",
                    },
                    ":selected": {
                      outline: "none",
                      boxShadow: "0",
                      border: "none",
                    },
                  }),
                  inputContainer: (provided, state) => ({
                    ...provided,
                    ps: "8px",
                    fontSize: { base: "12px", md: "14px" },
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    ps: "8px",
                    border: "none",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  clearIndicator: (provided, state) => ({
                    ...provided,
                    display: "none",
                  }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    background: "",
                    borderColor: "transparent !important",
                    outline: "0px !important",
                    boxShadow: "0",
                    p: 0,
                    w: "60px",
                  }),
                  indicatorSeparator: (provided, state) => ({
                    ...provided,
                    display: "none",
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    //border: 'none',
                    transform: "translateY(-10px)",
                    backgroundColor: "#0F0F0F",
                  }),
                  menuList: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#0F0F0F",
                    border: "1px solid #141414",
                    fontSize: { base: "12px", md: "14px" },
                    borderTop: "none",
                    borderTopRadius: "none",
                    boxShadow: "none",
                    padding: "0px",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: "neutral.11",
                    fontSize: { base: "12px", md: "14px" },
                    fontWeight: "400",
                    backgroundColor: state.isSelected
                      ? "#010F0D"
                      : state.isFocused
                      ? "#010F0D"
                      : "#0F0F0F",
                    _hover: {
                      backgroundColor: "#010F0D",
                    },
                    ":active": {
                      backgroundColor: "#0F0F0F",
                    },
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    border: "none",
                    backgroundColor: "#0F0F0F",
                    boxShadow: "none",
                    outline: "none",
                    ":hover": {
                      border: "none",
                      backgroundColor: "#0F0F0F",
                    },
                  }),
                  placeholder: (provided, state) => ({
                    ...provided,
                    textAlign: "start",
                    px: "1rem",
                    fontSize: { base: "12px", md: "14px" },
                    color: "#3B3D3D",
                  }),
                }}
              />
              <FormErrorMessage pt="1rem">
                {error && error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
      </Stack>
      <Stack
        align={"top"}
        w="full"
        gap={{ base: "24px", md: "32px" }}
        direction={{ base: "column", md: "row" }}
      >
        <FormControl isRequired w="full" isInvalid={Boolean(errors.pool)}>
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="pool"
          >
            Matching Pool Amount in USDC
          </FormLabel>
          <Input
            id="pool"
            placeholder="$ 0.00"
            type="number"
            fontSize={{ base: "12px", md: "14px" }}
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("pool", {
              required: true,
            })}
          />
          {errors.pool ? (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.pool.message}</>
            </FormErrorMessage>
          ) : (
            <FormHelperText
              fontSize={{ base: "12px", md: "14px" }}
              color="neutral.6"
            >
              Matching funds can be added anytime to the Grant Rounds multisig
              later.
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isRequired w="full" isInvalid={Boolean(errors.projects)}>
          <FormLabel
            fontSize={{ base: "12px", md: "14px" }}
            pb="0.5rem"
            htmlFor="projects"
          >
            Number of Projects
          </FormLabel>
          <Input
            id="projects"
            placeholder="30"
            type="number"
            fontSize={{ base: "12px", md: "14px" }}
            _placeholder={{
              fontSize: { base: "12px", md: "14px" },
              color: "#3B3D3D",
            }}
            {...register("projects", {
              required: true,
            })}
          />
          {errors.projects ? (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.projects.message}</>
            </FormErrorMessage>
          ) : (
            <FormHelperText
              fontSize={{ base: "12px", md: "14px" }}
              color="neutral.6"
            >
              The number of estimated projects you are expecting to participate
              in the grant round.
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      <HStack align={"top"} w="full" gap={{ base: "24px", md: "32px" }}>
        <FormControl
          variant="withAddOn"
          isRequired
          w="full"
          isInvalid={Boolean(errors.registrationStartDate)}
        >
          <FormLabel fontSize={{ base: "12px", md: "14px" }} pb="0.5rem">
            Application Period Start Date
          </FormLabel>
          <DatePicker
            selected={getValues("registrationStartDate")}
            onChange={(date: Date) => {
              setValue("registrationStartDate", date);
            }}
            customInput={
              <DatePickerInput
                value={tomorrow}
                updatedValue={getValues("registrationStartDate")}
              />
            }
            locale="en-gb"
            minDate={tomorrow}
          />
          {errors.registrationStartDate && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.registrationStartDate.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          variant="withAddOn"
          isRequired
          w="full"
          isInvalid={Boolean(errors.registrationEndDate)}
        >
          <FormLabel fontSize={{ base: "12px", md: "14px" }} pb="0.5rem">
            Application Period End Date
          </FormLabel>
          <DatePicker
            selected={getValues("registrationEndDate")}
            onChange={(date: Date) => setValue("registrationEndDate", date)}
            customInput={
              <DatePickerInput
                value={tomorrow}
                updatedValue={getValues("registrationEndDate")}
              />
            }
            locale="en-gb"
            minDate={tomorrow}
          />
          {errors.registrationEndDate && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.registrationEndDate.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <HStack align={"top"} w="full" gap={{ base: "24px", md: "32px" }}>
        <FormControl
          variant="withAddOn"
          isRequired
          w="full"
          isInvalid={Boolean(errors.startDate)}
        >
          <FormLabel fontSize={{ base: "12px", md: "14px" }} pb="0.5rem">
            Round Start Date
          </FormLabel>
          <DatePicker
            selected={getValues("startDate")}
            onChange={(date: Date) => setValue("startDate", date)}
            customInput={
              <DatePickerInput
                value={tomorrow}
                updatedValue={getValues("startDate")}
              />
            }
            locale="en-gb"
            minDate={tomorrow}
          />
          {errors.startDate && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.startDate.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          variant="withAddOn"
          isRequired
          w="full"
          isInvalid={Boolean(errors.endDate)}
        >
          <FormLabel fontSize={{ base: "12px", md: "14px" }} pb="0.5rem">
            Round End Date
          </FormLabel>
          <DatePicker
            selected={getValues("endDate")}
            onChange={(date: Date) => setValue("endDate", date)}
            customInput={
              <DatePickerInput
                value={tomorrow}
                updatedValue={getValues("endDate")}
              />
            }
            locale="en-gb"
            minDate={tomorrow} // restrict past and today's date selection
          />
          {errors.endDate && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              <>{errors.endDate.message}</>
            </FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <FormControl isRequired isInvalid={Boolean(errors.short_description)}>
        <FormLabel
          fontSize={{ base: "12px", md: "14px" }}
          pb="0.5rem"
          htmlFor="short_description"
        >
          Tagline
        </FormLabel>
        <Textarea
          height={"100px"}
          resize="none"
          id="short_description"
          placeholder="A one sentence description of the Round"
          fontSize={{ base: "12px", md: "14px" }}
          _placeholder={{
            fontSize: { base: "12px", md: "14px" },
            color: "#3B3D3D",
          }}
          {...register("short_description", {
            required: true,
          })}
        />
        {errors.short_description && (
          <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
            <>{errors.short_description.message}</>
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl w="full" isInvalid={Boolean(errors.colorScheme)}>
        <FormLabel
          fontSize={{ base: "12px", md: "14px" }}
          pb="0.5rem"
          htmlFor="colorScheme"
        >
          Color Scheme
        </FormLabel>
        <ChakraSelect
          borderColor="#141414"
          defaultValue={1}
          id="colorScheme"
          placeholder="Select color scheme"
          fontSize={{ base: "12px", md: "14px" }}
          _placeholder={{
            fontSize: { base: "10px", md: "12px" },
            color: "#3B3D3D",
          }}
          {...register("colorScheme")}
        >
          <option value="teal">Teal</option>
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </ChakraSelect>
        {errors.colorScheme && (
          <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
            <>{errors.colorScheme.message}</>
          </FormErrorMessage>
        )}
      </FormControl>
    </CardBody>
  );
};

export default GrantStepOne;
