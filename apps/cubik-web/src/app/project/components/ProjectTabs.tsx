import { DetailedDescription } from "@/app/components/common/description";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@/utils/chakra";
import React from "react";
import { Contributions } from "./Contributions";
import { ProjectDiscussion } from "./Discussion";

interface Props {
  longDescription: string;
  id: string;
  eventType?: "hackathon" | "round" | "preview";
  eventId?: string;
}
export const ProjectTabs = ({
  longDescription,
  id,
  eventId,
  eventType = "preview",
}: Props) => {
  return (
    <>
      <Container
        display={"flex"}
        w="full"
        //maxW="50rem"
        m="0"
        flexDir="column"
        alignItems={{ base: "end", lg: "center" }}
        gap={{ base: "32px", lg: "64px" }}
        p="0"
      >
        <Tabs variant={"cubik"} alignSelf={"start"} w="full">
          <TabList
            overflowY={{ base: "hidden", md: "inherit" }}
            overflowX={{ base: "scroll", md: "inherit" }}
            gap={{ base: "24px", md: "32px" }}
          >
            <Tab>Details</Tab>
            <Tab isDisabled={eventType === "preview" ? true : false}>
              Contributors
            </Tab>
            <Tab>Discussion</Tab>
            <Tab isDisabled>Updates</Tab>
          </TabList>
          <TabPanels p="0">
            <TabPanel>
              <VStack w="full" align="start" gap="1rem">
                <VStack gap="12px" overflow="hidden" align={"start"}>
                  <DetailedDescription
                    description={longDescription as string}
                    isLoading={false}
                  />
                </VStack>
              </VStack>
            </TabPanel>
            <TabPanel overflowX="scroll">
              <Contributions id={id} eventId={eventId} eventType={eventType} />
            </TabPanel>
            <TabPanel>
              <ProjectDiscussion projectId={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};
