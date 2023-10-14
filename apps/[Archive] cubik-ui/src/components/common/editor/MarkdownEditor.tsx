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
} from "@chakra-ui/react";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiOutlineExpand,
  AiOutlineLink,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { BiHeading } from "react-icons/bi";
import { BsTypeItalic } from "react-icons/bs";
import {
  MdOutlineFormatBold,
  MdOutlineFormatListBulleted,
  MdOutlineFormatUnderlined,
} from "react-icons/md";
import { DescriptionPreview } from "./MarkdownEditorPreview";

const MarkdownEditor = ({
  setIncreasedSize,
  editorHeading,
  editorData,
  setEditorData,
  componentSize: componentSize,
}: {
  setIncreasedSize: Dispatch<SetStateAction<boolean>>;
  editorHeading?: string;
  editorData: string | undefined;
  setEditorData: any;
  componentSize?: "sm" | "md" | "lg";
}) => {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [preview, setPreview] = useState(false);
  const [HTMLPreviewData, setHTMLPreviewData] = useState("");
  const editor = useEditor({
    content: editorData,
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
  });

  const handleAddLink = () => {
    if (url) {
      // @ts-ignore
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setUrl("");
      setIsLinkModalOpen(false);
    }
  };

  const [size, setSize] = useState({ base: "8px", sm: "12px", md: "16px" });
  useEffect(() => {
    if (componentSize === "sm") {
      setSize({ base: "12px", sm: "14px", md: "16px" });
    } else if (componentSize === "md") {
      setSize({ base: "12px", sm: "24px", md: "32px" });
    } else if (componentSize === "lg") {
      setSize({ base: "0px", sm: "32px", md: "44px" });
    } else {
      setSize({ base: "8px", sm: "12px", md: "16px" });
    }
  }, []);
  const EditorArea = (
    <EditorContent
      id="reset-des"
      placeholder="Enter your project description here"
      style={{
        height: "100%",
        padding: "0px",
      }}
      width={"100%"}
      height={"100%"}
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
        w={"full"}
        px={size}
        py={{ base: "12px", md: "16px" }}
        gap={{ base: "12px", md: "16px" }}
        align={{ base: "start", md: "center" }}
        direction={{ base: "row", md: "row" }}
        justify={"space-between"}
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
          <IconButton
            h="100%"
            aria-label="Markdown Heading"
            variant={"markdownIconButton"}
            bg={
              editor?.isActive("heading", { level: 2 }) ? "neutral.4" : "none"
            }
            onClick={() => {
              editor?.commands.toggleHeading({ level: 2 });
            }}
            icon={
              <Box
                as={BiHeading}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
          <IconButton
            h="100%"
            aria-label="Markdown bold"
            variant={"markdownIconButton"}
            bg={editor?.isActive("bold") ? "neutral.4" : ""}
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
            }}
            icon={
              <Box
                as={MdOutlineFormatBold}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
          <IconButton
            h="100%"
            aria-label="Markdown bold"
            variant={"markdownIconButton"}
            bg={editor?.isActive("italic") ? "neutral.4" : ""}
            onClick={() => {
              editor?.chain().focus().toggleItalic().run();
            }}
            icon={
              <Box
                as={BsTypeItalic}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
          <IconButton
            h="100%"
            aria-label="Markdown bold"
            variant={"markdownIconButton"}
            bg={editor?.isActive("underline") ? "neutral.4" : ""}
            onClick={() => {
              editor?.chain().focus().toggleUnderline().run();
            }}
          >
            <Box
              as={MdOutlineFormatUnderlined}
              boxSize={
                componentSize === "sm"
                  ? { base: "10px", md: "16px" }
                  : componentSize === "md"
                  ? { base: "12px", md: "18px" }
                  : componentSize === "lg"
                  ? { base: "16px", md: "20px" }
                  : { base: "12px", md: "18px" }
              }
            />
          </IconButton>
          <IconButton
            h="100%"
            aria-label="Markdown link"
            variant={"markdownIconButton"}
            bg={editor?.isActive("link") ? "neutral.4" : ""}
            onClick={() => setIsLinkModalOpen(true)}
            icon={
              <Box
                as={AiOutlineLink}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
          <IconButton
            h="100%"
            aria-label="Markdown bold"
            variant={"markdownIconButton"}
            bg={editor?.isActive("bulletList") ? "neutral.4" : ""}
            onClick={() => {
              editor?.chain().focus().toggleBulletList().run();
            }}
            icon={
              <Box
                as={MdOutlineFormatListBulleted}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
          <IconButton
            h="100%"
            aria-label="Markdown bold"
            variant={"markdownIconButton"}
            bg={editor?.isActive("orderedList") ? "neutral.4" : ""}
            onClick={() => {
              editor?.chain().focus().toggleOrderedList().run();
            }}
            icon={
              <Box
                as={AiOutlineOrderedList}
                boxSize={
                  componentSize === "sm"
                    ? { base: "10px", md: "16px" }
                    : componentSize === "md"
                    ? { base: "12px", md: "18px" }
                    : componentSize === "lg"
                    ? { base: "16px", md: "20px" }
                    : { base: "12px", md: "18px" }
                }
              />
            }
          />
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
      <Box w={"full"} h="1px" backgroundColor="neutral.3" />
      {preview ? (
        <Box
          w={"full"}
          height={
            componentSize === "sm"
              ? "20rem"
              : componentSize === "md"
              ? "30rem"
              : componentSize === "lg"
              ? "60vh"
              : "20rem"
          }
          overflow="scroll"
          p="0.5rem 1.6rem"
        >
          <DescriptionPreview description={HTMLPreviewData} />
        </Box>
      ) : (
        <Box
          px={size}
          w={"full"}
          height={
            componentSize === "sm"
              ? { base: "100%", md: "100%" }
              : componentSize === "md"
              ? { base: "100%", md: "100%" }
              : componentSize === "lg"
              ? { base: "100%", md: "100%" }
              : { base: "100%", md: "100%" }
          }
          overflow="scroll"
        >
          <IconButton
            h="2rem"
            as={"button"}
            position={"absolute"}
            cursor="pointer"
            zIndex={"10"}
            bottom="16%"
            right={"10"}
            _hover={{
              backgroundColor: "#001F1B",
            }}
            aria-label="expand"
            variant={"expand IconButton"}
            onClick={() => {
              setIncreasedSize((prevValue) => !prevValue);
            }}
            icon={<AiOutlineExpand size={20} color="#A8F0E6" />}
          />
          <div
            style={{
              padding: "0px",
              height:
                componentSize === "sm"
                  ? "20rem"
                  : componentSize === "md"
                  ? "30rem"
                  : componentSize === "lg"
                  ? "60vh"
                  : "20rem",
              overflow: "scroll",
              border: "none !important",
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
