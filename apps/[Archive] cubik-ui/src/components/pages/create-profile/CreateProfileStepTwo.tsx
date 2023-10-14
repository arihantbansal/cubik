import { Box, Button, CardBody, CardFooter, VStack } from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getURL } from "~/utils/getURL";
import { supabase, useUser } from "~/utils/supabase";
import { trpc } from "~/utils/trpc";

const CreateProfileStepTwo = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const { user } = useUser(supabase);
  const [emailUnique, setEmailUnique] = useState<boolean>(false);

  const checkEmailMutation = trpc.user.checkEmail.useMutation();
  const handleClick = async () => {
    const a = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `https://devnet.cubik.so/create-profile`,
      },
    });
  };

  useEffect(() => {
    const checkEmail = async () => {
      if (user?.data?.user?.email) {
        const res = await checkEmailMutation.mutateAsync({
          email: user?.data?.user?.email,
        });
        setEmailUnique(res);
      }
    };
    checkEmail();
  }, [user?.data?.user?.email]);

  return (
    <>
      <CardBody>
        <VStack py="16px" spacing="12px" w="full" align="start">
          <Button
            w="full"
            size={{ base: "cubikMini", md: "cubikSmall" }}
            variant="cubikOutlined"
            loadingText="Submitting"
            leftIcon={
              <Box as={BsGoogle} boxSize={{ base: "12px", md: "13px" }} />
            }
            onClick={() => {
              handleClick();
            }}
          >
            {user?.data?.user?.email
              ? user?.data?.user?.email
              : "Connect Google"}
          </Button>
          {user?.data.user?.email && (
            <Box
              display={emailUnique ? "none" : "block"}
              as="p"
              textStyle={{ base: "body5", md: "body4" }}
              color="surface.red.2"
            >
              *Email belongs to a different account. Connect different Google
              Account.
            </Box>
          )}
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          size={{ base: "cubikMini", md: "cubikSmall" }}
          variant={"cubikText"}
          leftIcon={<Box as={FiChevronLeft} width={5} height={5} />}
          onClick={async () => {
            onPrevious();
          }}
        >
          Previous
        </Button>
        <Button
          size={{ base: "cubikMini", md: "cubikSmall" }}
          variant="cubikFilled"
          loadingText="Submitting"
          isDisabled={!emailUnique}
          rightIcon={
            <Box as={FiChevronRight} boxSize={["10px", "12px", "16px"]} />
          }
          onClick={() => onNext()}
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
};

export default CreateProfileStepTwo;
