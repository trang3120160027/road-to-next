"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { ActionState, fromErrorToActionState } from "@/components/form";
import { auth } from "@/lib/auth";
import { signInPath } from "@/paths";
import { SignUpInput, signUpSchema } from "../schemas";

const signUp = async (
  _prevState: ActionState<SignUpInput>,
  formData: FormData,
) => {
  const values = Object.fromEntries(formData);

  const result = signUpSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<SignUpInput>(result.error, values);
  }

  try {
    const { name, email, password } = result.data;

    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    return fromErrorToActionState<SignUpInput>(error, values);
  }

  await setCookieByKey(
    "toastMessage",
    "Account created successfully. Please check your email to verify your account.",
  );
  redirect(signInPath());
};

export { signUp };
