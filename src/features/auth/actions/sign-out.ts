"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { auth } from "@/lib/auth";
import { ticketsPath } from "@/paths";
import { getSessionOrRedirect } from "../queries/get-session-or-redirect";

const signOut = async () => {
  const headersList = await headers();

  await getSessionOrRedirect();

  try {
    await auth.api.signOut({
      headers: headersList,
    });
  } catch (error) {
    await setCookieByKey(
      "toastMessage",
      "Error signing out. Please try again.",
    );
    console.error("Error signing out:", error);
    redirect(ticketsPath());
  }

  await setCookieByKey("toastMessage", "Signed out successfully.");
  redirect(ticketsPath());
};

export { signOut };
