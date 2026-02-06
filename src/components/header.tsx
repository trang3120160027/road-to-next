"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useSession } from "@/features/auth/hooks/use-session";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  const [session, isPending] = useSession();

  if (isPending) {
    return null;
  }

  const navItems = session ? (
    <>
      <Button asChild variant="outline">
        <Link href={ticketsPath()}>Tickets</Link>
      </Button>
      <form action={signOut}>
        <SubmitButton label="Sign Out" />
      </form>
    </>
  ) : (
    <>
      <Button asChild variant="outline">
        <Link href={signInPath()}>Sign In</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href={signUpPath()}>Sign Up</Link>
      </Button>
    </>
  );

  return (
    <nav
      className="
          animate-header-from-top
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
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
