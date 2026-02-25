"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "@/features/ticket/types";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={search}
    />
  );
};

export { SearchInput };
