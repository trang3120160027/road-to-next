import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getBaseUrl } from "@/utils/url";

const TicketsPage = () => {
  console.log(getBaseUrl());

  return (
    <div className="flex-1 flex flex-col items-center gap-8">
      <Heading
        title="Tickets Page"
        description="Here is a list of all tickets in the system. Click on a ticket to view more details."
      />

      <CardCompact
        title="Create Ticket"
        description="Use the form below to create a new ticket in the system."
        className="w-full max-w-md animate-fade-in-from-top"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
