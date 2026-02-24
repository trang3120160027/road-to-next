import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { SearchParams } from "@/features/ticket/types";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="All Tickets"
        description="Tickets for everyone at one place."
      />

      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
};

export default HomePage;
