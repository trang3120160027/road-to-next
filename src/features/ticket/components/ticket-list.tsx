import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { getTickets } from "../queries/get-tickets";
import { SearchParams } from "../types";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);
  return (
    <div className="flex-1 flex flex-col gap-2 animate-fade-in-from-top items-center">
      <div className="max-w-md w-full mb-4 flex gap-2">
        <SearchInput placeholder="Search tickets..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { value: "newest", label: "Newest" },
            { value: "bounty", label: "Bounty" },
            { value: "priority", label: "Priority" },
          ]}
        />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <p className="text-muted-foreground">No tickets found</p>
      )}
    </div>
  );
};

export { TicketList };
