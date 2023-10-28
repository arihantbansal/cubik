import React from 'react';
import { Box } from '@/utils/chakra';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}
const RootLayout = ({ children }: Props) => {
  return <Box mt={20}>{children}</Box>;
};

export default RootLayout;
