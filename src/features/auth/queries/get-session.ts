import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";

const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export { getSession };
