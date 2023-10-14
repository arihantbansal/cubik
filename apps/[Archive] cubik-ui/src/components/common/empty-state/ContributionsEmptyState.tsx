import { Button, Center } from "@chakra-ui/react";
import EmptyStateHOC from "~/components/HOC/EmptyState";
import Link from "next/link";

const ContributionsEmptyState = () => {
  return (
    <Center
      w="full"
      border="1px dashed"
      borderColor={"neutral.3"}
      rounded="12px"
    >
      <EmptyStateHOC
        heading={"No Contributions Yet"}
        subHeading={
          "This project hasn`t received any contributions yet. Be the first to support this project!"
        }
        CTA={
          <Link href="/projects">
            <Button
              variant="cubikFilled"
              size={{ base: "cubikMini", md: "cubikSmall" }}
            >
              Make a contribution
            </Button>{" "}
          </Link>
        }
      />
    </Center>
  );
};

export default ContributionsEmptyState;
