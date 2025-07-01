"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";

type Props = {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounce?: number;
  defaultValue?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  debounce = 1000,
  defaultValue = "",
}: Props) {
  const [input, setInput] = useState(defaultValue);

  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input.trim());
    }, debounce);
    return () => clearTimeout(timeout);
  }, [input, debounce, onSearch]);

  return (
    <div className="mb-6 flex justify-center">
      <Input
        type="search"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="max-w-md"
        autoComplete="off"
      />
    </div>
  );
}
