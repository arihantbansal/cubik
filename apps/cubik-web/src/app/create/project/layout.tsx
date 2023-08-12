import { Box } from "@/utils/chakra";
import React from "react";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Box mt={10}>{children}</Box>
    </>
  );
};

export default Layout;
