// "use client";

// import ComponentErrors from "@/app/components/common/errors/componentErrors";
// import { useUser } from "@/app/context/user";
// import {
//   Center,
//   VStack,
//   HStack,
//   Avatar,
//   FormControl,
//   Skeleton,
//   InputGroup,
//   Input,
//   InputRightAddon,
//   FormErrorMessage,
//   Button,
//   SkeletonCircle,
//   SkeletonText,
//   Box,
// } from "@/utils/chakra";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// export const ProjectDiscussion = ({
//   ownerName,
//   projectId,
// }: {
//   ownerName: string;
//   projectId: string;
// }) => {
//   const { setVisible } = useWalletModal();
//   const { user } = useUser();
//   const { publicKey } = useWallet();
//   const [loadMoreComments, setLoadMoreComments] = useState<getCommentType[]>(
//     []
//   );
//   const [cannotLoadMore, setCannotLoadMore] = useState<boolean>(false);
//   const [counter, setCounter] = useState<number>(0);

//   const {
//     handleSubmit,
//     register,
//     reset,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const utils = trpc.useContext();
//   // get all the comments
//   const {
//     data: comments,
//     isLoading: commentsIsLoading,
//     isError: commentsIsError,
//   } = trpc.comment.getComments.useQuery({
//     id: projectId,
//   });

//   // create a new comment
//   const createComment = trpc.comment.createComment.useMutation({
//     onSuccess: (data) => {
//       utils.comment.getComments.invalidate({ id: projectId });
//     },
//   });
//   // load more comments
//   const loadMoreCommentsMutation = trpc.comment.getCommetsLoadMore.useMutation({
//     onSuccess: (data) => {
//       setLoadMoreComments([...loadMoreComments, ...data]);
//       if (data.length === 0) {
//         setCannotLoadMore(true);
//       }
//     },
//   });

//   function onSubmit(values: { comment: any }) {
//     if (!publicKey) {
//       setVisible(true);
//       return;
//     }
//     // createComment.mutate({
//     //   id: uuid(),
//     //   project: projectId,
//     //   comment: values.comment,
//     // });

//     reset();
//   }

//   if (commentsIsError) {
//     return (
//       <Center
//         w="full"
//         py={{ base: "16px", sm: "24px" }}
//         border="1px dashed"
//         borderColor={"#1D1F1E"}
//         rounded="12px"
//       >
//         <ComponentErrors />
//       </Center>
//     );
//   }

//   return (
//     <VStack gap={{ base: "12px", md: "24px" }} w="full" align="start">
//       <form
//         // @ts-ignore
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ width: "100%" }}
//       >
//         <HStack w={"full"} gap="8px" align="top">
//           {user && (
//             <Avatar
//               //  borderRadius={{ base: '4px', md: '8px' }}
//               width={{ base: "38px", md: "40px" }}
//               height={{ base: "38px", md: "40px" }}
//               src={user?.profilePicture}
//             />
//           )}
//           <FormControl isInvalid={Boolean(errors.comment)}>
//             <Skeleton
//               isLoaded={!commentsIsLoading}
//               w="full"
//               opacity={commentsIsLoading ? 0.2 : 1}
//             >
//               <InputGroup>
//                 <Input
//                   id="comment"
//                   placeholder="write a comment"
//                   color={
//                     watch("comment")?.length > 200
//                       ? "surface.red.2"
//                       : "neutral.9"
//                   }
//                   _hover={{
//                     color:
//                       watch("comment")?.length > 200
//                         ? "surface.red.2"
//                         : "neutral.9",
//                   }}
//                   type="text"
//                   {...register("comment", {
//                     required: "This is required",
//                     minLength: {
//                       value: 1,
//                       message: "Minimum length should be 1",
//                     },
//                     maxLength: {
//                       value: 320,
//                       message: "Maximum length should be 320",
//                     },
//                   })}
//                 />{" "}
//                 <InputRightAddon>
//                   <Center minW={"3rem"}>
//                     <Box
//                       as="p"
//                       fontSize={{ base: "10px", md: "12px" }}
//                       color={
//                         watch("comment")?.length > 320
//                           ? "surface.red.2"
//                           : watch("comment")?.length > 0
//                           ? "surface.green.2"
//                           : "neutral.7"
//                       }
//                       fontWeight={"600"}
//                     >
//                       {watch("comment")
//                         ? watch("comment").length + "/320"
//                         : "0/320"}
//                     </Box>
//                   </Center>
//                 </InputRightAddon>
//               </InputGroup>{" "}
//             </Skeleton>

//             {errors && (
//               <FormErrorMessage>
//                 <>{errors?.comment && errors?.comment.message}</>
//               </FormErrorMessage>
//             )}
//           </FormControl>{" "}
//           <Skeleton
//             isLoaded={!commentsIsLoading}
//             opacity={commentsIsLoading ? 0.15 : 1}
//             fadeDuration={2}
//             h="100%"
//           >
//             <Button
//               w="6rem"
//               h="2.55rem"
//               variant={"cubikFilled"}
//               size={"cubikMini"}
//               isLoading={isSubmitting}
//               type="submit"
//             >
//               Post
//             </Button>
//           </Skeleton>
//         </HStack>{" "}
//       </form>
//       <VStack gap="8px" align={"start"} w={"full"}>
//         {comments ? (
//           comments?.map((el) => {
//             return (
//               <CommentComponent ownerName={ownerName} key={el.id} el={el} />
//             );
//           })
//         ) : (
//           <>
//             <HStack
//               w="full"
//               align={"start"}
//               spacing={{ base: "12px", md: "16px" }}
//             >
//               <SkeletonCircle
//                 opacity={0.5}
//                 borderRadius={{ base: "4px", md: "8px" }}
//                 width={{ base: "2rem", md: "3.5rem" }}
//                 height={{ base: "2rem", md: "3.5rem" }}
//               />
//               <VStack align={"start"} w="full" spacing="1rem">
//                 <HStack>
//                   <Skeleton w="8rem" h="1rem" opacity={0.4} />
//                   <Skeleton w="4rem" h="1rem" opacity={0.2} />
//                 </HStack>
//                 <SkeletonText
//                   skeletonHeight="12px"
//                   spacing="3"
//                   w="full"
//                   noOfLines={2}
//                   opacity={0.4}
//                 />
//               </VStack>
//             </HStack>
//             <HStack
//               w="full"
//               align={"start"}
//               spacing={{ base: "12px", md: "16px" }}
//             >
//               <SkeletonCircle
//                 opacity={0.5}
//                 borderRadius={{ base: "4px", md: "8px" }}
//                 width={{ base: "2rem", md: "3.5rem" }}
//                 height={{ base: "2rem", md: "3.5rem" }}
//               />
//               <VStack align={"start"} w="full" spacing="1rem">
//                 <HStack>
//                   <Skeleton w="8rem" h="1rem" opacity={0.4} />
//                   <Skeleton w="4rem" h="1rem" opacity={0.2} />
//                 </HStack>
//                 <SkeletonText
//                   spacing="3"
//                   skeletonHeight="12px"
//                   w="full"
//                   noOfLines={2}
//                   opacity={0.4}
//                 />
//               </VStack>
//             </HStack>
//           </>
//         )}
//         {loadMoreComments?.map((el) => {
//           const date = new Date(el?.createdAt);
//           return <CommentComponent ownerName={ownerName} key={el.id} el={el} />;
//         })}
//       </VStack>
//       {comments?.length ? (
//         !cannotLoadMore &&
//         comments?.length > 10 && (
//           <Skeleton
//             isLoaded={!commentsIsLoading}
//             opacity={commentsIsLoading ? 0.1 : 1}
//             fadeDuration={2}
//             w="full"
//           >
//             <Button
//               variant="cubikOutlined"
//               size={{ base: "cubikSmall", md: "cubikMedium" }}
//               //px="0 !important"
//               //py="0 !important"
//               _hover={{
//                 bg: "transparent",
//               }}
//               rightIcon={
//                 <Box as={BiChevronDown} boxSize={{ base: "2px", md: "22px" }} />
//               }
//               onClick={() => {
//                 loadMoreCommentsMutation.mutate({
//                   id: projectId,
//                   page: counter + 1,
//                 });
//                 setCounter(counter + 1);
//               }}
//               w="full"
//             >
//               Load more
//             </Button>
//           </Skeleton>
//         )
//       ) : (
//         <Skeleton
//           isLoaded={!commentsIsLoading}
//           opacity={commentsIsLoading ? 0.1 : 1}
//           fadeDuration={2}
//           w="full"
//         >
//           <NoComments />
//         </Skeleton>
//       )}
//     </VStack>
//   );
// };
