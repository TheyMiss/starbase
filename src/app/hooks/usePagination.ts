"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  queryKey = "page"
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get(queryKey)) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromUrl]);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, String(currentPage));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, queryKey, searchParams, router]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, String(page));
    return `?${params.toString()}`;
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return {
    currentPage,
    totalPages,
    paginated,
    buildHref,
    handlePrev,
    handleNext,
  };
}
