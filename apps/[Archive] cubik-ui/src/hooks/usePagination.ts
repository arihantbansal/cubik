import { useMemo } from "react";

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount: number;
};

export const DOTS = "...";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: PaginationProps): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // If currentPage is out of range, return an empty pagination range
    if (currentPage < 1 || currentPage > totalPageCount) {
      return [];
    }

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return [...Array(totalPageCount)].map((_, idx) => idx + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = [...Array(3 + 2 * siblingCount)].map(
        (_, idx) => idx + 1
      );
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = [...Array(3 + 2 * siblingCount)].map(
        (_, idx) => idx + totalPageCount - 3 - 2 * siblingCount + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = [
        ...Array(rightSiblingIndex - leftSiblingIndex + 1),
      ].map((_, idx) => idx + leftSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
