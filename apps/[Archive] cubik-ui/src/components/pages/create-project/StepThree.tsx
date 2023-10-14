import {
  Box,
  Button,
  CardBody,
  CardFooter,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import MarkdownEditor from "~/components/common/editor/MarkdownEditor";

const StepThree = ({
  setIncreasedSize,
  onPrevious,
  onSubmit,
  setLoadingSubmit,
  LoadingSubmit,
}: {
  setIncreasedSize: Dispatch<SetStateAction<boolean>>;
  onPrevious: () => void;
  onSubmit: (editorData: string) => void;
  setLoadingSubmit: (loading: boolean) => void;
  LoadingSubmit: boolean;
}) => {
  const [editorData, setEditorData] = useState<string>(`
<ol><li><p>Instruction on how to test the game? Webapp/xNFTs etc. have higher chances to be tested and receive vote</p></br></li>

<li><p>how the game fits the theme “Upgrade”</p></br></li>
<li><p>if you are building modules/extension of an existing game specify what was achieved during Speedrun </p></br></li>
<li><p>What is the Solana integration?</p></br></li></ol>
`);

  return (
    <>
      <VStack gap="12px" w="full" align={"start"}>
        <HStack>
          <Box
            as="p"
            textStyle={{ base: "title5", md: "title4" }}
            color="white"
            _after={{
              content: '"*"',
              padding: "4px",
              color: "red",
            }}
          >
            Detailed Description
          </Box>
        </HStack>
        <CardBody
          rounded={"8px"}
          p="0"
          gap="1rem"
          border={"1px solid"}
          borderColor="neutral.3"
        >
          <MarkdownEditor
            setIncreasedSize={setIncreasedSize}
            editorData={editorData}
            setEditorData={setEditorData}
            componentSize="sm"
          />
        </CardBody>
      </VStack>
      <CardFooter>
        <Button
          size={{ base: "cubikMini", md: "cubikSmall" }}
          variant={"cubikText"}
          onClick={onPrevious}
          leftIcon={
            <Box boxSize={{ base: "14px", md: "18px" }} as={FiChevronLeft} />
          }
        >
          Previous
        </Button>
        <Button
          size={{ base: "cubikMini", md: "cubikSmall" }}
          variant="cubikFilled"
          loadingText="Submitting"
          isDisabled={!editorData}
          isLoading={LoadingSubmit}
          onClick={() => {
            setLoadingSubmit(true);
            // @ts-ignore
            if (editorData) {
              onSubmit(editorData);
            }
          }}
        >
          Submit Project
        </Button>
      </CardFooter>
    </>
  );
};
export { StepThree };
