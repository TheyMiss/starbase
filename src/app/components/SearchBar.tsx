"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import Loader from "./Loader";

export type SearchBarProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounce?: number;
  defaultValue?: string;
  queryParam?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  debounce = 500,
  defaultValue = "",
  queryParam = "search",
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initial = searchParams.get(queryParam) ?? defaultValue;
  const [input, setInput] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updated = searchParams.get(queryParam) ?? defaultValue;
    setInput(updated);
    setIsLoading(false);
    setShowWarning(false);
    if (warningTimer.current) {
      clearTimeout(warningTimer.current);
      warningTimer.current = null;
    }
  }, [defaultValue, searchParams, queryParam]);

  useEffect(() => {
    if (warningTimer.current) {
      clearTimeout(warningTimer.current);
      warningTimer.current = null;
    }

    const trimmed = input.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed.length > 0) {
      params.set(queryParam, trimmed);
    } else {
      params.delete(queryParam);
    }

    if (typeof window !== "undefined") {
      const url = `${pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      window.history.replaceState(null, "", url);
    }

    if (trimmed.length < 3) {
      onSearch("");
      setIsLoading(false);

      if (trimmed.length > 0) {
        warningTimer.current = setTimeout(() => setShowWarning(true), 2000);
      }

      return;
    }

    setShowWarning(false);
    setIsLoading(true);
    const timer = setTimeout(() => {
      onSearch(trimmed);
      setIsLoading(false);
    }, debounce);

    return () => {
      clearTimeout(timer);
      if (warningTimer.current) {
        clearTimeout(warningTimer.current);
      }
    };
  }, [input, debounce, onSearch, queryParam, searchParams, pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim().length < 3) {
      setShowWarning(true);
    }
  };

  const trimmedLen = input.trim().length;

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon
            className="h-5 w-5 text-sb-secondary-foreground"
            aria-hidden="true"
          />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 bg-white border border-sb-muted rounded-lg focus:border-sb-accent focus:ring sb-focus:ring-accent transition"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isLoading && <Loader className="w-6 h-6" />}
        </div>
      </div>
      {showWarning && trimmedLen > 0 && trimmedLen < 3 && (
        <p className="mt-2 text-center text-xs text-yellow-600">
          Please enter at least <strong>3</strong> characters to search.
        </p>
      )}
    </div>
  );
}
