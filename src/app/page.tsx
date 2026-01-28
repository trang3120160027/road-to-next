import Link from "next/link";
import { Heading } from "@/components/heading";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading
        title="Welcome to the Ticketing System"
        description="This is a simple ticketing system, you can view and manage tickets by navigating to the tickets page."
      />

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()}>Go to Tickets Page</Link>
      </div>
    </div>
  );
};

export default HomePage;
