"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "@/components/search-input";
import { searchParser } from "@/features/ticket/types";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
  }, 300);

  return (
    <SearchInput
      placeholder={placeholder}
      onChange={handleSearch}
      value={search}
    />
  );
};

export { TicketSearchInput };
