"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EMPTY_ACTION_STATE } from "@/components/form";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { passwordReset } from "../actions/password-reset";
import { PasswordResetInput, passwordResetSchema } from "../schemas";

type PasswordResetFormProps = {
  token: string;
};

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const [actionState, formAction, pending] = useActionState(
    passwordReset.bind(null, token),
    EMPTY_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (actionState.errors) {
      Object.entries(actionState.errors).forEach(([key, messages]) => {
        setError(key as keyof PasswordResetInput, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [actionState.errors, setError]);

  const onSubmit = (data: PasswordResetInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form actionState={actionState} onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            disabled={pending}
            {...register("password")}
          />
          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            disabled={pending}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>
        <Field>
          <SubmitButton label="Reset Password" pending={pending} />
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { PasswordResetForm };
