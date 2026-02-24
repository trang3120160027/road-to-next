import { SearchInput } from "@/components/search-input";
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
      <div className="max-w-md w-full mb-4">
        <SearchInput placeholder="Search tickets..." />
      </div>

      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
