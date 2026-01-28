import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="Tickets Page"
        description="Here is a list of all tickets in the system. Click on a ticket to view more details."
      />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>
            Use the form below to create a new ticket in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketUpsertForm />
        </CardContent>
      </Card>

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
