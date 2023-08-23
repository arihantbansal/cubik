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
// import { FiInfo } from "react-icons/fi";

export const AmountReceivedPopover = () => {
  return (
    <Center position="relative">
      <Popover variant="cubik" trigger="hover">
        <PopoverTrigger>
          <Box h={6} w={6}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#3B3D3D"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </Box>
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
          <Center>{/* <FiInfo size={16} color="#3B3D3D" /> */}</Center>
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
          <Center>{/* <FiInfo size={16} color="#3B3D3D" /> */}</Center>
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
