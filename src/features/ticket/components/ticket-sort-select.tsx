"use client";

import { useQueryStates } from "nuqs";
import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { sortOptions, sortParser } from "../types";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    setSort({
      sortKey,
      sortValue,
    });
  };

  return <SortSelect options={options} onChange={handleSort} value={sort} />;
};

export { TicketSortSelect };
