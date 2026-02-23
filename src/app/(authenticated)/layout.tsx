import { getSessionOrRedirect } from "@/features/auth/queries/get-session-or-redirect";

export default async function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getSessionOrRedirect();

  return <>{children}</>;
}
