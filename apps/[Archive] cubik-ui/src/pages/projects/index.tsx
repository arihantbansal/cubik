import { Container } from "@chakra-ui/layout";
import axios from "axios";
import { GetStaticProps } from "next";
import SEO from "~/components/SEO";
import ProjectsExplorer from "~/components/pages/projects/project-explorer/ProjectsExplorer";
import { env } from "~/env.mjs";
import { explorerType } from "@cubik/common-types";

const Projects = (props: explorerType) => {
  console.log("props -", props);
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
        <ProjectsExplorer projects={props.projects} banner={props.banner} />
      </Container>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await axios.get<explorerType>(
      env.NEXT_PUBLIC_BACKEND + "/api/v1/project/explorer"
    );
    return {
      props: res.data,
      revalidate: 5,
    };
  } catch (e) {
    return {
      props: {
        data: [],
      },
      revalidate: 5,
    };
  }
};
export default Projects;
