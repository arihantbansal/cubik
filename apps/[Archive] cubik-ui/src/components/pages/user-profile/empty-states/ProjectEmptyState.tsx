import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import Link from "next/link";
import EmptyStateHOC from "~/components/HOC/EmptyState";

export const AdminProjectEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={"neutral.3"}
      rounded="12px"
      flexDir={"column"}
    >
      <EmptyStateHOC
        heading={"Submit your Project"}
        subHeading={
          "This is where your projects will appear. Click the Submit Project button below to get started"
        }
        CTA={
          <Button
            as={Link}
            href="/submit-project"
            variant="cubikFilled"
            size={{ base: "cubikMini", md: "cubikSmall" }}
          >
            Submit a Project
          </Button>
        }
      />
    </Center>
  );
};
export const VisitorProjectEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={"neutral.3"}
      rounded="12px"
      flexDir={"column"}
    >
      <EmptyStateHOC
        heading={"No Projects"}
        subHeading={
          "This user has no projects yet. Explore other projects by clicking the button below."
        }
        CTA={
          <Button
            as={Link}
            href="/projects"
            variant={"cubikFilled"}
            size={{ base: "cubikSmall", md: "cubikMedium" }}
          >
            Explore Projects
          </Button>
        }
      />
    </Center>
  );
};

export const ProjectEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={"neutral.3"}
      rounded="12px"
      flexDir={"column"}
    >
      <EmptyStateHOC
        heading={"No Projects"}
        subHeading={
          "There is no project to view here yet. Check back after some time or refresh the page."
        }
      />
    </Center>
  );
};
