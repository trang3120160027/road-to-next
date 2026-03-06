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
import { passwordForgot } from "../actions/password-forgot";
import { PasswordForgotInput, passwordForgotSchema } from "../schemas";

const PasswordForgotForm = () => {
  const [actionState, formAction, pending] = useActionState(
    passwordForgot,
    EMPTY_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordForgotSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (actionState.errors) {
      Object.entries(actionState.errors).forEach(([key, messages]) => {
        setError(key as keyof PasswordForgotInput, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [actionState.errors, setError]);

  const onSubmit = (data: PasswordForgotInput) => {
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
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            {...register("email")}
            disabled={pending}
            placeholder="Enter your email"
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <SubmitButton label="Send Reset Link" pending={pending} />
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { PasswordForgotForm };
