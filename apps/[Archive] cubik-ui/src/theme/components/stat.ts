import { statAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(statAnatomy.keys);

const cubik = definePartsStyle({
  container: {
    backgroundColor: "#080808",
    border: "1px solid #141414",
    rounded: "12px",
    w: "10rem",
  },
  label: {
    textStyle: { base: "title6", md: "title5" },
    color: "#ADB8B6",
  },
  number: {
    fontSize: { base: "18px", md: "24px" },
    fontWeight: "700",
    color: "#ffffff",
  },
});

export const Stat = defineMultiStyleConfig({
  variants: { cubik },
});
