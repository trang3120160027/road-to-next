"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth/hooks/use-session";
import { homePath, signInPath, signUpPath } from "@/paths";
import { AccountDropdown } from "./account-dropdown";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const { session, isPending } = useSession();

  if (isPending) return null;

  const sidebarTrigger = isPending ? (
    <Skeleton className="h-8 w-8 md:hidden" />
  ) : session ? (
    <SidebarTrigger className="md:hidden" />
  ) : null;

  const navItems = isPending ? (
    <div className="flex gap-2">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </div>
  ) : session ? null : (
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
    <nav className="supports-backdrop-blur:bg-white/60 sticky top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between items-center">
      <div className="flex items-center">
        {sidebarTrigger}

        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <LucideKanban className="size-5" />
            <h1 className="font-semibold text-lg">TicketBounty</h1>
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        {navItems}
        {session && (
          <AccountDropdown
            user={session.user}
            side="bottom"
            showUserInfo={false}
          />
        )}
      </div>
    </nav>
  );
};

export { Header };
