import React from 'react';
import { Card, CardHeader, VStack } from '@/utils/chakra';

import type { ProjectCommonType } from './type';
import { VisitorViewCardHeader } from './VisitorViewCardHeader';

interface Props {
  projects: ProjectCommonType;
}
export const VisitorViewCard = (props: Props) => {
  return (
    <Card px="0px" w="100%">
      <CardHeader gap="0" p={0} mb="0">
        {/* <StatusBanner status={props.projects.status} /> */}
        <VStack border="none" w="full" align="start" p={5} px={0}>
          <VisitorViewCardHeader project={props.projects} />
        </VStack>
      </CardHeader>
    </Card>
  );
};
