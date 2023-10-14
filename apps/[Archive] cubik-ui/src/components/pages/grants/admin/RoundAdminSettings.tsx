import {
  Box,
  Button,
  Card,
  HStack,
  Select,
  Center,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Switch,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { formatNumberWithK } from "~/utils/formatWithK";
//  Settings - delete round, pause round, edit name, edit details, edit sponsors, same as vercel settings
const RoundAdminSettings = () => {
  return (
    <VStack w="full" spacing="32px">
      <Box
        w="full"
        textStyle={{ base: "title3", md: "title2" }}
        color="neutral.11"
      >
        Round Settings
      </Box>
      <Card rounded="8px" gap="16px" w="full" variant="cubik" overflow="hidden">
        <HStack p="24px" w="full" justify={"space-between"}>
          <VStack align="start" gap="8px">
            <Box
              as="p"
              textStyle={{ base: "title4", md: "title3" }}
              color="neutral.11"
            >
              Edit Round Name
            </Box>
            <Box
              as="p"
              textStyle={{ base: "body4", md: "body3" }}
              color="neutral.11"
            >
              <Editable
                outline="2px solid #1D1F1E"
                minW="20rem"
                rounded="6px"
                defaultValue="Solana Infrastructure Round"
              >
                <EditablePreview p="12px 18px" />
                <EditableInput p="12px 18px" />
              </Editable>
            </Box>
          </VStack>
        </HStack>
        <HStack
          w="full"
          justify={"space-between"}
          rounded="8px"
          p="16px"
          background={"#141414"}
          borderTop="1px solid #1D1F1E"
        >
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color="neutral.8"
          >
            Please use 32 characters at maximum.
          </Box>
          <Button
            w="8rem"
            ms={"auto"}
            variant="cubikFilled"
            size="cubikMini"
            as="p"
          >
            Save
          </Button>
        </HStack>
      </Card>
      <Card rounded="8px" gap="16px" w="full" variant="cubik" overflow="hidden">
        <HStack p="24px" w="full" justify={"space-between"}>
          <VStack align="start">
            <Box
              as="p"
              textStyle={{ base: "title4", md: "title3" }}
              color="neutral.11"
            >
              Make the Grant Round pulbic
            </Box>
          </VStack>
          <Switch colorScheme="teal" size="lg" />
        </HStack>
      </Card>
      <Card rounded="8px" gap="16px" w="full" variant="cubik" overflow="hidden">
        <VStack p="24px" mb="12px" align="start">
          <Box
            as="p"
            whiteSpace={"nowrap"}
            overflow="hidden"
            textStyle={{ base: "title2", md: "title3" }}
            color="neutral8"
          >
            Quadratic Funding
          </Box>
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color="neutral.8"
          >
            Enable comments on your Preview Deployments.
          </Box>
          <Center pt="12px">
            <Select
              defaultValue={1}
              w={"20rem"}
              variant={"cubik"}
              placeholder="Select option"
            >
              <option value="option1">Quadratic Funding</option>
              <option value="option2">Pairwise Quadratic Funding</option>
            </Select>
          </Center>
        </VStack>{" "}
        <HStack
          w="full"
          justify={"space-between"}
          rounded="8px"
          p="16px"
          background={"#141414"}
          borderTop="1px solid #1D1F1E"
        >
          <Button
            w="6rem"
            ms={"auto"}
            variant="cubikFilled"
            size="cubikMini"
            as="p"
          >
            Save
          </Button>
        </HStack>
      </Card>
      <Card rounded="8px" gap="16px" w="full" variant="cubik" overflow="hidden">
        <VStack p="24px" mb="12px" align="start">
          <Box
            as="p"
            whiteSpace={"nowrap"}
            overflow="hidden"
            textStyle={{ base: "title2", md: "title3" }}
            color="neutral8"
          >
            Delete Round
          </Box>
          <Box
            as="p"
            textStyle={{ base: "body5", md: "body4" }}
            color="neutral.8"
          >
            Permanently remove the grant round and all of its contents from the
            platform. This action is not reversible, so please continue with
            caution.
          </Box>
        </VStack>
        <HStack
          w="full"
          justify={"space-between"}
          rounded="8px"
          p="16px"
          background={"#141414"}
          borderTop="1px solid #1D1F1E"
        >
          <Button ms={"auto"} variant="cubikDanger" size="cubikMini" as="p">
            Delete Round
          </Button>
        </HStack>
      </Card>
    </VStack>
  );
};

export default RoundAdminSettings;
