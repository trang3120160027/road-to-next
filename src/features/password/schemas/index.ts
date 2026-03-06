import { z } from "zod";

export const passwordForgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type PasswordForgotInput = z.infer<typeof passwordForgotSchema>;

export const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
