import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found."
      button={
        <Button asChild variant="outline" className="mt-2">
          <Link href={ticketsPath()}>Go Back to Tickets</Link>
        </Button>
      }
    />
  );
}
