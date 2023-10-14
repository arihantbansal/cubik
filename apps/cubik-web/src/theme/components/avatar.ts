import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(avatarAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  badge: {
    borderColor: "white",
    backgroundColor: "white",
    border: "1px solid",
  },
  container: {
    border: "none",
  },
  excessLabel: {
    display: "none",
  },
});

const contributorsGroup = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid",
  },
  container: {
    borderRadius: "xl",
    borderColor: "white",
    backgroundColor: "white",
  },
  excessLabel: {
    display: "none",
  },
});

export const Avatar = defineMultiStyleConfig({
  baseStyle,
  variants: { contributorsGroup },
});
