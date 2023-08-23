import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@/utils/chakra";
import ContributionPage from "./components/contributions/contributionTab";
import { ProjectsTab } from "./components/projects/ProjectsTab";
import { UserDetails } from "./components/user/UserDetails";
import { UserProof } from "./components/user/userProof";

interface Props {
  params: { username: string };
}
const Details = ({ params: { username } }: Props) => {
  return (
    <>
      <Tabs variant={"cubik"} isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={"0"}>
          <TabPanel p="0">
            <Flex maxW={"full"} p="0" flexDir="column" gap="40px">
              <UserDetails username={username} />
              <UserProof username={username} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              <ProjectsTab username={username} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <ContributionPage username={username} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Details;
