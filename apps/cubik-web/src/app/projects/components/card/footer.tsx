// "use client";
// import Contributors from "./contributors";
// import {
//   Box,
//   Button,
//   HStack,
//   SlideFade,
//   VStack,
//   useMediaQuery,
// } from "@/utils/chakra";
// import CustomTag from "@/app/components/common/tags/CustomTag";

// const Footer = ({
//   isHovered = true,
//   industry,
// }: {
//   isHovered: boolean;
//   industry: {
//     label: string;
//     value: string;
//   }[];
//   contributors;
// }) => {
//   const [isLargerThan767] = useMediaQuery("(min-width: 767px)");

//   return (
//     <VStack
//       marginTop={"0px !important"}
//       p="8px 24px 24px 24px"
//       w="full"
//       position={"relative"}
//     >
//       <HStack
//         display={isLargerThan767 && isHovered ? "none" : "flex"}
//         overflowX="hidden"
//         w="full"
//         justify="space-between"
//       >
//         <Box
//           overflow="hidden"
//           w="full"
//           flex="4"
//           minWidth="0"
//           position="relative"
//           _after={{
//             content: '""',
//             position: "absolute",
//             top: "45%",
//             right: "0%",
//             transform: "translateY(-50%)",
//             height: "2.2rem",
//             width: "3rem",
//             background: "linear-gradient(90deg, #0C0D0D00 0%, #0C0D0D 80%)",
//           }}
//         >
//           <HStack
//             overflow="clip"
//             w="200%"
//             mt="auto"
//             justify="start"
//             whiteSpace="nowrap" // Set whiteSpace to nowrap
//           >
//             {industry.map((tag, key) => {
//               return (
//                 <CustomTag color={tag.label} key={key}>
//                   {tag.label}
//                 </CustomTag>
//               );
//             })}
//           </HStack>
//         </Box>

//         <Contributors {...contributors} />
//       </HStack>
//       {isLargerThan767 && (
//         <SlideFade in={isHovered} offsetY="0px" reverse>
//           <HStack
//             zIndex={"9"}
//             w="full"
//             justifyContent="start"
//             position="absolute"
//             left="0"
//             p="8px 24px 24px 24px"
//             bottom="0px"
//             backgroundColor={isHovered ? "neutral.3" : "#0C0D0D"}
//             borderRadius="36px"
//             justify={"space-between"}
//           >
//             <Button
//               background={"#1D1F1E"}
//               color="white"
//               fontWeight={"700"}
//               borderColor="transparent"
//               outline="none"
//               //  w="calc(100% - 2.2rem)"
//               w="calc(100% )"
//               variant="connect_wallet"
//             >
//               View Details
//             </Button>
//             {/* <IconButton
//                   background={'#1D1F1E'}
//                   color="white"
//                   fontWeight={'700'}
//                   borderColor="transparent"
//                   outline="none"
//                   onClick={handleAddOrRemoveProject}
//                   aria-label="link"
//                   variant="connect_wallet"
//                   icon={
//                     addedToList ? <MdRemove size={26} /> : <BsPlus size={26} />
//                   }
//                 /> */}
//           </HStack>
//         </SlideFade>
//       )}
//     </VStack>
//   );
// };

// export default Footer;
