"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/app/components/ui/pagination";
import { usePagination } from "@/app/hooks/usePagination";

type PaginationControlsProps<T> = {
  items: T[];
  itemsPerPage: number;
  renderPage: (paginated: T[]) => React.ReactNode;
  queryKey?: string;
  onPageChange?: () => void;
};

export default function PaginationControls<T>({
  items,
  itemsPerPage,
  renderPage,
  queryKey = "page",
  onPageChange,
}: PaginationControlsProps<T>) {
  const router = useRouter();
  const {
    currentPage,
    totalPages,
    paginated,
    buildHref,
    handlePrev,
    handleNext,
  } = usePagination(items, itemsPerPage, queryKey);

  const goToPage = (i: number) => {
    onPageChange?.();
    router.push(buildHref(i), { scroll: false });
  };

  const renderPageItems = () => {
    const pages: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        (i === 2 && currentPage > 4) ||
        (i === totalPages - 1 && currentPage < totalPages - 3)
      ) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      } else if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={buildHref(i)}
              onClick={(e) => {
                e.preventDefault();
                goToPage(i);
              }}
              isActive={currentPage === i}
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pages;
  };

  if (items.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        No characters to display.
      </div>
    );
  }

  return (
    <>
      {renderPage(paginated)}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 text-white">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={buildHref(currentPage - 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      onPageChange?.();
                      handlePrev();
                    }
                  }}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : undefined}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem>
                <PaginationNext
                  href={buildHref(currentPage + 1)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) {
                      onPageChange?.();
                      handleNext();
                    }
                  }}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : undefined}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
