"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/sort-select";
import {
  paginationOptions,
  paginationParser,
  sortOptions,
  sortParser,
} from "../types";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  const [, setPagination] = useQueryStates(paginationParser, paginationOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    setSort({
      sortKey,
      sortValue,
    });
    setPagination({ page: 1 });
  };

  return <SortSelect options={options} onChange={handleSort} value={sort} />;
};

export { TicketSortSelect };
