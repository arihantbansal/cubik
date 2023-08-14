"use client";
import { Container } from "@/utils/chakra";
import React from "react";

import Form from "./components/Form";

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
