import { CardBody } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import MarkdownEditor from "~/components/common/editor/MarkdownEditor";

const GrantStepTwo = ({
  setIncreasedSize,
  editorData,
  setEditorData,
  onSubmit,
  errors,
  register,
}: {
  setIncreasedSize: Dispatch<SetStateAction<boolean>>;
  editorData: string | undefined;
  setEditorData: any;
  onSubmit: (_grant: any) => void;
  errors: any;
  register: any;
}) => {
  return (
    <>
      <CardBody
        rounded={"8px"}
        gap={{ base: "0px", md: "12px" }}
        backgroundColor={"transparent"}
        minH="70vh"
        py={{ base: "12px", md: "32px", lg: "32px" }}
        position={"relative"}
      >
        <MarkdownEditor
          editorHeading="Round Description"
          editorData={editorData}
          setEditorData={setEditorData}
          componentSize="lg"
          setIncreasedSize={setIncreasedSize}
        />
      </CardBody>
    </>
  );
};

export default GrantStepTwo;
