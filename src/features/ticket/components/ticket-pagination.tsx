"use client";

import { useQueryStates } from "nuqs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { paginationOptions, paginationParser } from "../types";

type TicketPaginationProps = {
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const TicketPagination = ({ metadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const limitSelectOptions = [2, 4, 6];
  const { page, limit } = pagination;

  const totalResults = metadata.count;
  const totalPages = Math.ceil(totalResults / limit);
  const startResult = totalResults === 0 ? 0 : (page - 1) * limit + 1;
  const endResult = Math.min(page * limit, totalResults);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "ellipsis", totalPages];
    }

    if (page >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination({ limit: newLimit, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage });
  };

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {getPageNumbers().map((p, index) => {
            if (p === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => handlePageChange(p as number)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          Results: {startResult} - {endResult} of {totalResults}
        </span>
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) => handleLimitChange(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              {limitSelectOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export { TicketPagination };
