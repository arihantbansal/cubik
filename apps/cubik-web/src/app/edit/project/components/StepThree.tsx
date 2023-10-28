'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import MarkdownEditor from '@/app/components/editor/Editor';
import ChevronLeft from '@/theme/icons/chevron_left.svg';
import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';

const StepThree = ({
  setIncreasedSize,
  onPrevious,
  onSubmit,
  setLoadingSubmit,
  LoadingSubmit,
  isUploading,
  _editorData,
}: {
  setIncreasedSize: Dispatch<SetStateAction<boolean>>;
  onPrevious: () => void;
  onSubmit: (editorData: string) => void;
  setLoadingSubmit: (loading: boolean) => void;
  LoadingSubmit: boolean;
  isUploading: boolean;
  _editorData: string | null;
}) => {
  const [editorData, setEditorData] = useState<string>(_editorData || '');

  return (
    <>
      <VStack gap="12px" w="full" align={'start'}>
        <HStack>
          <Box
            as="p"
            textStyle={{ base: 'title5', md: 'title4' }}
            color="white"
            _after={{
              content: '"*"',
              padding: '4px',
              color: 'red',
            }}
          >
            Detailed Description
          </Box>
        </HStack>
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
      </VStack>
      <CardFooter>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant={'cubikText'}
          onClick={onPrevious}
          leftIcon={
            <Center width="20px" height="20px">
              <ChevronLeft width="14" height="14" />{' '}
            </Center>
          }
        >
          Previous
        </Button>
        <Button
          size={{ base: 'cubikMini', md: 'cubikSmall' }}
          variant="cubikFilled"
          loadingText="Submitting"
          isDisabled={!editorData}
          isLoading={isUploading || LoadingSubmit}
          onClick={() => {
            setLoadingSubmit(true);
            // @ts-ignore
            if (editorData) {
              onSubmit(editorData);
            }
          }}
        >
          Update Project
        </Button>
      </CardFooter>
    </>
  );
};
export { StepThree };
