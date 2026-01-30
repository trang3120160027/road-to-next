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
import { signUp } from "../actions/sign-up";
import { SignUpInput, signUpSchema } from "../schemas";

const SignUpForm = () => {
  const [actionState, formAction, pending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Sync server-side validation errors to react-hook-form
  useEffect(() => {
    if (actionState.errors) {
      Object.entries(actionState.errors).forEach(([key, messages]) => {
        setError(key as keyof SignUpInput, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [actionState.errors, setError]);

  const onSubmit = (data: SignUpInput) => {
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
          <FieldLabel htmlFor="name">Username</FieldLabel>
          <Input
            id="name"
            {...register("name")}
            disabled={pending}
            placeholder="Enter your name"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={pending}
            placeholder="Enter your password"
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
            {...register("confirmPassword")}
            disabled={pending}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <FieldError>{errors.confirmPassword.message}</FieldError>
          )}
        </Field>

        <Field>
          <SubmitButton label="Sign Up" pending={pending} />
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { SignUpForm };
