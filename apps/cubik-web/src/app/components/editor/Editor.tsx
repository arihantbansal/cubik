'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
// import {
//   AiOutlineExpand,
//   AiOutlineLink,
//   AiOutlineOrderedList,
// } from "react-icons/ai";
//import { BiHeading } from "react-icons/bi";
//import { BsTypeItalic } from "react-icons/bs";
//import {
//  MdOutlineFormatBold,
//  MdOutlineFormatListBulleted,
//  MdOutlineFormatUnderlined,
// } from "react-icons/md";
import Expand from '@/theme/icons/expand.svg';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@/utils/chakra';
import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import parse from 'html-react-parser';

import { DescriptionPreview } from './EditorPreview';

const MarkdownEditor = ({
  setIncreasedSize,
  editorData,
  setEditorData,
  componentSize: componentSize,
}: {
  setIncreasedSize: Dispatch<SetStateAction<boolean>>;
  editorHeading?: string;
  editorData: string | undefined;
  setEditorData: any;
  componentSize?: 'sm' | 'md' | 'lg';
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [preview] = useState(false);
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
      // @ts-ignore
      setHTMLPreviewData(parse(html as string));
      setEditorData(html);
    },
    editorProps: {
      attributes: {},
    },
    content: editorData,
  });

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

  const [size, setSize] = useState({ base: '8px', sm: '12px', md: '16px' });
  useEffect(() => {
    if (componentSize === 'sm') {
      setSize({ base: '12px', sm: '14px', md: '16px' });
    } else if (componentSize === 'md') {
      setSize({ base: '12px', sm: '24px', md: '32px' });
    } else if (componentSize === 'lg') {
      setSize({ base: '0px', sm: '32px', md: '44px' });
    } else {
      setSize({ base: '8px', sm: '12px', md: '16px' });
    }
  }, [componentSize]);

  const EditorArea = (
    <EditorContent
      id="reset-des"
      placeholder="Enter your project description here"
      style={{
        height: '100%',
        padding: '0px',
      }}
      width={'100%'}
      height={'100%'}
      editor={editor}
    />
  );
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
      <Flex
        w={'full'}
        px={size}
        py={{ base: '12px', md: '16px' }}
        gap={{ base: '12px', md: '16px' }}
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'row', md: 'row' }}
        justify={'space-between'}
      >
        {/* <Button
          p="8px 16px"
          rounded="8px"
          bg={'neutral.4'}
          _hover={{
            bg: 'neutral.2',
          }}
          rightIcon={
            preview ? (
              <Box
                as={TbPencil}
                boxSize={{ base: '12px', md: '14px' }}
                color="white"
              />
            ) : (
              <Box as={TbEye} boxSize={{ base: '12px', md: '14px' }} />
            )
          }
          fontSize={{ base: '12px', md: '14px' }}
          onClick={() => setPreview(!preview)}
          cursor="pointer"
        >
          {!preview ? 'Preview' : 'Edit'}
        </Button> */}
        <HStack ml="auto" height="38px" spacing="4px">
          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown Heading"
            bg={
              editor?.isActive('heading', { level: 2 }) ? 'neutral.4' : 'none'
            }
            onClick={() => {
              editor?.commands.toggleHeading({ level: 2 });
            }}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '6px', md: '10px' }
                  : componentSize === 'md'
                  ? { base: '8px', md: '13px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '14px' }
                  : { base: '8px', md: '13px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '6px', md: '10px' }
                  : componentSize === 'md'
                  ? { base: '8px', md: '13px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '14px' }
                  : { base: '8px', md: '13px' }
              }
            >
              <svg
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.6 12C9.82091 12 10 11.8209 10 11.6V0.4C10 0.179086 9.82091 0 9.6 0H7.9C7.67909 0 7.5 0.179086 7.5 0.4V4.3C7.5 4.41046 7.41046 4.5 7.3 4.5H2.7C2.58954 4.5 2.5 4.41046 2.5 4.3V0.4C2.5 0.179086 2.32091 0 2.1 0H0.4C0.179086 0 0 0.179086 0 0.4V11.6C0 11.8209 0.179086 12 0.4 12H2.1C2.32091 12 2.5 11.8209 2.5 11.6V6.95C2.5 6.83954 2.58954 6.75 2.7 6.75H7.3C7.41046 6.75 7.5 6.83954 7.5 6.95V11.6C7.5 11.8209 7.67909 12 7.9 12H9.6Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>
          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            bg={editor?.isActive('bold') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
            }}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '6px', md: '10px' }
                  : componentSize === 'md'
                  ? { base: '8px', md: '13px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '14px' }
                  : { base: '8px', md: '13px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '6px', md: '10px' }
                  : componentSize === 'md'
                  ? { base: '8px', md: '13px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '14px' }
                  : { base: '8px', md: '13px' }
              }
            >
              <svg
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.43755 5.85C7.80477 5.62638 8.11467 5.32006 8.34255 4.95547C8.57042 4.59087 8.70996 4.17808 8.75005 3.75C8.757 3.36291 8.68763 2.97825 8.5459 2.61797C8.40417 2.2577 8.19285 1.92888 7.92401 1.65029C7.65517 1.3717 7.33408 1.14881 6.97909 0.994332C6.62409 0.839858 6.24214 0.756833 5.85505 0.75H1.38755C1.16664 0.75 0.987549 0.929086 0.987549 1.15V10.85C0.987549 11.0709 1.16663 11.25 1.38755 11.25H6.23755C6.60591 11.2461 6.9699 11.1696 7.30872 11.025C7.64754 10.8804 7.95456 10.6705 8.21224 10.4073C8.46993 10.144 8.67324 9.83257 8.81055 9.49074C8.94787 9.1489 9.01651 8.78336 9.01255 8.415V8.325C9.01281 7.80533 8.86474 7.29639 8.58574 6.85797C8.30675 6.41954 7.90841 6.06986 7.43755 5.85ZM2.48755 2.45C2.48755 2.33954 2.57734 2.25 2.68779 2.25C3.79602 2.25 4.47575 2.25 5.63755 2.25C5.95718 2.24011 6.27219 2.32821 6.54031 2.50249C6.80842 2.67677 7.01683 2.92888 7.13755 3.225C7.2597 3.62084 7.2202 4.04894 7.02766 4.41574C6.83513 4.78254 6.50522 5.05821 6.11005 5.1825C5.95658 5.22747 5.79747 5.25021 5.63755 5.25H2.68755C2.57709 5.25 2.48755 5.16046 2.48755 5.05V2.45ZM5.93755 9.75H2.68755C2.57709 9.75 2.48755 9.66046 2.48755 9.55V6.95C2.48755 6.83954 2.57709 6.75 2.68755 6.75H5.93755C6.25718 6.74011 6.57219 6.82821 6.84031 7.00249C7.10842 7.17677 7.31683 7.42888 7.43755 7.725C7.5597 8.12084 7.5202 8.54894 7.32766 8.91574C7.13513 9.28254 6.80522 9.55821 6.41005 9.6825C6.25659 9.72747 6.09747 9.75021 5.93755 9.75Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>
          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown italic"
            bg={editor?.isActive('italic') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleItalic().run();
            }}
          >
            <Center
              transform="scale(0.7)"
              width={
                componentSize === 'sm'
                  ? { base: '6px', md: '10px' }
                  : componentSize === 'md'
                  ? { base: '8px', md: '13px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '14px' }
                  : { base: '8px', md: '13px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '7px', md: '8px' }
                  : componentSize === 'md'
                  ? { base: '9px', md: '10px' }
                  : componentSize === 'lg'
                  ? { base: '10px', md: '11px' }
                  : { base: '10px', md: '11px' }
              }
            >
              <svg
                viewBox="0 0 4 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.81992 3.75H3.31992L1.66992 11.25H0.169922L1.81992 3.75ZM3.07992 0.75C2.93159 0.75 2.78658 0.793987 2.66324 0.876398C2.53991 0.958809 2.44378 1.07594 2.38701 1.21299C2.33025 1.35003 2.31539 1.50083 2.34433 1.64632C2.37327 1.7918 2.4447 1.92544 2.54959 2.03033C2.65448 2.13522 2.78812 2.20665 2.9336 2.23559C3.07909 2.26453 3.22989 2.24968 3.36693 2.19291C3.50398 2.13614 3.62111 2.04001 3.70352 1.91668C3.78594 1.79334 3.82992 1.64834 3.82992 1.5C3.82992 1.30109 3.7509 1.11032 3.61025 0.96967C3.4696 0.829018 3.27883 0.75 3.07992 0.75Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>
          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown underline"
            bg={editor?.isActive('underline') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleUnderline().run();
            }}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '9px', md: '13px' }
                  : componentSize === 'md'
                  ? { base: '11px', md: '16px' }
                  : componentSize === 'lg'
                  ? { base: '13px', md: '17px' }
                  : { base: '11px', md: '16px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '9px', md: '13px' }
                  : componentSize === 'md'
                  ? { base: '11px', md: '16px' }
                  : componentSize === 'lg'
                  ? { base: '13px', md: '17px' }
                  : { base: '11px', md: '16px' }
              }
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 1V6C3 7.32608 3.52678 8.59785 4.46447 9.53553C5.40215 10.4732 6.67392 11 8 11C9.32608 11 10.5979 10.4732 11.5355 9.53553C12.4732 8.59785 13 7.32608 13 6V1M1 15H15"
                  stroke="#ADB8B6"
                  strokeWidth="2"
                />
              </svg>
            </Center>
          </Center>

          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown link"
            bg={editor?.isActive('link') ? 'neutral.4' : ''}
            onClick={() => setIsLinkModalOpen(true)}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
            >
              <svg
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.25 7.75H4.25C3.25544 7.75 2.30161 7.35491 1.59835 6.65165C0.895088 5.94839 0.5 4.99456 0.5 4C0.5 3.00544 0.895088 2.05161 1.59835 1.34835C2.30161 0.645088 3.25544 0.25 4.25 0.25H7.25V1.75H4.25C3.65326 1.75 3.08097 1.98705 2.65901 2.40901C2.23705 2.83097 2 3.40326 2 4C2 4.59674 2.23705 5.16903 2.65901 5.59099C3.08097 6.01295 3.65326 6.25 4.25 6.25H7.25V7.75ZM11.75 0.25H8.75V1.75H11.75C12.3467 1.75 12.919 1.98705 13.341 2.40901C13.7629 2.83097 14 3.40326 14 4C14 4.59674 13.7629 5.16903 13.341 5.59099C12.919 6.01295 12.3467 6.25 11.75 6.25H8.75V7.75H11.75C12.7446 7.75 13.6984 7.35491 14.4017 6.65165C15.1049 5.94839 15.5 4.99456 15.5 4C15.5 3.00544 15.1049 2.05161 14.4017 1.34835C13.6984 0.645088 12.7446 0.25 11.75 0.25ZM11 3.25H5V4.75H11V3.25Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>

          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown Bullet List"
            bg={editor?.isActive('bulletList') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleBulletList().run();
            }}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
            >
              <svg
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3.875C1.4 3.875 0.875 4.4 0.875 5C0.875 5.6 1.4 6.125 2 6.125C2.6 6.125 3.125 5.6 3.125 5C3.125 4.4 2.6 3.875 2 3.875ZM2 0.125C1.4 0.125 0.875 0.65 0.875 1.25C0.875 1.85 1.4 2.375 2 2.375C2.6 2.375 3.125 1.85 3.125 1.25C3.125 0.65 2.6 0.125 2 0.125ZM2 7.625C1.4 7.625 0.875 8.15 0.875 8.75C0.875 9.35 1.4 9.875 2 9.875C2.6 9.875 3.125 9.35 3.125 8.75C3.125 8.15 2.6 7.625 2 7.625ZM4.625 0.5V2H15.125V0.5H4.625ZM4.625 9.5H15.125V8H4.625V9.5ZM4.625 5.75H15.125V4.25H4.625V5.75Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>

          <Center
            as={Button}
            h="100%"
            variant={'unstyled'}
            aria-label="Markdown Ordered List"
            bg={editor?.isActive('orderedList') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleOrderedList().run();
            }}
          >
            <Center
              width={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
              height={
                componentSize === 'sm'
                  ? { base: '10px', md: '16px' }
                  : componentSize === 'md'
                  ? { base: '12px', md: '18px' }
                  : componentSize === 'lg'
                  ? { base: '16px', md: '20px' }
                  : { base: '12px', md: '18px' }
              }
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.875 9H2.375V9.375H1.625V10.125H2.375V10.5H0.875V11.25H3.125V8.25H0.875V9ZM1.625 3.75H2.375V0.75H0.875V1.5H1.625V3.75ZM0.875 5.25H2.225L0.875 6.825V7.5H3.125V6.75H1.775L3.125 5.175V4.5H0.875V5.25ZM4.625 1.5V3H15.125V1.5H4.625ZM4.625 10.5H15.125V9H4.625V10.5ZM4.625 6.75H15.125V5.25H4.625V6.75Z"
                  fill="#ADB8B6"
                />
              </svg>
            </Center>
          </Center>

          {/* <IconButton
            h="100%"
            aria-label="Markdown blockquote"
            variant={'markdownIconButton'}
            bg={editor?.isActive('blockquote') ? 'neutral.4' : ''}
            onClick={() => {
              editor?.chain().focus().toggleBlockquote().run();
            }}
            icon={
              <Box
                as={BsBlockquoteLeft}
                boxSize={{ base: '12px', md: '14px' }}
              />
            }
          />*/}
        </HStack>
      </Flex>
      <Box w={'full'} h="1px" backgroundColor="neutral.3" />
      {preview ? (
        <Box
          w={'full'}
          height={
            componentSize === 'sm'
              ? '20rem'
              : componentSize === 'md'
              ? '30rem'
              : componentSize === 'lg'
              ? '60vh'
              : '20rem'
          }
          overflow="scroll"
          p="0.5rem 1.6rem"
        >
          <DescriptionPreview description={HTMLPreviewData} />
        </Box>
      ) : (
        <Box
          px={size}
          w={'full'}
          height={
            componentSize === 'sm'
              ? { base: '100%', md: '100%' }
              : componentSize === 'md'
              ? { base: '100%', md: '100%' }
              : componentSize === 'lg'
              ? { base: '100%', md: '100%' }
              : { base: '100%', md: '100%' }
          }
          overflow="scroll"
        >
          <Button
            h="2rem"
            position={'absolute'}
            variant="cubikText"
            cursor="pointer"
            zIndex={'10'}
            bottom="16%"
            right={'10'}
            _hover={{
              backgroundColor: '#001F1B',
            }}
            aria-label="expand"
            onClick={() => {
              setIncreasedSize((prevValue) => !prevValue);
            }}
          >
            <Center width="18px" height="18px">
              <Expand color="#A8F0E6" />
            </Center>
          </Button>
          <div
            style={{
              padding: '0px',
              height:
                componentSize === 'sm'
                  ? '20rem'
                  : componentSize === 'md'
                  ? '30rem'
                  : componentSize === 'lg'
                  ? '60vh'
                  : '20rem',
              overflow: 'scroll',
              border: 'none !important',
            }}
            className="reset"
          >
            {EditorArea}
          </div>
        </Box>
      )}
    </>
  );
};
export default MarkdownEditor;
