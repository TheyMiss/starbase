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
};

export default function PaginationControls<T>({
  items,
  itemsPerPage,
  renderPage,
  queryKey = "page",
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
                router.push(buildHref(i), { scroll: false });
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

  return (
    <>
      {renderPage(paginated)}
      <div className="flex justify-center mt-8 text-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={buildHref(currentPage - 1)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePrev();
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
                  handleNext();
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
    </>
  );
}
