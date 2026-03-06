import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

// ── Ticket parsers ────────────────────────────────────────────────────────────

export const searchParser = parseAsString
  .withDefault("")
  .withOptions({ shallow: false, clearOnDefault: true });

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(2),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

// ── Password-reset parsers ────────────────────────────────────────────────────

export const tokenParser = parseAsString.withDefault("");

// ── Combined cache ────────────────────────────────────────────────────────────

export const searchParamsCache = createSearchParamsCache({
  // ticket
  search: searchParser,
  ...sortParser,
  ...paginationParser,
  // password reset
  token: tokenParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
