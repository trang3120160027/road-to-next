"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/paths";

const AccountProfilePage = () => {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex flex-col gap-6">
      <Tabs value={pathname.split("/").at(-1)}>
        <TabsList variant="line">
          <TabsTrigger asChild value="profile">
            <Link href={accountProfilePath()}>Profile</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="password">
            <Link href={accountPasswordPath()}>Password</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      Account Profile Page
    </div>
  );
};

export default AccountProfilePage;
