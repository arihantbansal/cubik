import { Card, CardHeader, VStack } from "@/utils/chakra";
import React from "react";
import { VisitorViewCardHeader } from "./VisitorViewCardHeader";
import { ProjectCommonType } from "./type";
import { StatusBanner } from "./StatusBanner";

interface Props {
  projects: ProjectCommonType;
}
export const VisitorViewCard = (props: Props) => {
  return (
    <Card px="0px" w="100%">
      <CardHeader gap="0" p={0} mb="0">
        <StatusBanner status={props.projects.status} />
        <VStack
          border="none"
          borderTop="1px solid"
          borderColor="neutral.3"
          w="full"
          align="start"
          p={4}
        >
          <VisitorViewCardHeader project={props.projects} />
        </VStack>
      </CardHeader>
    </Card>
  );
};
