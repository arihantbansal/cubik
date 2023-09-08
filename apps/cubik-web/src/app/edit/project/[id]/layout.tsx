import { Box } from "@/utils/chakra";
import React from "react";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const RootLayout = ({ children }: Props) => {
  return <Box mt={20}>{children}</Box>;
};

export default RootLayout;
