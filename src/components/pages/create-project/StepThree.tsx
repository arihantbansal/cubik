import { Button, CardBody, CardFooter, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import MarkdownEditor from '~/components/common/editor/MarkdownEditor';

const StepThree = ({
  onPrevious,
  onSubmit,
  setLoadingSubmit,
  LoadingSubmit,
}: {
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
        <MarkdownEditor editorData={editorData} setEditorData={setEditorData} />
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          onClick={onPrevious}
          leftIcon={<Icon as={FiChevronLeft} width={5} height={5} />}
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
