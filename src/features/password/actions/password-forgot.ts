"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form";
import { auth } from "@/lib/auth";
import { passwordResetPath } from "@/paths";
import { getBaseUrl } from "@/utils/url";
import { PasswordForgotInput, passwordForgotSchema } from "../schemas";

const passwordForgot = async (
  _prevState: ActionState<PasswordForgotInput>,
  formData: FormData,
) => {
  const values = Object.fromEntries(formData);

  const result = passwordForgotSchema.safeParse(values);

  if (!result.success) {
    return fromErrorToActionState<PasswordForgotInput>(result.error, values);
  }

  try {
    const { email } = result.data;
    const redirectTo = `${getBaseUrl()}${passwordResetPath()}`;

    const data = await auth.api.requestPasswordReset({
      body: { email, redirectTo },
    });

    if (!data.status) {
      return toActionState<PasswordForgotInput>(
        false,
        "Failed to send password reset email.",
      );
    }
  } catch (error) {
    return fromErrorToActionState<PasswordForgotInput>(error, values);
  }

  return toActionState<PasswordForgotInput>(
    true,
    "Password reset email sent successfully. Please check your inbox.",
  );
};

export { passwordForgot };
