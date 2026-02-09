import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { getSession } from "./get-session";

const getSessionOrRedirect = async () => {
  const session = await getSession();

  if (!session) {
    redirect(signInPath());
  }

  return session;
};

export { getSessionOrRedirect };
