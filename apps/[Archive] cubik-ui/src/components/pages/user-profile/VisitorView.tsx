import { Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { ProjectVerifyStatus } from "@cubik/database";
import { FC, memo } from "react";
import { UserWithProjectType } from "~/types/user";
import ProfileHeader from "./ProfileHeader";
import UserContributions from "./contributions-tab/UserContributions";
import UserDetails from "./details-tab/UserDetails";
import { VisitorProjectEmptyState } from "./empty-states/ProjectEmptyState";
import ProjectVisitorCard from "./projects-tab/ProjectVisitorCard";

type visitorViewType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const VisitorView: FC<visitorViewType> = ({
  user,
  isLoading,
}: visitorViewType) => {
  return (
    <Flex flexDir={"column"} gap="48px">
      {/* <ProfileHeader isLoading={isLoading} user={user} /> */}
      <Tabs variant={"cubik"} isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Projects</Tab>
          <Tab>Contributions</Tab>
        </TabList>
        <TabPanels p={"0"}>
          <TabPanel p="0">
            <Flex maxW={"full"} p="0" flexDir="column" gap="40px">
              <UserDetails isLoading={isLoading} userId={user?.id as string} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex direction="column" w="full" gap="32px">
              {user &&
              user.project.filter(
                (project) => project.status === ProjectVerifyStatus.VERIFIED
              ).length ? (
                // filter verified projects only to show on user profile
                user.project
                  .filter(
                    (project) => project.status === ProjectVerifyStatus.VERIFIED
                  )
                  .map((project, key) => (
                    <ProjectVisitorCard
                      userName={user.username}
                      project={project}
                      isLoading={isLoading}
                      key={key}
                    />
                  ))
              ) : (
                <VisitorProjectEmptyState />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>{user && <UserContributions userId={user.id} />}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default memo(VisitorView);
