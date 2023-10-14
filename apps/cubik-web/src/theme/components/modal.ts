import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const cubik = definePartsStyle({
  overlay: {
    bg: "rgba(0, 0, 0, 0.72)",
    backdropFilter: "blur(10px)",
  },
  dialog: {
    mt: "18vh",
    mx: { base: "16px", md: "0px" },
    borderRadius: "20px",
    border: "1px solid #141414",
    bg: `surface.card`,
    boxShadow: "0px 2px 120px #000000",
    backdropFilter: "blur(10px)",
    padding: { base: "24px 0px", md: "32px 0px" },
    gap: { base: "16px", md: "24px" },
  },
  dialogContainer: {
    outline: "1px dashed red",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: { base: "0px 24px", md: "0px 32px" },
    fontSize: { base: "16px", md: "20px" },
    fontWeight: "bold",
    lineHeight: { base: "24px", md: "28px" },
    letterSpacing: "0.02em",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#1D1F1E",
    color: "white",
    rounded: "full",
    top: { base: "24px", md: "32px" },
    right: { base: "24px", md: "32px" },
    height: "30px",
    width: "30px",
    padding: "4px",
  },
  body: {
    padding: { base: "0px 24px", md: "0px 32px" },
  },
  footer: {
    padding: { base: "26px 24px 0px 24px", md: "24px 32px 0px 32px" },
    borderTop: "1px solid",
    borderColor: "neutral.3",
  },
});

export const Modal = defineMultiStyleConfig({
  variants: {
    cubik,
  },
});
