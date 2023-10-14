import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import GetFormattedLink from "~/components/HOC/GetLink";

const ProjectRoundManagerCardPendingStatus = ({
  projectJoinRound,
  setProjectToBeAccepted,
  setProjectToBeRejected,
  onRejectModelClose,
  onRejectModelOpen,
  onAcceptModelClose,
  onAcceptModalOpen,
}: any) => {
  return (
    <Card
      key={projectJoinRound.project.id}
      border="none"
      px="24px"
      pt={{ base: "16px", sm: "20px", md: "24px" }}
      pb={{ base: "16px", sm: "20px", md: "24px" }}
      gap={{ base: "16px", sm: "20px", md: "24px" }}
      w="100%"
    >
      <CardBody>
        <Stack
          direction={{ base: "column", sm: "row" }}
          px={""}
          gap={"12px"}
          w="full"
        >
          <Stack
            w="full"
            direction="row"
            gap={{ base: "8px", sm: "12px", md: "16px" }}
          >
            <Center>
              <Avatar
                src={projectJoinRound.project.logo}
                name={projectJoinRound.project.name}
                width={{ base: "36px", sm: "48px", md: "52px" }}
                height={{ base: "36px", sm: "48px", md: "52px" }}
              />
            </Center>
            <VStack
              alignItems={"start"}
              align={"center"}
              justify="center"
              spacing={{ base: "2px", sm: "4px", md: "6px" }}
            >
              <Box
                as="p"
                textStyle={{
                  base: "title4",
                  sm: "title3",
                  md: "title2",
                }}
                noOfLines={1}
                textAlign="left"
                color="white"
              >
                {projectJoinRound.project.name}
              </Box>
              <GetFormattedLink link={projectJoinRound.project.project_link} />
            </VStack>
          </Stack>
          <HStack justifyContent={"end"}>
            <Button
              w="fit-content"
              variant={"cubikFilled"}
              h="full"
              size={{ base: "cubikMini", md: "cubikSmall" }}
              onClick={() => {
                setProjectToBeRejected(projectJoinRound.project);
                onRejectModelOpen();
              }}
            >
              View Details
            </Button>
            <Button
              w="fit-content"
              variant={"cubikReject"}
              size={{ base: "cubikMini", md: "cubikSmall" }}
              onClick={() => {
                setProjectToBeRejected(projectJoinRound.project);
                onRejectModelOpen();
              }}
            >
              <Box
                as={RxCross2}
                color="#ADB8B6"
                boxSize={{ base: "18px", md: "26px" }}
              />
            </Button>
            <Button
              w="fit-content"
              variant={"cubikAccept"}
              size={{ base: "cubikMini", md: "cubikSmall" }}
              onClick={() => {
                setProjectToBeAccepted(projectJoinRound.project);
                onAcceptModalOpen();
              }}
            >
              <Box
                as={BiCheck}
                color="#31F579"
                boxSize={{ base: "18px", md: "26px" }}
              />
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProjectRoundManagerCardPendingStatus;
