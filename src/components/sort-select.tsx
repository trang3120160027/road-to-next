"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  value: string;
  label: string;
};

type SortSelectProps = {
  defaultValue?: string;
  options: Option[];
};

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query === defaultValue) {
      params.delete("sort");
    } else if (query) {
      params.set("sort", query);
    } else {
      params.delete("sort");
    }

    const newPath = `${pathname}?${params.toString()}`;
    replace(newPath, { scroll: false });
  };

  return (
    <Select
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
