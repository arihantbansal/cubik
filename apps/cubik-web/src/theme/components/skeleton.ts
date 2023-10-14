import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from "@chakra-ui/styled-system";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const cubik = defineStyle({
  _light: {
    [$startColor.variable]: "#212121",
    [$endColor.variable]: "#060606",
  },
  _dark: {
    [$startColor.variable]: "#212121",
    [$endColor.variable]: "#060606",
  },
  rounded: "8px",
});

const xl = defineStyle({
  h: 9,
  borderRadius: "lg",
});

export const Skeleton = defineStyleConfig({
  variants: { cubik },
  sizes: { xl },
  defaultProps: {
    variant: "cubik",
  },
});
