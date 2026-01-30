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
import { signIn } from "../actions/sign-in";
import { SignInInput, signInSchema } from "../schemas";

const SignInForm = () => {
  const [actionState, formAction, pending] = useActionState(
    signIn,
    EMPTY_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (actionState.errors) {
      Object.entries(actionState.errors).forEach(([key, messages]) => {
        setError(key as keyof SignInInput, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [actionState.errors, setError]);

  const onSubmit = (data: SignInInput) => {
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
          <SubmitButton label="Sign In" pending={pending} />
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { SignInForm };
