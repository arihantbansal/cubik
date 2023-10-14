import {
  Box,
  CardBody,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

const GrantStepZero = () => {
  return (
    <CardBody w="full">
      <VStack
        align="start"
        spacing={{ base: "12px", sm: "18px", md: "32px" }}
        textAlign={"start"}
        w="full"
      >
        <VStack
          px={{ base: "24px", md: "34px", lg: "56px" }}
          pt={{ base: "18px", md: "28px", lg: "44px" }}
          w="full"
          align={"start"}
          spacing={{ base: "12px" }}
        >
          <Box
            as="p"
            textStyle={{
              base: "title2",
              md: "title1",
              lg: "headline2",
            }}
            color={"neutral.11"}
          >
            Welcome to Cubik Grant Round Management
          </Box>
          <Box
            as="p"
            textStyle={{
              base: "title5",
              sm: "title5",
              lg: "title2",
            }}
            color={"neutral.9"}
          >
            Embark on an empowering journey where you can establish and manage
            your own grant round.
          </Box>
        </VStack>
        <Box height="1px" w="full" backgroundColor={"#1D1F1E"} />
        <VStack
          px={{ base: "24px", md: "32px", lg: "56px" }}
          w="full"
          align="start"
        >
          <UnorderedList w="full" spacing={[1, 2, 3]}>
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title3", lg: "title2" }}
              color={"neutral.11"}
            >
              Using Cubik, you have the ability to:
            </Box>
            <ListItem>
              <Box
                textStyle={{ base: "body5", md: "body4", lg: "body3" }}
                color={"neutral.9"}
              >
                Create your own grants round tailored to your preferred funding
                methodology
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: "body5", md: "body4", lg: "body3" }}
                color={"neutral.9"}
              >
                Choose grant round period, cap the total projects, and define
                unique eligibility standards to pull in ideal projects.
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: "body5", md: "body4", lg: "body3" }}
                color={"neutral.9"}
              >
                Set up your grant round with a team to effectively oversee and
                maintain the entire process.
              </Box>
            </ListItem>
            <ListItem>
              <Box
                textStyle={{ base: "body5", md: "body4", lg: "body3" }}
                color={"neutral.9"}
              >
                Manage your matching pool funds in a multisig wallet you and
                your team controls.
              </Box>
            </ListItem>
          </UnorderedList>
        </VStack>
        <VStack
          px={{ base: "24px", md: "32px", lg: "56px" }}
          w="full"
          align="start"
        >
          <Box
            as="p"
            textStyle={{ base: "title5", md: "title3" }}
            color={"neutral.11"}
          >
            Our platform places you at the center of community engagement.
          </Box>
          <Box textStyle={{ base: "body5", md: "body3" }} color={"neutral.9"}>
            You can interface with passionate creators, select projects that
            resonate with your objectives, and manage the grant process with
            transparency and efficiency.
          </Box>
        </VStack>
        <Box
          px={{ base: "24px", md: "32px", lg: "56px" }}
          textStyle={{ base: "body5", md: "body4", lg: "body3" }}
          color={"neutral.9"}
        >
          Remember, in creating a grant round, you`re nurturing innovation,
          contributing significantly to the community, and shaping the future of
          Web3.
        </Box>
        <Box height="1px" w="full" backgroundColor={"#1D1F1E"} />
        <VStack px={{ base: "24px", md: "32px", lg: "56px" }} align={"start"}>
          <Box textStyle={{ base: "title6", md: "title3" }} color={"neutral.9"}>
            Ready to lead change?
          </Box>
        </VStack>
      </VStack>
    </CardBody>
  );
};

export default GrantStepZero;
