import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  return (
    <nav
      className="
          supports-backdrop-blur:bg-white/60
          fixed left-0 top-0 right-0 z-20
          border-b bg-background/95 backdrop-blur
          w-full flex py-2.5 px-5 justify-between
        "
    >
      <Button asChild variant="ghost">
        <Link href={homePath()}>
          <LucideKanban className="size-5" />
          <h1 className="font-semibold text-lg">TicketBounty</h1>
        </Link>
      </Button>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Tickets</Link>
        </Button>
      </div>
    </nav>
  );
};

export { Header };
