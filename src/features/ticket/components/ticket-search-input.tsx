"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "@/components/search-input";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "@/utils/search-params";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  const [, setPagination] = useQueryStates(paginationParser, paginationOptions);

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPagination({ page: 1 });
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
