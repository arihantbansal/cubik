import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: "#0C0D0D",
    _dark: {
      backgroundColor: "#0C0D0D",
    },
  },
  header: {
    paddingBottom: "2px",
  },
  body: {
    paddingTop: "2px",
  },
  footer: {
    paddingTop: "4px",
  },
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0",
    },
  }),
  // define custom styles for xl size
  xl: definePartsStyle({
    container: {
      borderRadius: "36px",
      padding: "40px",
    },
  }),
};

// define custom variant
const variants = {
  cubik: definePartsStyle({
    container: {
      backgroundColor: "surface.card",
      color: "neutral.11",
      //padding: { base: '24px', md: '40px' },
      border: "1px solid #FFFFFF10",
      rounded: { base: "12px", md: "16px" },
      gap: { base: "1.8rem", md: "2.2rem" },
    },
    header: {
      maxW: "full",
      padding: "0px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.6rem",
    },
    body: {
      padding: "0px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    },
    footer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0px",
      justifyContent: "space-between",
    },
  }),
  funky: definePartsStyle({
    container: {
      borderColor: "#459cc6",
      borderWidth: "3px",
      color: "chakra-body-text",
    },
  }),
};

// export the component theme
export const Card = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    // define which size and variant is applied by default
    size: "md",
    variant: "cubik",
  },
});
