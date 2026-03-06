import { ParsedSearchParams } from "@/utils/search-params";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams,
  );
  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in-from-top items-center">
      <div className="max-w-md w-full mb-4 flex gap-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
            { sortKey: "priority", sortValue: "desc", label: "Priority" },
          ]}
        />
      </div>

      {tickets.length ? (
        <>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
          <TicketPagination metadata={ticketMetadata} />
        </>
      ) : (
        <p className="text-muted-foreground">No tickets found</p>
      )}
    </div>
  );
};

export { TicketList };
