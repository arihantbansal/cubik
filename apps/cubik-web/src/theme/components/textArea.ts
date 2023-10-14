import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  background: "#0F0F0F",
  outline: "1px solid #141414",
  border: "none",
  boxShadow: "none",
  fontSize: { base: "12px", md: "14px" },
  borderRadius: "8px",
  height: "40px",
  borderColor: "transparent",
  _focus: {
    borderColor: "#A8F0E6 !important",
    background: "#0F0F0F",
    boxShadow: "0 0 0 1px #A8F0E6 !important",
    borderRadius: "8px",
    outlineColor: "#A8F0E6",
  },
  _hover: {
    borderColor: "#A8F0E6",
    boxShadow: "0 0 0 1px #A8F0E6",
    borderRadius: "8px",
    outlineColor: "#A8F0E6",
  },
  _active: {
    borderColor: "#A8F0E6",
    borderRadius: "8px",
    boxShadow: "0 0 0 1px #A8F0E6",
    outlineColor: "#A8F0E6",
  },
  _required: {
    borderColor: "#A8F0E6",
    borderRadius: "8px",
    boxShadow: "0 0 0 2px red !important",
    outlineColor: "#A8F0E6",
  },
  _invalid: {
    color: "#A8F0E6",
    boxShadow: "0 0 0 2px red !important",
    rounded: "8px",
  },
  _placeholder: {
    fontSize: { base: "12px", md: "14px" },
    color: "#636666",
  },
});

const outline = defineStyle({
  backgroundColor: "#0F0F0F",
  outline: "1px solid #141414",
  border: "none",
  boxShadow: "none",
});

export const Textarea = defineStyleConfig({
  baseStyle,
  variants: { outline },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});
