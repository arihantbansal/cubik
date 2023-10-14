import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { isMobileSafari } from "react-device-detect";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    dialog: {},
  };
});

const cubik = definePartsStyle({
  overlay: {
    bg: `${isMobileSafari ? "" : "transparent"}`,
    backdropFilter: `${isMobileSafari ? "blur(10px)" : "blur(10px)"}`,
  },
  dialog: {
    mt: "18vh",
    borderTopRadius: "16px",
    bg: `surface.card`,
    padding: "48px 0px",
    gap: "16px",
    width: "full",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 16px",
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "28px",
    letterSpacing: "0.02em",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#1D1F1E",
    color: "white",
    rounded: "full",
    top: "16px",
    right: "16px",
    height: "24px",
    width: "24px",
    padding: "6px",
  },
  body: {
    padding: "0px 16px",
  },
  footer: {
    padding: "16px 16px 0px 16px",
    borderTop: "1px solid",
    borderColor: "neutral.3",
  },
});

const cubikWeb = definePartsStyle({
  overlay: {
    bg: "#080808",
    backdropFilter: "blur(10px)",
  },
  dialog: {
    mt: "18vh",
    border: "1px solid #1D1F1E",
    borderTopRadius: "16px",
    bg: `surface.card`,
    boxShadow: "0px 2px 120px #000000",
    backdropFilter: "blur(10px)",
    padding: "16px 0px",
    gap: "16px",
    width: "full",
    maxW: "20rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 16px",
    fontSize: "20px",
    fontWeight: "bold",
    lineHeight: "28px",
    letterSpacing: "0.02em",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#1D1F1E",
    color: "white",
    rounded: "full",
    top: "16px",
    right: "16px",
    height: "24px",
    width: "24px",
    padding: "6px",
  },
  body: {
    padding: "0px 16px",
  },
  footer: {
    padding: "16px 16px 0px 16px",
    borderTop: "1px solid",
    borderColor: "neutral.3",
  },
});

export const Drawer = defineMultiStyleConfig({
  baseStyle,
  variants: {
    cubik,
    cubikWeb,
  },
});
