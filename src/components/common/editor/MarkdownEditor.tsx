import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';
import { useState } from 'react';
import {
  AiOutlineExpand,
  AiOutlineLink,
  AiOutlineOrderedList,
} from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { BsBlockquoteLeft, BsTypeItalic } from 'react-icons/bs';
import {
  MdOutlineFormatBold,
  MdOutlineFormatListBulleted,
  MdOutlineFormatUnderlined,
} from 'react-icons/md';
import { DescriptionPreview } from './MarkdownEditorPreview';

const MarkdownEditor = ({
  editorHeading,
  editorData,
  setEditorData,
}: {
  editorHeading?: string;
  editorData: string | undefined;
  setEditorData: any;
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModal] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [preview, setPreview] = useState(false);
  const [HTMLPreviewData, setHTMLPreviewData] = useState('');
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
      // @ts-ignore
      setHTMLPreviewData(parse(html as string));
      setEditorData(html);
    },
    editorProps: {
      attributes: {},
    },
    content: editorData,
  });

  const EditorCardBody = () => {
    return (
      <Box
        position={'relative'}
        w={'full'}
        height={'20rem'}
        overflow="scroll"
      ></Box>
    );
  };

  const handleAddLink = () => {
    if (url) {
      // @ts-ignore
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
      setUrl('');
      setIsLinkModalOpen(false);
    }
  };
  return (
    <>
      <Modal
        variant="cubik"
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                type="url"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="connect_wallet" onClick={handleAddLink}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditorCardBody />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="connect_wallet"
              onClick={() => setIsEditorModal(false)}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* editor controls */}
      {editorHeading && (
        <Box w="full">
          <Box as="p" textStyle={'title2'}>
            {editorHeading}
          </Box>
        </Box>
      )}
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
              editor?.commands.toggleHeading({ level: 2 });
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
            aria-label="Markdown link"
            variant={'markdownIconButton'}
            bg={editor?.isActive('link') ? '#ffffff30' : ''}
            onClick={() => setIsLinkModalOpen(true)}
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
            aria-label="Markdown blockquote"
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
        <Box w={'full'} height={'100%'} overflow="scroll" p="0.5rem 1.6rem">
          <DescriptionPreview description={HTMLPreviewData} />
        </Box>
      ) : (
        <Box
          position={'relative'}
          w={'full'}
          height={'20rem'}
          overflow="scroll"
        >
          <IconButton
            as={'button'}
            cursor="pointer"
            zIndex={'10'}
            position={'fixed'}
            bottom="0.5rem"
            _hover={{
              backgroundColor: '#001F1B',
            }}
            right={'0.5rem'}
            aria-label="expand"
            variant={'expand IconButton'}
            onClick={() => {
              setIsEditorModal(true);
            }}
            icon={<AiOutlineExpand size={20} color="#A8F0E6" />}
          />
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
    </>
  );
};
export default MarkdownEditor;
