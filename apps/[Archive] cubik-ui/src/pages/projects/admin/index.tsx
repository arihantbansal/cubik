import { Box, Container, HStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Tag } from "@chakra-ui/tag";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import CustomTag from "~/components/common/tags/CustomTag";
import AllProjectsTab from "~/components/pages/projects/admin/AllProjectsTab";
import ParticipatingProjectsTab from "~/components/pages/projects/admin/ParticipatingProjectsTab";
import RejectedProjectsTab from "~/components/pages/projects/admin/RejectedProjectsTab";
import ReviewProjectsTab from "~/components/pages/projects/admin/ReviewProjectsTab";
import VerifiedProjectsTab from "~/components/pages/projects/admin/VerifiedProjectsTab";
import { useUserStore } from "~/store/userStore";

const AdminWallet = ["52atj3jAYAq33rdDi4usSNpAozFF1foPTuyw8vkD6mtQ"];

const ProjectAuthenticationRoute = () => {
  const { publicKey, connected } = useWallet();
  const { user } = useUserStore();
  const [projectsNumberByStatus, setProjectsNumberByStatus] = useState({
    all: 0,
    review: 0,
    verified: 0,
    rejected: 0,
    participating: 0,
  });

  if (!connected) {
    return null;
  }

  if (!user?.mainWallet || user?.mainWallet !== publicKey?.toBase58()) {
    return null;
  }

  if (!AdminWallet.includes(publicKey?.toBase58() as string)) {
    return null;
  }

  return (
    <>
      <Container maxW="7xl" py="40px">
        <HStack w="full" align="start" pb="32px">
          <Box
            as="p"
            whiteSpace={"nowrap"}
            textStyle="title2"
            color="neutral.11"
          >
            Projects
          </Box>
          <CustomTag>Admin</CustomTag>
        </HStack>
        <Tabs variant={"cubik"} alignSelf={"start"} w="full">
          <TabList
            overflowY={{ base: "hidden", md: "inherit" }}
            overflowX={{ base: "scroll", md: "inherit" }}
            gap={{ base: "0.5rem", md: "1rem" }}
          >
            <Tab boxShadow={"none"} gap="8px" display={"flex"}>
              <Box
                as="p"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title5", md: "title4" }}
              >
                All Projects
              </Box>
              <Tag rounded="full" variant="colorful">
                {projectsNumberByStatus.all}
              </Tag>
            </Tab>
            <Tab boxShadow={"none"} gap="8px" display={"flex"}>
              <Box
                as="p"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title5", md: "title4" }}
              >
                Under Review
              </Box>
              <Tag
                rounded="full"
                variant="colorful"
                color="#FFF066"
                bg="#2D2A14"
              >
                {projectsNumberByStatus.review}
              </Tag>
            </Tab>
            <Tab boxShadow={"none"} gap="8px" display={"flex"}>
              <Box
                as="p"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title5", md: "title4" }}
              >
                Verified
              </Box>
              <Tag
                rounded="full"
                variant="colorful"
                color="#7ABAFF"
                bg="#1B2127"
              >
                {projectsNumberByStatus.verified}
              </Tag>
            </Tab>
            <Tab boxShadow={"none"} gap="8px" display={"flex"}>
              <Box
                as="p"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title5", md: "title4" }}
              >
                Rejected
              </Box>
              <Tag
                rounded="full"
                variant="colorful"
                color="#FF1F1F"
                bg="#3b1515"
              >
                {projectsNumberByStatus.rejected}
              </Tag>
            </Tab>
            <Tab boxShadow={"none"} gap="8px" display={"flex"}>
              <Box
                as="p"
                whiteSpace={"nowrap"}
                textStyle={{ base: "title5", md: "title4" }}
              >
                Participating
              </Box>
              <Tag
                rounded="full"
                variant="colorful"
                color="#D196FF"
                bg="#2E2039"
              >
                {projectsNumberByStatus.participating}
              </Tag>
            </Tab>
          </TabList>
          <TabPanels p="0">
            <TabPanel>
              <AllProjectsTab
                setProjectsNumberByStatus={setProjectsNumberByStatus}
              />
            </TabPanel>
            <TabPanel>
              <ReviewProjectsTab
                setProjectsNumberByStatus={setProjectsNumberByStatus}
              />
            </TabPanel>
            <TabPanel>
              <VerifiedProjectsTab
                setProjectsNumberByStatus={setProjectsNumberByStatus}
              />
            </TabPanel>
            <TabPanel>
              <RejectedProjectsTab
                setProjectsNumberByStatus={setProjectsNumberByStatus}
              />
            </TabPanel>
            <TabPanel>
              <ParticipatingProjectsTab
                setProjectsNumberByStatus={setProjectsNumberByStatus}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default ProjectAuthenticationRoute;
