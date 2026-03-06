"use server";

import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import { auth } from "@/lib/auth";
import { signInPath } from "@/paths";
import { PasswordResetInput, passwordResetSchema } from "../schemas";

const passwordReset = async (
  token: string,
  _prevState: ActionState<PasswordResetInput>,
  formData: FormData,
) => {
  const values = Object.fromEntries(formData);

  const result = passwordResetSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<PasswordResetInput>(result.error, values);
  }

  try {
    const { password } = result.data;

    const data = await auth.api.resetPassword({
      body: { token, newPassword: password },
    });

    if (!data.status) {
      return toActionState<PasswordResetInput>(
        false,
        "Failed to reset password.",
      );
    }
  } catch (error) {
    return fromErrorToActionState<PasswordResetInput>(error, values);
  }

  await setCookieByKey(
    "toastMessage",
    "Password reset successfully. You can now sign in.",
  );
  redirect(signInPath());
};

export { passwordReset };
