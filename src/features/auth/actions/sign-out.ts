"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { auth } from "@/lib/auth";
import { signInPath, ticketsPath } from "@/paths";

const signOut = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect(signInPath());
  }

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
