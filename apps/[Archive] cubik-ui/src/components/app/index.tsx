import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AuthWrapper } from "~/context/authWrapper";
import NavbarCTA from "./NavbarCTA";
import { useRouter } from "next/router";
import { Header } from "./navigation/navbar/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { hackathon_slug } = router.query;
  const mtValue = hackathon_slug ? "0" : { base: "4.2rem", md: "5.2rem" };

  return (
    <Container maxW="full" p="0">
      <AuthWrapper>
        <Header>
          <NavbarCTA />
        </Header>
        <Container mt={mtValue} maxW="full" p="0" h="100%">
          {children}
        </Container>
      </AuthWrapper>
    </Container>
  );
};

export default AppLayout;
