import { CardBody } from '@chakra-ui/react';
import MarkdownEditor from '~/components/common/editor/MarkdownEditor';

const GrantStepTwo = ({
  editorData,
  setEditorData,
  onSubmit,
  errors,
  register,
}: {
  editorData: string | undefined;
  setEditorData: any;
  onSubmit: (_grant: any) => void;
  errors: any;
  register: any;
}) => {
  return (
    <>
      <CardBody
        rounded={'8px'}
        gap="1rem"
        backgroundColor={'transparent'}
        minH="70vh"
      >
        <MarkdownEditor
          editorHeading="Round Description"
          editorData={editorData}
          setEditorData={setEditorData}
        />
      </CardBody>
    </>
  );
};

export default GrantStepTwo;
