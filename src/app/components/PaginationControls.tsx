"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/app/components/ui/pagination";

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
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get(queryKey)) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    if (pageFromUrl !== currentPage) setCurrentPage(pageFromUrl);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromUrl]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, queryKey, searchParams, router]);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  function renderPageItems() {
    const pages = [];
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
        continue;
      }
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`?${queryKey}=${i}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
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
  }

  return (
    <>
      {renderPage(paginated)}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?${queryKey}=${currentPage - 1}`}
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
                href={`?${queryKey}=${currentPage + 1}`}
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
