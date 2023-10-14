import { Container } from "@chakra-ui/layout";
import React from "react";
import SEO from "~/components/SEO";
import AdminControls from "~/components/pages/projects/admin/AdminControls";

const Admin = () => {
  return (
    <>
      <SEO
        title={`Projects - Cubik`}
        description={`Browse projects and Cubik and support them`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1684179451/cubik%20og.png`}
      />
      <Container
        px={{ base: "0.6rem", sm: "0.8rem", md: "2rem", xl: "0px" }}
        maxW="7xl"
        py={{ base: "24px", md: "40px" }}
      >
        <AdminControls />
      </Container>
    </>
  );
};

export default Admin;
