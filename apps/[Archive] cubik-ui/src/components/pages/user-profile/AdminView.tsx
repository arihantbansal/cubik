import { Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { ProjectsModel } from "@cubik/database";
import { FC, Key } from "react";
import { useErrorBoundary } from "~/hooks/useErrorBoundary";
import { UserProof, UserWithProjectType } from "~/types/user";
import ProfileHeader from "./ProfileHeader";
import UserContributions from "./contributions-tab/UserContributions";
import UserDetails from "./details-tab/UserDetails";
import UserProofs from "./details-tab/UserProofs";
import { AdminProjectEmptyState } from "./empty-states/ProjectEmptyState";
import ProjectAdminCard from "./projects-tab/ProjectAdminCard";

type adminViewType = {
  user: UserWithProjectType | null | undefined;
  isLoading: boolean;
};

const AdminView: FC<adminViewType> = ({ user, isLoading }: adminViewType) => {
  const { ErrorBoundaryWrapper } = useErrorBoundary();

  return (
    <ErrorBoundaryWrapper>
      <Flex
        overflow={"none"}
        w={"full"}
        flexDir={"column"}
        gap={{ base: "32px", sm: "40px", md: "56px" }}
      >
        {/* <ProfileHeader isLoading={isLoading} user={user} /> */}
        <Tabs variant={"cubik"}>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Projects</Tab>
            <Tab>Contributions</Tab>
          </TabList>
          <TabPanels p={"0"}>
            <TabPanel w="full">
              <Flex
                gap={{ base: "24px", md: "32px" }}
                w={"full"}
                p="0"
                flexDir="column"
              >
                <UserDetails
                  userId={user?.id as string}
                  isLoading={isLoading}
                />
                <UserProofs
                  wallet={user?.mainWallet as string}
                  isLoading={isLoading}
                  proofs={user?.proof as unknown as UserProof[]}
                />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                direction="column"
                w="full"
                gap={{ base: "24px", md: "32px" }}
              >
                {user?.project.length ? (
                  user?.project.map(
                    (project: ProjectsModel, key: Key | null | undefined) => {
                      return !project.isArchive ? (
                        <ProjectAdminCard project={project} key={key} />
                      ) : (
                        <></>
                      );
                    }
                  )
                ) : (
                  <AdminProjectEmptyState />
                )}
              </Flex>
            </TabPanel>
            <TabPanel w="full">
              <UserContributions userId={user?.id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ErrorBoundaryWrapper>
  );
};

export default AdminView;
