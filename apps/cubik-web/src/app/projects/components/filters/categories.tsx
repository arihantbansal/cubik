"use client";
import { useRef, useState } from "react";
// import CategoryTag from '~/components/common/tags/CategoryTags';
import CategoryTag from "@/app/components/common/tags/CategoryTags";
import { Box, Center, HStack } from "@/utils/chakra";
import { Project } from "..";
import { RxCross1 } from "react-icons/rx";

export interface Category {
  value:
    | "all"
    | "defi"
    | "solana_infrastructure"
    | "sdk"
    | "consumer"
    | "developer_tools";
  label: string;
}

const Categories = ({
  _projects,
  projects,
  setProjects,
}: {
  _projects: Project[];
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}) => {
  const [category, setCategory] = useState<Category["value"]>("all");
  const categories: Category[] = [
    {
      value: "all",
      label: "All Projects",
    },
    { value: "defi", label: "defi" },
    { value: "solana_infrastructure", label: "Solana Infrastructure" },
    { value: "sdk", label: "SDK" },
    { value: "consumer", label: "Consumer" },
    { value: "developer_tools", label: "Developer Tools" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const changeCategory = (category: Category["value"]) => {
    setCategory(category);

    if (category === "all") {
      setProjects(_projects);
      return;
    }

    const filteredProjects = _projects.filter(({ industry }) => {
      return industry.some(({ value }) => {
        console.log(value, category);
        return value === category;
      });
    });

    setProjects(filteredProjects);
  };

  return (
    <HStack
      py="40px"
      ref={scrollRef}
      overflow="clip"
      w="full"
      justify="start"
      whiteSpace="nowrap"
      position={"relative"}
      _after={{
        content: '""',
        position: "absolute",
        top: "45%",
        right: "0%",
        transform: "translateY(-50%)",
        height: { base: "2.2rem", md: "3rem" },
        width: "3rem",
        background: "linear-gradient(90deg, #0C0D0D00 0%, #000 80%)",
      }}
    >
      {/* <Center as="button" color="#ADB8B6" onClick={() => changeCategory("all")}>
        <CategoryTag isSelected={true}>All Projects</CategoryTag>
      </Center> */}

      {category !== "all" ? (
        <>
          <Center
            cursor="pointer"
            rounded="full"
            px="12px"
            py="12px"
            bg="#010F0D"
            color="#ADB8B6"
            _hover={{
              color: "#14665B",
              bg: "#E0FFFD",
            }}
            onClick={() => {
              changeCategory("all");
            }}
          >
            <Box
              as={RxCross1}
              boxSize={["12px", "14px", "18px"]}
              color="#626665"
            />
          </Center>
          <CategoryTag isSelected={true}>{category}</CategoryTag>
        </>
      ) : (
        <>
          {categories.map(({ label, value }) => (
            <Center
              key={value}
              as="button"
              color="#ADB8B6"
              onClick={() => changeCategory(value)}
            >
              <CategoryTag isSelected={category === value}>{label}</CategoryTag>
            </Center>
          ))}
        </>
      )}
    </HStack>
  );
};

export default Categories;
