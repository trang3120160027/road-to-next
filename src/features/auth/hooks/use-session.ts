import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cache } from "react";
import { authClient, Session } from "@/lib/auth-client";

const useSession = cache(() => {
  const pathName = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setIsPending(true);
      const { data: session } = await authClient.getSession();
      setSession(session);
      setIsPending(false);
    };

    fetchSession();
  }, [pathName]);

  return { session, isPending };
});

export { useSession };
