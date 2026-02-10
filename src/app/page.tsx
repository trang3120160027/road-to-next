import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets for everyone at one place."
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default HomePage;
