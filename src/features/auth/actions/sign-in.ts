"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import { auth } from "@/lib/auth";
import { ticketsPath } from "@/paths";
import { SignInInput, signInSchema } from "../schemas";

const signIn = async (
  _prevState: ActionState<SignInInput>,
  formData: FormData,
) => {
  const values = Object.fromEntries(formData);

  const result = signInSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<SignInInput>(result.error, values);
  }

  try {
    const { email, password } = result.data;

    const { user } = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    if (!user) {
      return toActionState<SignInInput>(false, "Invalid email or password.");
    }
  } catch (error) {
    return fromErrorToActionState<SignInInput>(error, values);
  }

  revalidatePath(ticketsPath());
  await setCookieByKey("toastMessage", "Signed in successfully.");
  redirect(ticketsPath());
};

export { signIn };
