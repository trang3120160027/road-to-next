import { User } from "better-auth";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/features/auth/actions/sign-out";
import { accountPasswordPath, accountProfilePath } from "@/paths";
import { SubmitButton } from "./form/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";

type AccountDropdownProps = {
  user: User;
  side: "top" | "right" | "bottom" | "left";
  showUserInfo?: boolean;
};

const AccountDropdown = ({
  user,
  side,
  showUserInfo = true,
}: AccountDropdownProps) => {
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            isActive={pathname.startsWith("/account")}
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {showUserInfo && (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            )}
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side={side}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={accountProfilePath()}>
                <LucideUser />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={accountPasswordPath()}>
                <LucideLock />
                Password
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <form action={signOut}>
                <SubmitButton
                  label="Sign out"
                  icon={<LucideLogOut />}
                  variant="link"
                  className="w-full justify-start h-auto p-0 hover:no-underline"
                />
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { AccountDropdown };
