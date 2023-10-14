import {
  Button,
  HStack,
  IconButton,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePagination } from "~/hooks/usePagination";
type PaginationProps = {
  currentPage: number;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  siblingCount,
  pageSize,
  onPageChange,
  totalPages,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange) {
    return null;
  }

  const onNext = () => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
      return;
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage < 1) {
      onPageChange(1);
      return null;
    }
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const DOTS = "...";
  return (
    <HStack p={{ base: "0px", md: "12px 32px" }} align={"center"} justify="end">
      <UnorderedList>
        <IconButton
          variant={"unstyled"}
          background={"transparent"}
          rounded="full"
          width="2.5rem"
          height="2.5rem"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={onPrevious}
          disabled={currentPage === 1}
          icon={<HiChevronLeft size={28} color="white" />}
          aria-label={"left icon"}
          _hover={{
            background: "#ffffff20",
          }}
          _disabled={{
            cursor: "not-allowed",
            opacity: 0.4,
          }}
        />
      </UnorderedList>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <UnorderedList key={i}>...</UnorderedList>;
        }
        return (
          <OrderedList key={i}>
            <Button
              variant={"unstyled"}
              background={"transparent"}
              rounded="full"
              width="2.5rem"
              height="2.5rem"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              color={pageNumber === currentPage ? "white" : "neutral.7"}
              backgroundColor={
                pageNumber === currentPage ? "#14665B" : "transparent"
              }
              onClick={() => onPageChange(Number(pageNumber))}
              _hover={{
                cursor: "disabled",
                backgroundColor:
                  pageNumber === currentPage ? "#14665B" : "#ffffff20",
              }}
            >
              {pageNumber}
            </Button>
          </OrderedList>
        );
      })}
      <OrderedList>
        <IconButton
          variant={"unstyled"}
          background={"transparent"}
          rounded="full"
          width="2.5rem"
          height="2.5rem"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={onNext}
          disabled={currentPage === lastPage}
          icon={<HiChevronRight size={28} color="white" />}
          aria-label={"right icon"}
          _hover={{
            background: "#ffffff20",
          }}
          _disabled={{
            cursor: "not-allowed",
            opacity: 0.4,
          }}
        />
      </OrderedList>
    </HStack>
  );
};

export default Pagination;
