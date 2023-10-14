import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: "medium",
    bg: "#242424",
  },
  list: {
    p: "8px",
    borderRadius: "16px",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "gray.200",
    backgroundColor: "#242424",
    fontSize: "sm",
    _hover: { bg: "#333333" },
    _focus: { bg: "#333333" },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    //my: '0',
    // borderColor: 'white',
    //borderBottom: '1px solid',
  },
});
// export the base styles in the component theme
export const Menu = defineMultiStyleConfig({ baseStyle });
