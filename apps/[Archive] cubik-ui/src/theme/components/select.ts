import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    background: "#0F0F0F",
    outline: "1px solid #141414",
    border: "1px solid",
    borderColor: "#141414",
    fontSize: { base: "8px", md: "10px" },
    borderRadius: "8px",
    height: "40px",
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
      boxShadow: "0 0 0 1px #A8F0E6",
      outlineColor: "#A8F0E6",
    },
    _invalid: {
      color: "#A8F0E6",
      rounded: "8px",
    },
    _placeholder: {
      fontSize: { base: "8px", md: "10px" },
      color: "#3B3D3D",
    },
  },
  icon: {
    color: "#3B3D3D",
  },
});

export const Select = defineMultiStyleConfig({ baseStyle });
