import { Box, Center, HStack } from "@chakra-ui/layout";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomTag from "~/components/common/tags/CustomTag";

const CustomTagsContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hiddenTags, setHiddenTags] = useState(0);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const updateHiddenTags = useCallback(() => {
    if (!containerWidth || !tagsRef.current) return;

    let tagsWidth = 0;
    let hiddenCount = 0;

    tagsRef.current.forEach((tag, index) => {
      if (tag) {
        if (tagsWidth + tag.offsetWidth + tag.offsetLeft > containerWidth) {
          tag.style.display = "none";
          hiddenCount++;
        } else {
          tag.style.display = "inline-block";
          tagsWidth += tag.offsetWidth;
        }
      }
    });

    setHiddenTags(hiddenCount);
  }, [containerWidth]);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(containerElement);

      return () => {
        resizeObserver.unobserve(containerElement);
      };
    }
  }, []);

  useEffect(() => {
    updateHiddenTags();
  }, [containerWidth, updateHiddenTags]);

  return (
    <Box position="relative" ref={containerRef}>
      <Box w="fit-content" maxW="13rem" overflow="hidden">
        <HStack w={containerWidth ? `${containerWidth}px` : "auto"}>
          <CustomTag ref={(el) => (tagsRef.current[0] = el)}>
            Youtube Content
          </CustomTag>
          <CustomTag ref={(el) => (tagsRef.current[1] = el)}>
            Solana Infrastructure
          </CustomTag>
          <CustomTag ref={(el) => (tagsRef.current[2] = el)}>dapp</CustomTag>
        </HStack>
      </Box>
      {hiddenTags > 0 && (
        <Center
          rounded="full"
          backgroundColor="#1D1F1E"
          fontSize="xs"
          p="8px 12px"
          position="absolute"
          mx={1}
          top="0"
          right="8"
          zIndex="1"
          color="#D7E0DF"
          textStyle={{ base: "body6", md: "body5" }}
        >
          +{hiddenTags}
        </Center>
      )}
    </Box>
  );
};

export default CustomTagsContainer;
