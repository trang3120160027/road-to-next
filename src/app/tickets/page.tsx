import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getSession } from "@/features/auth/queries/get-session";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getBaseUrl } from "@/utils/url";

const TicketsPage = async () => {
  console.log(getBaseUrl());
  const session = await getSession();

  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="Tickets Page"
        description="Here is a list of all tickets in the system. Click on a ticket to view more details."
      />

      <CardCompact
        title="Create Ticket"
        description="Use the form below to create a new ticket in the system."
        className="w-full max-w-md animate-fade-in-from-top self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={session?.user.id} />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
