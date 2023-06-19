import { Box, Button, CardBody, CardFooter } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import MarkdownEditor from '~/components/common/editor/MarkdownEditor';

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
  const [editorData, setEditorData] = useState<string>();

  return (
    <>
      <CardBody
        rounded={'8px'}
        p="0"
        gap="1rem"
        border={'1px solid'}
        borderColor="neutral.3"
      >
        <MarkdownEditor
          setIncreasedSize={setIncreasedSize}
          editorData={editorData}
          setEditorData={setEditorData}
          componentSize="sm"
        />
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          onClick={onPrevious}
          leftIcon={
            <Box boxSize={{ base: '14px', md: '18px' }} as={FiChevronLeft} />
          }
        >
          Previous
        </Button>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
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
