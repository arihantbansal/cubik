import { Container } from "@/utils/chakra";
import React from "react";
// const Form = dynamic(() => import("./components/Form"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });
import Form from "./components/Form";
import dynamic from "next/dynamic";

const CreateProjectPage = () => {
  return (
    <>
      <Container
        transition="all .25s ease"
        maxW="7xl"
        p={{ base: "1rem", md: "0" }}
        my={{ base: "2rem", md: "5rem", lg: "6rem", xl: "8rem" }}
        outline="none"
      >
        <Form />
      </Container>
    </>
  );
};

export default CreateProjectPage;
