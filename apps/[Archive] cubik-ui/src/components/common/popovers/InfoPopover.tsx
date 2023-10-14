import {
  Box,
  Center,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiInfo } from "react-icons/fi";

export const AmountReceivedPopover = () => {
  return (
    <Center position="relative">
      <Popover variant="cubik" trigger="hover">
        <PopoverTrigger>
          <Center>
            <FiInfo size={16} color="#3B3D3D" />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
              color="white"
            >
              Amount Received
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <Box as="p" textStyle={{ base: "body6", md: "title7" }}>
              The final sum that a project receives will consist of an estimated
              match from the shared pool ( based on your contribution ) + the
              original contribution amount you will contribute.
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};
export const CubikMatchingPoolDonationPopover = () => {
  return (
    <Center position="relative">
      <Popover variant="cubik" trigger="hover">
        <PopoverTrigger>
          <Center>
            <FiInfo size={16} color="#3B3D3D" />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
              color="white"
            >
              Cubik Matching Pool
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <Box as="p" textStyle={{ base: "body6", md: "title7" }}>
              Cubik Matching Pool serves as the reservoir that multiplies the
              impact of community donations in each funding round. This
              percentage is the amount from your contribution that will be
              allocated to matching grants in upcoming rounds.
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};
export const InfoPopover = () => {
  return (
    <Center position="relative">
      <Popover variant="cubik">
        <PopoverTrigger>
          <Center>
            <FiInfo size={16} color="#3B3D3D" />
          </Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Box
              as="p"
              textStyle={{ base: "title5", md: "title4" }}
              color="white"
            >
              Verified Projects
            </Box>
          </PopoverHeader>
          <PopoverBody>
            <Box as="p" textStyle={{ base: "body6", md: "body5" }}>
              Verified Projects eligible for participating in any Quadratic
              Funding resource distribution event.
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Center>
  );
};
