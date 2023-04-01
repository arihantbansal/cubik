import {
  Box,
  Button,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';
import { useState } from 'react';
import { AiOutlineLink, AiOutlineOrderedList } from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { BsBlockquoteLeft, BsTypeItalic } from 'react-icons/bs';
import { FiChevronLeft } from 'react-icons/fi';
import {
  MdOutlineFormatBold,
  MdOutlineFormatListBulleted,
  MdOutlineFormatUnderlined,
} from 'react-icons/md';

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
  const [url, setUrl] = useState<string>('');
  const [editorData, setEditorData] = useState<string>();
  const [preview, setPreview] = useState(false);
  const editor = useEditor({
    extensions: [
      Underline,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      Link.configure({
        openOnClick: false,
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          levels: [1, 2],
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const json = editor.getJSON();
      console.log('char count', editor.storage);
      setEditorData(html);
    },
    editorProps: {
      attributes: {},
    },
    content: editorData,
  });

  return (
    <>
      <CardBody
        rounded={'8px'}
        gap="1rem"
        border={'1px solid'}
        borderColor="neutral.3"
        backgroundColor={'surface.input_field'}
      >
        {/* editor controls */}
        <Flex w={'full'} p="1rem" align={'center'} justify={'space-between'}>
          <Box onClick={() => setPreview(!preview)} cursor="pointer">
            {!preview ? 'Preview' : 'Edit'}
          </Box>
          <HStack spacing="0.1rem">
            <IconButton
              aria-label="Markdown Heading"
              variant={'markdownIconButton'}
              bg={editor?.isActive('heading', { level: 2 }) ? '#ffffff30' : ''}
              onClick={() => {
                editor?.commands.toggleHeading({ level: 1 });
              }}
              icon={<BiHeading size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('bold') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleBold().run();
              }}
              icon={<MdOutlineFormatBold size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('italic') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleItalic().run();
              }}
              icon={<BsTypeItalic size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('underline') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleUnderline().run();
              }}
            >
              <MdOutlineFormatUnderlined size={20} />
            </IconButton>
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('link') ? '#ffffff30' : ''}
              onClick={() =>
                editor?.chain().focus().toggleLink({ href: url }).run()
              }
              icon={<AiOutlineLink size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('bulletList') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleBulletList().run();
              }}
              icon={<MdOutlineFormatListBulleted size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('orderedList') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleOrderedList().run();
              }}
              icon={<AiOutlineOrderedList size={20} />}
            />
            <IconButton
              aria-label="Markdown bold"
              variant={'markdownIconButton'}
              bg={editor?.isActive('blockquote') ? '#ffffff30' : ''}
              onClick={() => {
                editor?.chain().focus().toggleBlockquote().run();
              }}
              icon={<BsBlockquoteLeft size={20} />}
            />
          </HStack>
        </Flex>
        <Box w={'full'} h="1px" backgroundColor="neutral.3" />
        {preview ? (
          <Box w={'full'} height={'20rem'} overflow="scroll" p="0.5rem 1.6rem">
            {parse(editorData as string)}
          </Box>
        ) : (
          <Box w={'full'} height={'20rem'} overflow="scroll">
            <div
              style={{
                height: '100% !important',
                overflow: 'hidden',
                border: 'none !important',
              }}
              className="reset"
            >
              <EditorContent
                id="reset-des"
                placeholder="Enter your project description here"
                style={{
                  height: '100%',
                }}
                width={'100%'}
                height={'100%'}
                editor={editor}
              />
            </div>
          </Box>
        )}
      </CardBody>
      <CardFooter>
        <Button
          variant={'outline'}
          onClick={onPrevious}
          leftIcon={<Icon as={FiChevronLeft} width={5} height={5} />}
        >
          Previous
        </Button>
        <Button
          variant={'connect_wallet'}
          isLoading={LoadingSubmit}
          onClick={() => {
            setLoadingSubmit(true);
            // @ts-ignore
            onSubmit(editorData);
          }}
        >
          Submit Project
        </Button>
      </CardFooter>
    </>
  );
};
export { StepThree };
